import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/ui/BackButton';
import { AlertOctagon, HeartPulse, ShieldAlert, Thermometer, Wind } from 'lucide-react';
import { api } from '../../utils/api';

const EMERGENCIES = [
  { id: 'dor', label: 'DOR MUITO FORTE', icon: HeartPulse },
  { id: 'ar', label: 'FALTA DE AR', icon: Wind },
  { id: 'frio', label: 'MUITO FRIO / FEBRE', icon: Thermometer },
  { id: 'outro', label: 'OUTRA URGÊNCIA', icon: ShieldAlert },
];

export const EmergencyEscalation: React.FC = () => {
  const navigate = useNavigate();
  const [triggered, setTriggered] = useState<string | null>(null);

  const triggerAlert = (_id: string, label: string) => {
    setTriggered(label);
    
    // Dispara som de alarme forte nativo (beep)
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // 880 Hz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000);

    // TTS Alto
    const u = new SpeechSynthesisUtterance(`ALERTA MÉDICO: ${label}`);
    u.lang = 'pt-BR';
    u.rate = 1.0;
    u.pitch = 1.5; // Agudo para alarme
    u.volume = 1.0;
    window.speechSynthesis.speak(u);

    // Enviar API (Mock)
    api.sendHelpAlert('usuario_atual').catch(e => console.log('Erro de rede esperado no mock', e));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fef2f2',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <BackButton />
        <h1 style={{ fontSize: '2.5rem', color: '#dc2626', margin: 0, fontWeight: 900, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertOctagon size={48} /> URGÊNCIA MÉDICA
        </h1>
      </div>

      {triggered ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulseBg 1s infinite'
        }}>
          <AlertOctagon size={120} color="#dc2626" />
          <h1 style={{ fontSize: '4rem', color: '#dc2626', textAlign: 'center', marginTop: '2rem' }}>
            ALERTA ENVIADO!
          </h1>
          <p style={{ fontSize: '2rem', color: '#7f1d1d', textAlign: 'center' }}>
            Sinal de {triggered} disparado. Aguarde.
          </p>
          <button 
            onClick={() => { setTriggered(null); navigate('/menu'); }}
            style={{
              marginTop: '3rem', padding: '1.5rem 4rem', fontSize: '1.5rem',
              background: '#3b82f6', color: 'white', border: 'none', borderRadius: '1rem',
              fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Cancelar Alerta e Voltar
          </button>
          <style>{`@keyframes pulseBg { 0% { background-color: #fef2f2; } 50% { background-color: #fecaca; } 100% { background-color: #fef2f2; } }`}</style>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          flex: 1
        }}>
          {EMERGENCIES.map(item => (
            <button
              key={item.id}
              onClick={() => triggerAlert(item.id, item.label)}
              style={{
                background: '#dc2626',
                border: '4px solid #991b1b',
                borderRadius: '2rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                cursor: 'pointer',
                boxShadow: '0 12px 40px rgba(220,38,38,0.4)',
                transition: 'transform 0.1s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <item.icon size={100} color="white" />
              <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
