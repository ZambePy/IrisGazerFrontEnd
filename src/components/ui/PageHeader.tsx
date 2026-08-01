import React from 'react';
import { BackButton } from './BackButton';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  showBack?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  actions,
  showBack = true,
}) => (
  <header
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {showBack && <BackButton />}
      {icon}
      <h1
        style={{
          fontSize: '2rem',
          color: '#1e293b',
          margin: 0,
          fontWeight: 800,
        }}
      >
        {title}
      </h1>
    </div>
    {actions && <div style={{ display: 'flex', gap: '0.75rem' }}>{actions}</div>}
  </header>
);
