import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';
import { Settings, BellRing, MessageCircle, Grip, PenTool, Target } from 'lucide-react';

const MENU_ITEMS: {
  label: string;
  Icon: React.FC<{ size: number; color: string; strokeWidth: number }>;
  iconColor: string;
  bgGradient: string;
  shadowColor: string;
  onClick: (navigate: NavigateFunction) => void;
}[] = [
  {
    label: 'Preciso\nde ajuda',
    Icon: BellRing,
    iconColor: '#ef4444',
    bgGradient: 'linear-gradient(135deg, #fee2e2, #fff1f2)',
    shadowColor: 'rgba(239,68,68,0.25)',
    onClick: (_navigate: NavigateFunction) => {
      alert('🔔 Pedido de ajuda enviado!');
    },
  },
  {
    label: 'Frases\nrápidas',
    Icon: MessageCircle,
    iconColor: '#0d9488',
    bgGradient: 'linear-gradient(135deg, #ccfbf1, #f0fdfa)',
    shadowColor: 'rgba(13,148,136,0.25)',
    onClick: (navigate: (path: string) => void) => navigate('/phrases'),
  },
  {
    label: 'Minhas\nopções',
    Icon: Grip,
    iconColor: '#1B54A8',
    bgGradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
    shadowColor: 'rgba(27,84,168,0.25)',
    onClick: (navigate: (path: string) => void) => navigate('/options'),
  },
  {
    label: 'Quero\nescrever',
    Icon: PenTool,
    iconColor: '#ea580c',
    bgGradient: 'linear-gradient(135deg, #fed7aa, #fff7ed)',
    shadowColor: 'rgba(234,88,12,0.25)',
    onClick: (navigate: (path: string) => void) => navigate('/keyboard'),
  },
];

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 40%, #f1f5f9 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
    }}>
      {/* Background orbs */}
      <div className="bg-orb" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(27,84,168,0.12), transparent)',
        top: '-15%', left: '-10%',
      }} />
      <div className="bg-orb" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(239,68,68,0.10), transparent)',
        bottom: '-10%', right: '-8%',
      }} />

      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: 0, right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        zIndex: 20,
      }}>
        {/* Configuração */}
        <button
          onClick={() => navigate('/settings')}
          className="btn-pill glass"
          style={{ color: '#1B54A8', borderColor: 'rgba(27,84,168,0.3)' }}
        >
          <Settings size={22} />
          Configuração
        </button>

        {/* Logo central */}
        <img
          src="/LOGO.png"
          alt="IrisFlow"
          style={{
            height: '3.5rem',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(27,84,168,0.2))',
          }}
        />

        {/* Mini-Jogos */}
        <button
          onClick={() => navigate('/games')}
          className="btn-pill glass"
          style={{ color: '#4f46e5', borderColor: 'rgba(79,70,229,0.3)' }}
        >
          <Target size={22} />
          Mini-Jogos
        </button>
      </div>

      {/* Grid de opções */}
      <div className="animate-fade-in-up" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        marginTop: '6rem',
        maxWidth: '1200px',
        width: '100%',
        zIndex: 10,
      }}>
        {MENU_ITEMS.map(({ label, Icon, iconColor, bgGradient, shadowColor, onClick }) => (
          <button
            key={label}
            onClick={() => onClick(navigate)}
            className="action-card glass"
            style={{ border: '2px solid rgba(255,255,255,0.7)' }}
          >
            <div className="card-icon" style={{ background: bgGradient, boxShadow: `0 8px 24px ${shadowColor}` }}>
              <Icon size={56} color={iconColor} strokeWidth={1.5} />
            </div>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#1e293b',
              textAlign: 'center',
              lineHeight: 1.3,
              whiteSpace: 'pre-line',
            }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
