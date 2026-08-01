import React, { useState } from 'react';
import { MousePointer2, Power, Info } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { useWebSocket } from '../context/WebSocketContext';

export const VirtualMouseScreen: React.FC = () => {
  const { sendAction, isConnected } = useWebSocket();
  const [active, setActive] = useState(false);

  const toggle = () => {
    const next = !active;
    setActive(next);
    sendAction(next ? 'virtual_mouse_start' : 'virtual_mouse_stop');
  };

  return (
    <main role="main" style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <PageHeader
        title="Mouse Virtual (PC)"
        icon={<MousePointer2 color="#0891b2" aria-hidden="true" />}
      />

      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <section
          aria-labelledby="vm-status"
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <h2
            id="vm-status"
            style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}
          >
            Controle do cursor do sistema pelo olhar
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Quando ativado, o backend Python assume o cursor do Windows e usa o rastreamento ocular
            para movê-lo. É necessário que o script auxiliar esteja rodando no PC.
          </p>

          <div
            role="status"
            aria-live="polite"
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              background: isConnected ? '#ecfdf5' : '#fef2f2',
              color: isConnected ? '#065f46' : '#991b1b',
              fontWeight: 700,
              marginBottom: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: isConnected ? '#16a34a' : '#dc2626',
                display: 'inline-block',
              }}
            />
            {isConnected ? 'Backend conectado' : 'Backend desconectado'}
          </div>

          <button
            type="button"
            onClick={toggle}
            disabled={!isConnected}
            aria-pressed={active}
            aria-label={active ? 'Desativar mouse virtual' : 'Ativar mouse virtual'}
            style={{
              width: '100%',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: 'none',
              background: active ? '#ef4444' : '#0891b2',
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 700,
              cursor: isConnected ? 'pointer' : 'not-allowed',
              opacity: isConnected ? 1 : 0.5,
              boxShadow: active
                ? '0 8px 20px rgba(239,68,68,0.3)'
                : '0 8px 20px rgba(8,145,178,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <Power size={24} aria-hidden="true" />
            {active ? 'Desativar Mouse Virtual' : 'Ativar Mouse Virtual'}
          </button>
        </section>

        <section
          aria-labelledby="vm-info"
          style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
          >
            <Info size={20} color="#1d4ed8" aria-hidden="true" />
            <h3 id="vm-info" style={{ fontSize: '1rem', color: '#1e3a8a', margin: 0 }}>
              Como funciona
            </h3>
          </div>
          <p style={{ color: '#1e3a8a', fontSize: '0.9rem', lineHeight: 1.6 }}>
            O comando é enviado ao backend via WebSocket. O script auxiliar em
            <code style={{ padding: '0 0.25rem' }}>python_scripts/virtual_mouse.py</code>é
            responsável por interpretar as coordenadas e controlar o cursor.
          </p>
        </section>
      </div>
    </main>
  );
};
