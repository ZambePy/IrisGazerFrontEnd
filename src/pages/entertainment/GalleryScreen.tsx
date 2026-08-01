import React from 'react';
import { BackButton } from '../../components/ui/BackButton';
import { Image as ImageIcon } from 'lucide-react';

export const GalleryScreen: React.FC = () => {
  // Fotos de exemplo genéricas
  const photos = [
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80', // família
    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&q=80', // viagem
    'https://images.unsplash.com/photo-1516156008625-3a9d045f6b28?w=500&q=80', // paisagem
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80', // pet
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <BackButton />
        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon /> Galeria
        </h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {photos.map((url, i) => (
          <div key={i} style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <img src={url} alt={`Foto ${i}`} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
