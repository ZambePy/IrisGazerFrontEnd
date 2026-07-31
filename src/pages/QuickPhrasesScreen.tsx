import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, AlertCircle, Tv, Wind, Activity } from 'lucide-react';

const PHRASES = [
  { id: 1, text: 'Preciso ir ao banheiro', Icon: MessageSquare, iconColor: '#0d9488', bg: 'linear-gradient(135deg, #ccfbf1, #f0fdfa)' },
  { id: 2, text: 'Quero ligar a TV',        Icon: Tv,            iconColor: '#4f46e5', bg: 'linear-gradient(135deg, #e0e7ff, #eef2ff)' },
  { id: 3, text: 'Estou com dor',           Icon: Activity,      iconColor: '#e11d48', bg: 'linear-gradient(135deg, #ffe4e6, #fff1f2)' },
  { id: 4, text: 'Quero passear',           Icon: Wind,          iconColor: '#0284c7', bg: 'linear-gradient(135deg, #bae6fd, #f0f9ff)' },
  { id: 5, text: 'Preciso de ajuda',        Icon: AlertCircle,   iconColor: '#dc2626', bg: 'linear-gradient(135deg, #fee2e2, #fff1f2)' },
];

export const QuickPhrasesScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 40%, #f1f5f9 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div className="bg-orb animate-float" style={{
        width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(13,148,136,0.15), transparent)',
        top: '-10%', right: '-5%',
      }} />

      {/* Breadcrumb */}
      <div className="glass" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1.25rem 2rem',
        borderRadius: '1.5rem',
        marginBottom: '2rem',
        zIndex: 10,
      }}>
        <MessageSquare size={28} color="#0d9488" />
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>
          Frases rápidas
        </span>
        <span style={{ color: '#94a3b8', margin: '0 0.5rem' }}>/</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 400, color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
          Escolha uma frase
        </span>
      </div>

      {/* Grid */}
      <div className="animate-fade-in-up" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        flex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        zIndex: 10,
      }}>
        {/* Voltar */}
        <button
          onClick={() => navigate('/menu')}
          className="action-card glass"
          style={{ border: '2px solid rgba(255,255,255,0.7)' }}
        >
          <div className="card-icon" style={{
            background: 'linear-gradient(135deg, #e2e8f0, #f8fafc)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}>
            <ArrowLeft size={56} color="#475569" strokeWidth={2} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Voltar</span>
        </button>

        {/* Frases */}
        {PHRASES.map(({ id, text, Icon, iconColor, bg }) => (
          <button
            key={id}
            onClick={() => handleSpeak(text)}
            className="action-card glass"
            style={{ border: '2px solid rgba(255,255,255,0.7)' }}
          >
            <div className="card-icon" style={{ background: bg, boxShadow: `0 8px 24px ${iconColor}33` }}>
              <Icon size={56} color={iconColor} strokeWidth={1.5} />
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1e293b',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
