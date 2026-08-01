import React, { useState } from 'react';

import { Send, Bot, User } from 'lucide-react';
import { BackButton } from '../../components/ui/BackButton';
import { TTSButton } from '../../components/TTSButton';
import { useAuth } from '../../context/AuthContext';

export const ChatbotScreen: React.FC = () => {
  const { currentProfile: _currentProfile } = useAuth();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Olá! Como posso te ajudar hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages as any);
    setInputText('');
    setIsLoading(true);

    try {
      // Aqui integrará com: POST /api/chatbot/message
      // Simulando a resposta temporariamente
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: `Recebi sua mensagem: "${newMessages[newMessages.length - 1].text}". O backend será integrado aqui.` }]);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <BackButton />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Bot color="#3b82f6" />
            <span style={{ fontWeight: 600, color: '#1e293b' }}>Assistente Iris</span>
          </div>
        </div>

        {/* Chat window */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          marginBottom: '1rem'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: '0.5rem'
            }}>
              <div style={{
                background: msg.role === 'user' ? '#3b82f6' : '#e2e8f0',
                padding: '0.5rem', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {msg.role === 'user' ? <User size={20} color="white" /> : <Bot size={20} color="#475569" />}
              </div>
              <div style={{
                background: msg.role === 'user' ? '#3b82f6' : 'white',
                color: msg.role === 'user' ? 'white' : '#1e293b',
                padding: '1rem',
                borderRadius: '1rem',
                borderBottomRightRadius: msg.role === 'user' ? 0 : '1rem',
                borderBottomLeftRadius: msg.role === 'bot' ? 0 : '1rem',
                maxWidth: '70%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
              <Bot size={20} /> Digitando...
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Digite sua mensagem..."
            style={{
              flex: 1,
              padding: '1.25rem',
              borderRadius: '1.5rem',
              border: '2px solid transparent',
              background: 'white',
              fontSize: '1.1rem',
              outline: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          />
          <button 
            onClick={sendMessage}
            style={{
              background: '#3b82f6',
              border: 'none',
              padding: '1.25rem',
              borderRadius: '1.5rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
            }}
          >
            <Send size={24} />
          </button>
          <TTSButton text={messages[messages.length - 1]?.text || ''} />
        </div>
      </div>
    </div>
  );
};
