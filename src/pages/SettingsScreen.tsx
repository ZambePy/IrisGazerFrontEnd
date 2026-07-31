import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCog, Clock, Mic } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [pin, setPin] = useState('');
  const [dwellSpeed, setDwellSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') setIsAuth(true);
    else { alert('PIN incorreto. (Dica: 1234)'); setPin(''); }
  };

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.7)',
    borderRadius: '1.5rem',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(27,84,168,0.08)',
  };

  if (!isAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 50%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="glass animate-fade-in-up" style={{ padding: '3.5rem', borderRadius: '2.5rem', maxWidth: 480, width: '90%', textAlign: 'center' }}>
          <div style={{ width: '5rem', height: '5rem', background: 'linear-gradient(135deg, #dbeafe, #eff6ff)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <UserCog size={40} color="#1B54A8" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Acesso do Cuidador</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontFamily: 'system-ui, sans-serif', fontSize: '1rem' }}>
            Insira o PIN para acessar as configurações do sistema.
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              maxLength={4}
              placeholder="••••"
              style={{
                textAlign: 'center',
                fontSize: '3rem',
                letterSpacing: '1rem',
                padding: '1rem',
                borderRadius: '1rem',
                border: '2px solid #e2e8f0',
                outline: 'none',
                fontFamily: 'Boldonse, sans-serif',
              }}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => navigate('/menu')} style={{ flex: 1, padding: '1rem', background: '#f1f5f9', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, fontFamily: 'Boldonse, sans-serif', color: '#64748b' }}>Cancelar</button>
              <button type="submit" style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #1B54A8, #2563eb)', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, fontFamily: 'Boldonse, sans-serif', color: 'white', boxShadow: '0 4px 16px rgba(27,84,168,0.3)' }}>Entrar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const speeds: { key: 'slow' | 'normal' | 'fast'; label: string; value: string }[] = [
    { key: 'slow',   label: 'Devagar', value: '2.5s' },
    { key: 'normal', label: 'Normal',  value: '1.5s' },
    { key: 'fast',   label: 'Rápido',  value: '0.8s' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 50%, #f1f5f9 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
    }}>
      {/* Header */}
      <div className="glass-dark" style={{ display: 'flex', alignItems: 'center', padding: '1.25rem 2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/menu')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '999px', padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: 'Boldonse, sans-serif', fontSize: '0.95rem', fontWeight: 700 }}>
          <ArrowLeft size={20} /> Voltar ao Menu
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Configurações Avançadas</h1>
        <div style={{ width: '130px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        {/* Temporizador */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Clock size={28} color="#1B54A8" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Temporizador de Fixação (Dwell)</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {speeds.map(({ key, label, value }) => (
              <button
                key={key}
                onClick={() => setDwellSpeed(key)}
                style={{
                  flex: 1, padding: '1rem', borderRadius: '1rem', cursor: 'pointer', fontFamily: 'Boldonse, sans-serif',
                  fontSize: '0.95rem', fontWeight: 700, border: '2px solid',
                  background: dwellSpeed === key ? 'linear-gradient(135deg, #1B54A8, #2563eb)' : 'white',
                  color: dwellSpeed === key ? 'white' : '#64748b',
                  borderColor: dwellSpeed === key ? '#1B54A8' : '#e2e8f0',
                  boxShadow: dwellSpeed === key ? '0 4px 16px rgba(27,84,168,0.3)' : 'none',
                }}
              >
                {label} ({value})
              </button>
            ))}
          </div>
          <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem', fontFamily: 'system-ui, sans-serif' }}>
            Ajuste o tempo de fixação do olhar necessário para selecionar um botão.
          </p>
        </div>

        {/* Clonagem de Voz */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Mic size={28} color="#1B54A8" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Clonagem de Voz Personalizada</h2>
          </div>
          <p style={{ color: '#64748b', marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
            Grave um áudio curto do paciente ou faça upload de um arquivo existente para criar uma voz sintetizada personalizada, preservando a identidade vocal.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.5rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', fontFamily: 'Boldonse, sans-serif', fontSize: '0.9rem', fontWeight: 700 }}>
              <Mic size={20} /> Gravar Amostra
            </button>
            <button style={{ padding: '0.85rem 1.5rem', background: 'white', color: '#475569', border: '2px solid #e2e8f0', borderRadius: '1rem', cursor: 'pointer', fontFamily: 'Boldonse, sans-serif', fontSize: '0.9rem', fontWeight: 700 }}>
              Upload de Áudio (.wav)
            </button>
          </div>
          <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '1rem', color: '#92400e', fontSize: '0.85rem', fontFamily: 'system-ui, sans-serif' }}>
            <strong>⚠️ LGPD:</strong> A voz é dado biométrico sensível. O modelo será armazenado exclusivamente para uso assistivo local do paciente.
          </div>
        </div>
      </div>
    </div>
  );
};
