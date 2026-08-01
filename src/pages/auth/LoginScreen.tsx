import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login: depois de autenticar, vai para o tutorial
    navigate('/tutorial');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img src="/LOGO.png" alt="IrisFlow" style={{ width: '150px', marginBottom: '1rem' }} onError={(e) => e.currentTarget.style.display = 'none'} />
          <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0 }}>Login</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.5rem' }}>Acesse sua conta para continuar</p>
        </div>
        
        <style>{`
          /* Remove o olho padrão de revelar senha dos navegadores Edge/Chrome */
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear {
            display: none;
          }
        `}</style>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155' }}>Email ou Usuário</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '1rem', padding: '0 1rem' }}>
              <Mail color="#64748b" />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@clinica.com"
                style={{ border: 'none', background: 'transparent', padding: '1.25rem 1rem', fontSize: '1.1rem', width: '100%', outline: 'none', color: '#1e293b' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155' }}>Senha</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '1rem', padding: '0 1rem' }}>
              <Lock color="#64748b" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ border: 'none', background: 'transparent', padding: '1.25rem 1rem', fontSize: '1.1rem', width: '100%', outline: 'none', color: '#1e293b' }}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            style={{
              background: '#1B54A8',
              color: 'white',
              border: 'none',
              padding: '1.25rem',
              borderRadius: '1rem',
              fontSize: '1.25rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 8px 20px rgba(27,84,168,0.3)',
              marginTop: '1rem',
              transition: 'transform 0.1s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Entrar <LogIn size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};
