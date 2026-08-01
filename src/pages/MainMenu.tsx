import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Settings,
  MessageCircle,
  Grip,
  PenTool,
  Target,
  Bot,
  LayoutGrid,
  AlertTriangle,
  Activity,
  Heart,
  CheckSquare,
  Palette,
  Image as ImageIcon,
  Newspaper,
  MousePointer2,
} from 'lucide-react';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';

type TabKey = 'comunicacao' | 'cuidados' | 'lazer' | 'sistema';

interface MenuItem {
  labelKey: string;
  Icon: React.FC<{ size: number; color: string; strokeWidth?: number }>;
  iconColor: string;
  bgGradient: string;
  shadowColor: string;
  route: string;
}

const MENU_DATA: Record<TabKey, MenuItem[]> = {
  comunicacao: [
    {
      labelKey: 'menu.items.emergency',
      Icon: AlertTriangle,
      iconColor: '#dc2626',
      bgGradient: 'linear-gradient(135deg, #fecaca, #fef2f2)',
      shadowColor: 'rgba(220,38,38,0.25)',
      route: '/emergency',
    },
    {
      labelKey: 'menu.items.pictograms',
      Icon: LayoutGrid,
      iconColor: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #ddd6fe, #f5f3ff)',
      shadowColor: 'rgba(139,92,246,0.25)',
      route: '/pictograms',
    },
    {
      labelKey: 'menu.items.phrases',
      Icon: MessageCircle,
      iconColor: '#0d9488',
      bgGradient: 'linear-gradient(135deg, #ccfbf1, #f0fdfa)',
      shadowColor: 'rgba(13,148,136,0.25)',
      route: '/phrases',
    },
    {
      labelKey: 'menu.items.keyboard',
      Icon: PenTool,
      iconColor: '#ea580c',
      bgGradient: 'linear-gradient(135deg, #fed7aa, #fff7ed)',
      shadowColor: 'rgba(234,88,12,0.25)',
      route: '/keyboard',
    },
    {
      labelKey: 'menu.items.chatbot',
      Icon: Bot,
      iconColor: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #bfdbfe, #eff6ff)',
      shadowColor: 'rgba(59,130,246,0.25)',
      route: '/chatbot',
    },
    {
      labelKey: 'menu.items.options',
      Icon: Grip,
      iconColor: '#1B54A8',
      bgGradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
      shadowColor: 'rgba(27,84,168,0.25)',
      route: '/options',
    },
  ],
  cuidados: [
    {
      labelKey: 'menu.items.caregiver',
      Icon: Activity,
      iconColor: '#2563eb',
      bgGradient: 'linear-gradient(135deg, #bfdbfe, #eff6ff)',
      shadowColor: 'rgba(37,99,235,0.25)',
      route: '/caregiver',
    },
    {
      labelKey: 'menu.items.meditation',
      Icon: Heart,
      iconColor: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fbcfe8, #fdf2f8)',
      shadowColor: 'rgba(236,72,153,0.25)',
      route: '/meditation',
    },
    {
      labelKey: 'menu.items.iamok',
      Icon: CheckSquare,
      iconColor: '#16a34a',
      bgGradient: 'linear-gradient(135deg, #bbf7d0, #f0fdf4)',
      shadowColor: 'rgba(22,163,74,0.25)',
      route: '/iamok',
    },
  ],
  lazer: [
    {
      labelKey: 'menu.items.games',
      Icon: Target,
      iconColor: '#4f46e5',
      bgGradient: 'linear-gradient(135deg, #c7d2fe, #eef2ff)',
      shadowColor: 'rgba(79,70,229,0.25)',
      route: '/games',
    },
    {
      labelKey: 'menu.items.drawing',
      Icon: Palette,
      iconColor: '#d946ef',
      bgGradient: 'linear-gradient(135deg, #f5d0fe, #fdf4ff)',
      shadowColor: 'rgba(217,70,239,0.25)',
      route: '/drawing',
    },
    {
      labelKey: 'menu.items.gallery',
      Icon: ImageIcon,
      iconColor: '#059669',
      bgGradient: 'linear-gradient(135deg, #a7f3d0, #ecfdf5)',
      shadowColor: 'rgba(5,150,105,0.25)',
      route: '/gallery',
    },
    {
      labelKey: 'menu.items.news',
      Icon: Newspaper,
      iconColor: '#475569',
      bgGradient: 'linear-gradient(135deg, #cbd5e1, #f8fafc)',
      shadowColor: 'rgba(71,85,105,0.25)',
      route: '/news',
    },
  ],
  sistema: [
    {
      labelKey: 'menu.items.settings',
      Icon: Settings,
      iconColor: '#1e293b',
      bgGradient: 'linear-gradient(135deg, #94a3b8, #f1f5f9)',
      shadowColor: 'rgba(30,41,59,0.25)',
      route: '/settings',
    },
    {
      labelKey: 'menu.items.virtualMouse',
      Icon: MousePointer2,
      iconColor: '#0891b2',
      bgGradient: 'linear-gradient(135deg, #a5f3fc, #ecfeff)',
      shadowColor: 'rgba(8,145,178,0.25)',
      route: '/virtual-mouse',
    },
  ],
};

