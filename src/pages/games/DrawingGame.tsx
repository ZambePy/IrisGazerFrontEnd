import React, { useRef, useState, useEffect } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { Eraser, Download } from 'lucide-react';

export const DrawingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1B54A8');

  // Ajusta o tamanho do canvas para preencher a tela
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // @ts-ignore
    const clientX = e.clientX || e.touches[0].clientX;
    // @ts-ignore
    const clientY = e.clientY || e.touches[0].clientY;
    
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // @ts-ignore
    const clientX = e.clientX || e.touches[0].clientX;
    // @ts-ignore
    const clientY = e.clientY || e.touches[0].clientY;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu_desenho_irisflow.png';
    a.click();
  };

  const colors = ['#1B54A8', '#dc2626', '#16a34a', '#eab308', '#9333ea', '#000000'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header e Ferramentas */}
      <div style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <BackButton />
          <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0 }}>Desenho Livre</h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: c,
                border: color === c ? '4px solid #cbd5e1' : 'none',
                cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={clearCanvas} style={{ padding: '0.75rem', borderRadius: '1rem', border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 'bold' }}>
            <Eraser /> Apagar
          </button>
          <button onClick={downloadCanvas} style={{ padding: '0.75rem', borderRadius: '1rem', border: 'none', background: '#e0e7ff', color: '#4f46e5', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 'bold' }}>
            <Download /> Salvar
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ cursor: 'crosshair', touchAction: 'none' }} // touchAction none evita scroll no mobile
        />
        <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
          <span style={{ background: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '1rem', color: '#64748b', fontWeight: 'bold' }}>
            Dica: Clique e arraste para desenhar (no futuro, controle pelo olhar)
          </span>
        </div>
      </div>
    </div>
  );
};
