import React from 'react';

interface DwellButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dwellTime?: number;
  onDwellClick: () => void;
  progressColor?: string;
  activeColor?: string;
  children: React.ReactNode;
}

export const DwellButton: React.FC<DwellButtonProps> = ({
  dwellTime: _dwellTime,
  onDwellClick,
  progressColor: _progressColor,
  activeColor: _activeColor,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={className}
      style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
      onClick={onDwellClick}
      {...props}
    >
      {children}
    </button>
  );
};
