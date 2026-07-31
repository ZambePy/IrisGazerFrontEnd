import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type GazeData = {
  x: number;
  y: number;
};

type WebSocketContextData = {
  gaze: GazeData | null;
  isConnected: boolean;
  sendAction: (action: string, payload?: any) => void;
};

const WebSocketContext = createContext<WebSocketContextData>({
  gaze: null,
  isConnected: false,
  sendAction: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gaze, setGaze] = useState<GazeData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // URL do backend em Python (ajuste a porta conforme necessário)
    const socket = new WebSocket('ws://localhost:8000/ws/tracker');

    socket.onopen = () => {
      console.log('Conectado ao backend de Eye Tracking');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'gaze_data') {
          setGaze({ x: data.x, y: data.y });
        }
      } catch (e) {
        console.error('Erro ao fazer parse dos dados do WS:', e);
      }
    };

    socket.onclose = () => {
      console.log('Desconectado do backend');
      setIsConnected(false);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendAction = (action: string, payload: any = {}) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action, ...payload }));
    }
  };

  return (
    <WebSocketContext.Provider value={{ gaze, isConnected, sendAction }}>
      {children}
      {/* Opcional: Cursor visual do Eye Tracker para debug/feedback */}
      {gaze && (
        <div
          className="fixed pointer-events-none z-50 rounded-full bg-red-500 opacity-50"
          style={{
            left: gaze.x,
            top: gaze.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
          }}
        />
      )}
    </WebSocketContext.Provider>
  );
};
