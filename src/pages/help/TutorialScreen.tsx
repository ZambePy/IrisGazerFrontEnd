import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, MousePointer2, CheckCircle, Home, Gamepad2, Settings, MessageCircle, Activity } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    icon: <Eye size={80} color="#1B54A8" />,
    title: 'Bem-vindo ao IrisFlow!',
    description: 'O IrisFlow é uma plataforma de comunicação e assistência para pessoas com mobilidade reduzida. Com ela, você pode se expressar, se divertir e monitorar sua saúde — tudo com poucos cliques ou, no futuro, apenas com o olhar.',
    badge: '👋 Introdução'
  },
  {
    icon: <MousePointer2 size={80} color="#16a34a" />,
    title: 'Como Navegar',
    description: 'Clique em qualquer botão grande para realizar uma ação. No futuro, o sistema usará o rastreamento do seu olhar para fazer a seleção automaticamente — sem precisar tocar em nada.',
    badge: '🖱️ Interação'
  },
  {
    icon: <Home size={80} color="#f59e0b" />,
    title: 'Menu Principal (Home)',
    description: 'A tela principal está dividida em 4 abas: Comunicação, Cuidados, Lazer e Sistema. Cada aba reúne funções relacionadas para facilitar a navegação e não sobrecarregar a tela.',
    badge: '🏠 Menu'
  },
  {
    icon: <MessageCircle size={80} color="#0d9488" />,
    title: 'Aba: Comunicação',
    description: 'Aqui ficam as ferramentas de voz e texto: Teclado Virtual, Frases Rápidas, Pictogramas (CAA), o Assistente de IA e o botão de Urgência Médica — para situações de emergência hospitalar.',
    badge: '🗣️ Comunicação'
  },
  {
    icon: <Activity size={80} color="#e11d48" />,
    title: 'Aba: Cuidados',
    description: 'Monitore sua saúde diária: registre o nível de dor, complete a rotina com o Cuidador, pratique respiração guiada com a Meditação Visual e envie o sinal "Estou Bem" para a família.',
    badge: '🩺 Cuidados'
  },
  {
    icon: <Gamepad2 size={80} color="#8b5cf6" />,
    title: 'Aba: Lazer',
    description: 'Explore os Mini-Jogos de exercício ocular, o Desenho Livre no Canvas, a Galeria de Fotos da família e o Jornal do Dia lido em voz alta pela IA.',
    badge: '🎮 Lazer'
  },
  {
    icon: <Settings size={80} color="#475569" />,
    title: 'Aba: Sistema',
    description: 'Configure o aplicativo, realize backup das suas preferências e ative o Painel do Mouse Virtual — que permite controlar o cursor do Windows inteiro com seus olhos, via integração com Python.',
    badge: '⚙️ Sistema'
  },
  {
    icon: <CheckCircle size={80} color="#9333ea" />,
    title: 'Tudo Pronto!',
    description: 'Você está preparado para usar o IrisFlow. Selecione o perfil do paciente e comece a explorar todas as funcionalidades da plataforma.',
    badge: '✅ Concluído'
  }
];

export const TutorialScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      navigate('/profiles');
    }
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem',
        animation: 'fadeIn 0.4s ease-out key=' + currentStep // força re-animar ao trocar
      }}>
        
        {/* Badge da seção */}
        <div style={{ 
          background: '#f1f5f9',
          padding: '0.5rem 1.5rem',
          borderRadius: '2rem',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#475569',
          letterSpacing: '0.05em'
        }}>
          {step.badge}
        </div>

        {/* Ícone */}
        <div style={{ 
          background: '#f1f5f9', 
          padding: '3rem', 
          borderRadius: '50%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
        }}>
          {step.icon}
        </div>

        {/* Textos de alta legibilidade */}
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>
          {step.title}
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
          {step.description}
        </p>

        {/* Indicadores de progresso */}
        <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
          {TUTORIAL_STEPS.map((_, idx) => (
            <div key={idx} style={{
              width: idx === currentStep ? '30px' : '15px',
              height: '15px',
              borderRadius: '10px',
              background: idx === currentStep ? '#1B54A8' : '#cbd5e1',
              transition: 'all 0.3s'
            }} />
          ))}
        </div>

        {/* Botão de ação */}
        <button
          onClick={handleNext}
          style={{
            background: '#1B54A8',
            color: 'white',
            border: 'none',
            padding: '1.25rem 3rem',
            borderRadius: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 8px 20px rgba(27,84,168,0.3)',
          }}
        >
          {currentStep === TUTORIAL_STEPS.length - 1 ? 'Começar' : 'Próximo'}
          <ArrowRight size={28} />
        </button>

      </div>
    </div>
  );
};
