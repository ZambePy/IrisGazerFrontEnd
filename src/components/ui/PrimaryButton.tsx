import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const styles: Record<Required<PrimaryButtonProps>['variant'], React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #1B54A8, #2563eb)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(27,84,168,0.35)',
  },
  secondary: {
    background: 'white',
    color: '#475569',
    border: '2px solid #e2e8f0',
    boxShadow: 'none',
  },
  danger: {
    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(220,38,38,0.35)',
  },
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant = 'primary',
  fullWidth,
  style,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem 1.75rem',
        borderRadius: '1rem',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Boldonse, sans-serif',
        fontSize: '1rem',
        fontWeight: 700,
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};
