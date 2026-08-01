import React, { useState } from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { TTSButton } from '../../components/TTSButton';
import { Utensils, Droplets, Smile, Frown, Home, Phone, AlertCircle, Heart } from 'lucide-react';

const PICTOGRAMS = [
  { id: 1, label: 'Eu Quero Comer', icon: <Utensils size={64} />, color: '#f59e0b' },
  { id: 2, label: 'Estou com Sede', icon: <Droplets size={64} />, color: '#3b82f6' },
  { id: 3, label: 'Estou Bem', icon: <Smile size={64} />, color: '#10b981' },
  { id: 4, label: 'Estou com Dor', icon: <AlertCircle size={64} />, color: '#ef4444' },
  { id: 5, label: 'Quero Ir ao Banheiro', icon: <Home size={64} />, color: '#6366f1' },
  { id: 6, label: 'Chamar Família', icon: <Phone size={64} />, color: '#8b5cf6' },
  { id: 7, label: 'Obrigado(a)', icon: <Heart size={64} />, color: '#ec4899' },
  { id: 8, label: 'Não estou Bem', icon: <Frown size={64} />, color: '#f43f5e' },
];

export const PictogramScreen: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <BackButton />
          <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>Pictogramas (CAA)</h1>
        </div>
        <TTSButton text={selectedText} />
      </div>

      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1B54A8',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {selectedText || 'Selecione um pictograma...'}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        flex: 1
      }}>
        {PICTOGRAMS.map(pic => (
          <button
            key={pic.id}
            onClick={() => setSelectedText(pic.label)}
            style={{
              background: 'white',
              border: `4px solid ${pic.color}40`,
              borderRadius: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              cursor: 'pointer',
              padding: '2rem',
              transition: 'transform 0.2s, border-color 0.2s',
              color: pic.color
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.borderColor = pic.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = `${pic.color}40`;
            }}
          >
            {pic.icon}
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#334155', textAlign: 'center' }}>
              {pic.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
