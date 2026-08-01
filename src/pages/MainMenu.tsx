import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Settings, MessageCircle, Grip, PenTool, Target, Bot, 
  LayoutGrid, AlertTriangle, Activity, Heart,
  CheckSquare, Palette, Image as ImageIcon, Newspaper, MousePointer2 
} from 'lucide-react';


type TabKey = 'comunicacao' | 'cuidados' | 'lazer' | 'sistema';

interface MenuItem {
  label: string;
  Icon: React.FC<{ size: number; color: string; strokeWidth?: number }>;
  iconColor: string;
  bgGradient: string;
  shadowColor: string;
  route: string;
}

const MENU_DATA: Record<TabKey, MenuItem[]> = {
  comunicacao: [
    { label: 'Urgência\nMédica', Icon: AlertTriangle, iconColor: '#dc2626', bgGradient: 'linear-gradient(135deg, #fecaca, #fef2f2)', shadowColor: 'rgba(220,38,38,0.25)', route: '/emergency' },
    { label: 'Pictogramas\n(CAA)', Icon: LayoutGrid, iconColor: '#8b5cf6', bgGradient: 'linear-gradient(135deg, #ddd6fe, #f5f3ff)', shadowColor: 'rgba(139,92,246,0.25)', route: '/pictograms' },
    { label: 'Frases\nRápidas', Icon: MessageCircle, iconColor: '#0d9488', bgGradient: 'linear-gradient(135deg, #ccfbf1, #f0fdfa)', shadowColor: 'rgba(13,148,136,0.25)', route: '/phrases' },
    { label: 'Teclado\nVirtual', Icon: PenTool, iconColor: '#ea580c', bgGradient: 'linear-gradient(135deg, #fed7aa, #fff7ed)', shadowColor: 'rgba(234,88,12,0.25)', route: '/keyboard' },
    { label: 'Assistente\nde IA', Icon: Bot, iconColor: '#3b82f6', bgGradient: 'linear-gradient(135deg, #bfdbfe, #eff6ff)', shadowColor: 'rgba(59,130,246,0.25)', route: '/chatbot' },
    { label: 'Minhas\nOpções', Icon: Grip, iconColor: '#1B54A8', bgGradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)', shadowColor: 'rgba(27,84,168,0.25)', route: '/options' },
  ],
  cuidados: [
    { label: 'Painel do\nCuidador', Icon: Activity, iconColor: '#2563eb', bgGradient: 'linear-gradient(135deg, #bfdbfe, #eff6ff)', shadowColor: 'rgba(37,99,235,0.25)', route: '/caregiver' },
    { label: 'Meditação\nGuiada', Icon: Heart, iconColor: '#ec4899', bgGradient: 'linear-gradient(135deg, #fbcfe8, #fdf2f8)', shadowColor: 'rgba(236,72,153,0.25)', route: '/meditation' },
    { label: 'Aviso:\nEstou Bem', Icon: CheckSquare, iconColor: '#16a34a', bgGradient: 'linear-gradient(135deg, #bbf7d0, #f0fdf4)', shadowColor: 'rgba(22,163,74,0.25)', route: '/iamok' },
  ],
  lazer: [
    { label: 'Mini-Jogos', Icon: Target, iconColor: '#4f46e5', bgGradient: 'linear-gradient(135deg, #c7d2fe, #eef2ff)', shadowColor: 'rgba(79,70,229,0.25)', route: '/games' },
    { label: 'Desenho\nLivre', Icon: Palette, iconColor: '#d946ef', bgGradient: 'linear-gradient(135deg, #f5d0fe, #fdf4ff)', shadowColor: 'rgba(217,70,239,0.25)', route: '/drawing' },
    { label: 'Galeria\nde Fotos', Icon: ImageIcon, iconColor: '#059669', bgGradient: 'linear-gradient(135deg, #a7f3d0, #ecfdf5)', shadowColor: 'rgba(5,150,105,0.25)', route: '/gallery' },
    { label: 'Jornal\ndo Dia', Icon: Newspaper, iconColor: '#475569', bgGradient: 'linear-gradient(135deg, #cbd5e1, #f8fafc)', shadowColor: 'rgba(71,85,105,0.25)', route: '/news' },
  ],
  sistema: [
    { label: 'Configuração\nGeral', Icon: Settings, iconColor: '#1e293b', bgGradient: 'linear-gradient(135deg, #94a3b8, #f1f5f9)', shadowColor: 'rgba(30,41,59,0.25)', route: '/settings' },
    { label: 'Mouse\nVirtual (PC)', Icon: MousePointer2, iconColor: '#0891b2', bgGradient: 'linear-gradient(135deg, #a5f3fc, #ecfeff)', shadowColor: 'rgba(8,145,178,0.25)', route: '/virtual-mouse' },
  ]
};

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('comunicacao');

  const tabs: { key: TabKey, label: string }[] = [
    { key: 'comunicacao', label: '🗣️ Comunicação' },
    { key: 'cuidados', label: '🩺 Cuidados' },
    { key: 'lazer', label: '🎮 Lazer' },
    { key: 'sistema', label: '⚙️ Sistema' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 40%, #f1f5f9 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(27,84,168,0.08), transparent)', top: '-15%', left: '-10%', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(239,68,68,0.08), transparent)', bottom: '-10%', right: '-8%', zIndex: 0 }} />

      {/* Cabeçalho */}
      <div style={{
        padding: '1.5rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // centraliza a logo
        zIndex: 10,
        position: 'relative',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <img src="/LOGO.png" alt="IrisFlow" style={{ height: '3rem' }} />
      </div>

      <div style={{ display: 'flex', flex: 1, zIndex: 10 }}>
        
        {/* Menu Lateral (Abas) */}
        <div style={{
          width: '420px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          background: 'rgba(255,255,255,0.3)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '1.75rem 1.5rem',
                borderRadius: '1.25rem',
                border: 'none',
                background: activeTab === tab.key ? '#1B54A8' : 'white',
                color: activeTab === tab.key ? 'white' : '#475569',
                fontSize: '1.6rem',
                fontWeight: 700,
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: activeTab === tab.key ? '0 8px 24px rgba(27,84,168,0.3)' : '0 4px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Área de Conteúdo (Grade) */}
        <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '2rem', marginTop: 0 }}>
            {tabs.find(t => t.key === activeTab)?.label.substring(3)}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '2rem'
          }}>
            {MENU_DATA[activeTab].map(({ label, Icon, iconColor, bgGradient, shadowColor, route }) => (
              <button
                key={label}
                onClick={() => navigate(route)}
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '2px solid rgba(255,255,255,1)',
                  borderRadius: '1.5rem',
                  padding: '2rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ 
                  background: bgGradient, 
                  padding: '1.25rem', 
                  borderRadius: '1.25rem',
                  boxShadow: `0 8px 24px ${shadowColor}`
                }}>
                  <Icon size={48} color={iconColor} strokeWidth={2} />
                </div>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
