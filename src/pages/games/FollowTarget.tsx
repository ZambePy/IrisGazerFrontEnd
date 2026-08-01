import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { BackButton } from '../../components/ui/BackButton';

export const FollowTarget: React.FC = () => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);

  const moveTarget = () => {
    const newTop = Math.floor(Math.random() * 80) + 10 + '%';
    const newLeft = Math.floor(Math.random() * 80) + 10 + '%';
    setPosition({ top: newTop, left: newLeft });
    setScore(s => s + 1);
  };

  useEffect(() => {
    // Initial movement
    const timer = setInterval(() => {
      moveTarget();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10, position: 'relative' }}>
        <BackButton />
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Alvos Atingidos: {score}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <button
          onClick={moveTarget}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #ef4444 20%, #b91c1c 80%)',
            width: 80, height: 80,
            borderRadius: '50%',
            border: '4px solid white',
            cursor: 'crosshair',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.5s ease-out'
          }}
        >
          <Target color="white" size={40} />
        </button>
      </div>
    </div>
  );
};
