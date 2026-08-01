import React, { useState, useEffect } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { ThumbsUp, Send } from 'lucide-react';

export const IAmOkScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 segundos para cancelar
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) return;
    if (timeLeft === 0) {
      setSent(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, sent]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0fdf4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
        <BackButton />
      </div>

      <div style={{
        background: 'white',
        padding: '4rem',
        borderRadius: '2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <ThumbsUp size={100} color="#16a34a" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '2.5rem', color: '#166534', margin: 0, fontWeight: 900 }}>
          Modo "Estou Bem"
        </h1>
        
        {sent ? (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1.5rem', color: '#15803d', fontWeight: 600 }}>
              Sinal enviado aos cuidadores com sucesso!
            </p>
            <Send size={48} color="#22c55e" style={{ marginTop: '1rem', animation: 'bounce 2s infinite' }} />
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1.5rem', color: '#475569' }}>
              Enviando notificação automática em:
            </p>
            <div style={{ fontSize: '5rem', fontWeight: 900, color: '#16a34a', margin: '1rem 0' }}>
              {timeLeft}s
            </div>
            <button 
              onClick={() => setSent(true)}
              style={{
                width: '100%', padding: '1.5rem', background: '#16a34a', color: 'white',
                border: 'none', borderRadius: '1rem', fontSize: '1.5rem', fontWeight: 'bold',
                cursor: 'pointer', boxShadow: '0 8px 20px rgba(22,163,74,0.3)', marginBottom: '1rem'
              }}
            >
              Enviar Agora
            </button>
            <button 
              onClick={() => window.history.back()}
              style={{
                width: '100%', padding: '1.5rem', background: '#fef2f2', color: '#dc2626',
                border: 'none', borderRadius: '1rem', fontSize: '1.5rem', fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </div>
  );
};
