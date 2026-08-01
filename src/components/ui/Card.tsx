import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  color?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  icon,
  label,
  sublabel,
  color = '#1B54A8',
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="action-card"
    style={{
      background: `linear-gradient(135deg, ${color}15, ${color}08)`,
      border: `2px solid ${color}30`,
      borderRadius: '1.5rem',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '1rem',
        background: `linear-gradient(135deg, ${color}25, ${color}10)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#1e293b',
        textAlign: 'center',
        lineHeight: 1.3,
      }}
    >
      {label}
    </span>
    {sublabel && (
      <span
        style={{
          fontSize: '0.8rem',
          color: '#64748b',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
        }}
      >
        {sublabel}
      </span>
    )}
  </button>
);
