import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InitialSplash: React.FC = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000); // 4 seconds before redirect
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 1s ease-in',
    }}>
      {/* Container da logo animado */}
      <div style={{
        animation: 'pulse 2s infinite',
        marginBottom: '2rem'
      }}>
        {!imageError && (
          <img 
            src="/LOGO.png" 
            alt="IrisFlow Logo" 
            style={{ width: '300px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(27,84,168,0.2))' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              setImageError(true);
            }}
          />
        )}
        {imageError && (
          <h1 style={{ fontSize: '4rem', color: '#1B54A8', margin: 0, fontWeight: 900, textAlign: 'center' }}>
            IrisFlow
          </h1>
        )}
      </div>

      {/* Texto de boas vindas com delay na animação */}
      <h2 style={{
        fontSize: '2rem',
        color: '#334155',
        fontWeight: 600,
        textAlign: 'center',
        animation: 'slideUp 1.5s ease-out',
        maxWidth: '80%'
      }}>
        Bem-vindo à nossa plataforma
      </h2>

      {/* CSS para animações inline (se não estiverem no index.css) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
};
