import { HTMLAttributes, ReactNode } from 'react';

interface DSCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
}

/**
 * Design System Card Component
 * 
 * Card premium seguindo a identidade visual "Impacto Sofisticado"
 * - Default: Fundo card padrão
 * - Bordered: Com borda sutil
 * - Elevated: Com sombra elevada
 * - Gradient: Com gradiente radial de fundo
 */
const DSCard = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children,
  ...props
}: DSCardProps) => {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-card',
    bordered: 'bg-card border border-border',
    elevated: 'bg-card shadow-2xl',
    gradient: 'bg-card gradient-radial-primary',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/50 cursor-pointer'
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