const TAB_META: { key: TabKey; labelKey: string; icon: string }[] = [
  { key: 'comunicacao', labelKey: 'menu.tabs.communication', icon: '🗣️' },
  { key: 'cuidados', labelKey: 'menu.tabs.care', icon: '🩺' },
  { key: 'lazer', labelKey: 'menu.tabs.leisure', icon: '🎮' },
  { key: 'sistema', labelKey: 'menu.tabs.system', icon: '⚙️' },
];

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('comunicacao');

  const handleTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const nextIdx =
      e.key === 'ArrowDown'
        ? (currentIdx + 1) % TAB_META.length
        : (currentIdx - 1 + TAB_META.length) % TAB_META.length;
    setActiveTab(TAB_META[nextIdx].key);
    const btn = document.getElementById(`tab-${TAB_META[nextIdx].key}`);
    btn?.focus();
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('menu.skipToContent')}
      </a>
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #f0f4ff 0%, #e8f0fb 40%, #f1f5f9 100%)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(27,84,168,0.08), transparent)',
            top: '-15%',
            left: '-10%',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(239,68,68,0.08), transparent)',
            bottom: '-10%',
            right: '-8%',
            zIndex: 0,
          }}
        />

        <header
          role="banner"
          style={{
            padding: '1.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            position: 'relative',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <img
            src="/LOGO.png"
            alt="IrisFlow"
            style={{ height: '3rem' }}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <LanguageSwitcher compact />
          </div>
        </header>

        <div style={{ display: 'flex', flex: 1, zIndex: 10 }}>
          <div
            aria-label={t('menu.tabsAriaLabel')}
            role="tablist"
            aria-orientation="vertical"
            style={{
              width: 420,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              borderRight: '1px solid rgba(0,0,0,0.05)',
              background: 'rgba(255,255,255,0.3)',
            }}
          >
            {TAB_META.map((tab, idx) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`tab-${tab.key}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`tabpanel-${tab.key}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.key)}
                  onKeyDown={(e) => handleTabKey(e, idx)}
                  style={{
                    padding: '1.75rem 1.5rem',
                    borderRadius: '1.25rem',
                    border: 'none',
                    background: active ? '#1B54A8' : 'white',
                    color: active ? 'white' : '#1e293b',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: active
                      ? '0 8px 24px rgba(27,84,168,0.3)'
                      : '0 4px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span aria-hidden="true">{tab.icon}</span> {t(tab.labelKey)}
                </button>
              );
            })}
          </div>

          <section
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}
          >
            <div id="main-content" tabIndex={-1} />
            <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '2rem', marginTop: 0 }}>
              {t(TAB_META.find((tab) => tab.key === activeTab)?.labelKey ?? '')}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '2rem',
              }}
            >
              {MENU_DATA[activeTab].map(
                ({ labelKey, Icon, iconColor, bgGradient, shadowColor, route }) => {
                  const label = t(labelKey);
                  return (
                    <button
                      key={labelKey}
                      type="button"
                      onClick={() => navigate(route)}
                      aria-label={t('menu.openItem', { item: label.replace(/\n/g, ' ') })}
                      style={{
                        background: 'rgba(255,255,255,0.85)',
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
                        transition: 'transform 0.2s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                      onFocus={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                      onBlur={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          background: bgGradient,
                          padding: '1.25rem',
                          borderRadius: '1.25rem',
                          boxShadow: `0 8px 24px ${shadowColor}`,
                        }}
                      >
                        <Icon size={48} color={iconColor} strokeWidth={2} />
                      </div>
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#1e293b',
                          textAlign: 'center',
                          lineHeight: 1.3,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
