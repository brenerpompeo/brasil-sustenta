import { HTMLAttributes, ReactNode } from 'react';

interface DSCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient' | 'glass' | 'neon';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
}

const DSCard = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}: DSCardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-[--card]',
    bordered: 'bg-[--card] border border-[rgba(255,255,255,0.08)]',
    elevated: 'bg-[--card] shadow-2xl',
    gradient: 'bg-[--card] [background:radial-gradient(ellipse_at_top_left,rgba(0,255,133,0.06)_0%,transparent_60%),var(--card)]',
    glass:
      'bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    neon: 'bg-[--card] border border-[--leaf]/30 shadow-[0_0_20px_rgba(0,255,133,0.08)]',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:shadow-[0_0_40px_rgba(0,255,133,0.15)] hover:border-[--leaf]/40 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default DSCard;
