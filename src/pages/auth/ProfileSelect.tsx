import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type Profile } from '../../context/AuthContext';
import { Users, UserCircle } from 'lucide-react';

export const ProfileSelect: React.FC = () => {
  const { profiles, selectProfile } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (profile: Profile) => {
    selectProfile(profile);
    navigate('/calibration-check');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Orbs */}
      <div
        className="bg-orb animate-float"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(79,70,229,0.2), transparent)',
          top: '-10%',
          right: '-5%',
        }}
      />
      <div
        className="bg-orb animate-float"
        style={{
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)',
          bottom: '-10%',
          left: '-5%',
          animationDelay: '3s',
        }}
      />

      <div
        style={{
          zIndex: 10,
          maxWidth: 800,
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            marginBottom: '3rem',
          }}
        >
          <Users size={32} color="#4f46e5" />
          <h1 style={{ fontSize: '1.8rem', color: '#312e81', margin: 0 }}>Selecione um Perfil</h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}
        >
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '1.5rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onFocus={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onBlur={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {p.avatar ? (
                <img
                  src={p.avatar}
                  alt={p.name}
                  style={{ width: 80, height: 80, borderRadius: '50%' }}
                />
              ) : (
                <UserCircle size={80} color="#4f46e5" />
              )}
              <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
