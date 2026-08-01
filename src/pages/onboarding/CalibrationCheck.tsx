import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, CheckCircle } from 'lucide-react';
import { BackButton } from '../../components/ui/BackButton';

export const CalibrationCheck: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulação do carregamento/calibração da câmera
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ alignSelf: 'flex-start', position: 'absolute', top: '2rem', left: '2rem' }}>
        <BackButton />
      </div>

      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        textAlign: 'center'
      }}>
        {progress < 100 ? (
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '8px solid #f1f5f9',
            borderTopColor: '#1B54A8',
            animation: 'spin 1.5s linear infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Eye size={64} color="#1B54A8" style={{ animation: 'pulse 2s infinite' }} />
          </div>
        ) : (
          <CheckCircle size={150} color="#16a34a" />
        )}

        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0 }}>
          {progress < 100 ? 'Calibrando Olhar...' : 'Pronto!'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.25rem' }}>
          {progress < 100 
            ? 'Olhe fixamente para a tela. Ajustando precisão da câmera.' 
            : 'Sua calibração foi concluída com sucesso.'}
        </p>

        {progress === 100 && (
          <button
            onClick={() => navigate('/menu')}
            style={{
              background: '#1B54A8',
              color: 'white',
              border: 'none',
              padding: '1.25rem 3rem',
              borderRadius: '1.5rem',
              fontSize: '1.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '1rem',
              boxShadow: '0 8px 20px rgba(27,84,168,0.3)',
            }}
          >
            Continuar
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
