import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InitialSplash: React.FC = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main
      role="main"
      aria-labelledby="splash-title"
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 1s ease-in',
      }}
    >
      <div style={{ animation: 'pulse 2s infinite', marginBottom: '2rem' }} aria-hidden="true">
        {!imageError && (
          <img
            src="/LOGO.png"
            alt=""
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 10px 20px rgba(27,84,168,0.2))',
            }}
            onError={() => setImageError(true)}
          />
        )}
        {imageError && (
          <span
            style={{
              fontSize: '4rem',
              color: '#1B54A8',
              margin: 0,
              fontWeight: 900,
              textAlign: 'center',
              display: 'block',
            }}
          >
            IrisFlow
          </span>
        )}
      </div>

      <h1
        id="splash-title"
        style={{
          fontSize: '2rem',
          color: '#334155',
          fontWeight: 600,
          textAlign: 'center',
          animation: 'slideUp 1.5s ease-out',
          maxWidth: '80%',
          margin: 0,
        }}
      >
        Bem-vindo à plataforma IrisFlow
      </h1>
      <p role="status" aria-live="polite" className="sr-only">
        Carregando aplicação. Você será redirecionado em instantes.
      </p>

      <button
        type="button"
        onClick={() => navigate('/login')}
        aria-label="Pular splash e ir para o login"
        className="skip-link"
        style={{ bottom: 'auto' }}
      >
        Pular
      </button>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </main>
  );
};
