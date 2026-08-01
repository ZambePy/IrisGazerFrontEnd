import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Sparkles } from 'lucide-react';

export const GamesMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div className="bg-orb animate-float" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(79,70,229,0.2), transparent)',
        top: '-10%', right: '-5%',
      }} />
      <div className="bg-orb animate-float" style={{
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)',
        bottom: '-10%', left: '-5%',
        animationDelay: '3s',
      }} />

      {/* Header */}
      <div className="glass animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem 2rem', borderRadius: '1.5rem', marginBottom: '2rem', gap: '1rem', zIndex: 10 }}>
        <Target size={32} color="#4f46e5" />
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#312e81' }}>Mini-Jogos com Eye Tracking</span>
      </div>

      {/* Grid de jogos */}
      <div className="animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto', width: '100%', zIndex: 10 }}>
        
        {/* Voltar */}
        <button
          onClick={() => navigate('/menu')}
          className="action-card glass"
          style={{ border: '2px solid rgba(255,255,255,0.7)' }}
        >
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #e2e8f0, #f8fafc)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <ArrowLeft size={56} color="#475569" strokeWidth={2} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Voltar</span>
        </button>

        {/* Estoura Bolhas */}
        <button
          onClick={() => navigate('/games/bubble')}
          className="action-card"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.85), rgba(109,40,217,0.85))',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(167,139,250,0.4)',
          }}
        >
          <div className="card-icon" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(79,70,229,0.4)', border: '3px solid rgba(255,255,255,0.3)' }}>
            <Sparkles size={56} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', textAlign: 'center' }}>Estoura<br/>Bolhas</span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>Treino de fixação ocular</span>
        </button>

        {/* Jogo da Memória */}
        <button
          onClick={() => navigate('/games/memory')}
          className="action-card"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.85), rgba(21,128,61,0.85))',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(134,239,172,0.4)',
          }}
        >
          <div className="card-icon" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(34,197,94,0.4)', border: '3px solid rgba(255,255,255,0.3)' }}>
            <span style={{ fontSize: '2rem' }}>🧠</span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', textAlign: 'center' }}>Jogo da<br/>Memória</span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>Treino cognitivo</span>
        </button>

        {/* Siga o Alvo */}
        <button
          onClick={() => navigate('/games/follow')}
          className="action-card"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.85), rgba(185,28,28,0.85))',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(252,165,165,0.4)',
          }}
        >
          <div className="card-icon" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: '0 8px 24px rgba(239,68,68,0.4)', border: '3px solid rgba(255,255,255,0.3)' }}>
            <Target size={56} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', textAlign: 'center' }}>Siga o<br/>Alvo</span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>Velocidade do olhar</span>
        </button>
      </div>
    </div>
  );
};
