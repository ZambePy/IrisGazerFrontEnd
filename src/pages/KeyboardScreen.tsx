import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Delete, Play } from 'lucide-react';

// Layout por frequência do Português Brasileiro
const KEYBOARD_ROWS = [
  ['A', 'E', 'O', 'S', 'R', 'I', 'N', 'D', 'M', 'U'],
  ['T', 'C', 'L', 'P', 'V', 'G', 'H', 'Q', 'B', 'F'],
  ['Z', 'J', 'X', 'K', 'W', 'Y', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '0', ',', '.', '?', '!'],
];

export const KeyboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const append = (char: string) => setText(t => t + char);
  const backspace = () => setText(t => t.slice(0, -1));
  const clear = () => setText('');
  const space = () => setText(t => t + ' ');

  const speak = () => {
    if ('speechSynthesis' in window && text.trim()) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const btnBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'Boldonse, sans-serif',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    userSelect: 'none',
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 50%, #f1f5f9 100%)',
      padding: '1rem',
      gap: '0.75rem',
    }}>
      {/* Linha 1: Voltar | Texto | Apagar | Falar */}
      <div style={{ display: 'flex', gap: '0.75rem', height: '6rem' }}>
        <button
          onClick={() => navigate('/menu')}
          style={{ ...btnBase, gap: '0.5rem', padding: '0 1.5rem', background: 'white', borderRadius: '1.25rem', color: '#1B54A8', fontSize: '1rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(27,84,168,0.12)', minWidth: '8rem' }}
        >
          <ArrowLeft size={28} /> Voltar
        </button>

        {/* Campo de texto */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          background: 'white',
          borderRadius: '1.25rem',
          border: '3px solid',
          borderColor: text ? '#1B54A8' : '#e2e8f0',
          boxShadow: '0 4px 16px rgba(27,84,168,0.08)',
          fontSize: '2rem',
          fontWeight: 700,
          color: text ? '#1e293b' : '#94a3b8',
          fontFamily: 'Boldonse, sans-serif',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          {text || 'Comece a escrever...'}
        </div>

        <button
          onClick={backspace}
          style={{ ...btnBase, gap: '0.5rem', padding: '0 1.5rem', background: 'white', borderRadius: '1.25rem', color: '#ea580c', fontSize: '1rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(234,88,12,0.12)', minWidth: '8rem' }}
        >
          <Delete size={28} /> Apagar
        </button>

        <button
          onClick={speak}
          style={{ ...btnBase, gap: '0.5rem', padding: '0 2rem', background: 'linear-gradient(135deg, #1B54A8, #2563eb)', borderRadius: '1.25rem', color: 'white', fontSize: '1.1rem', fontWeight: 700, boxShadow: '0 4px 20px rgba(27,84,168,0.4)', minWidth: '9rem' }}
        >
          <Play size={28} fill="white" /> FALAR
        </button>
      </div>

      {/* Linha 2: Apagar Tudo | Espaço */}
      <div style={{ display: 'flex', gap: '0.75rem', height: '4rem' }}>
        <button
          onClick={clear}
          style={{ ...btnBase, padding: '0 1.5rem', background: 'white', borderRadius: '1rem', color: '#64748b', fontSize: '1rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', minWidth: '10rem' }}
        >
          Apagar Tudo
        </button>
        <button
          onClick={space}
          style={{ ...btnBase, flex: 1, background: 'white', borderRadius: '1rem', color: '#1B54A8', fontSize: '1.1rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(27,84,168,0.1)', borderBottom: '4px solid #1B54A8' }}
        >
          ⎵ Espaço
        </button>
      </div>

      {/* Teclado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
            {row.map(k => (
              <button
                key={k}
                onClick={() => append(k)}
                className="key-btn"
                style={{ flex: 1, fontFamily: 'Boldonse, sans-serif' }}
              >
                {k}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
