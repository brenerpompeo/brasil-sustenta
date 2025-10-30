import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface DSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Design System Button Component
 * 
 * Botão premium seguindo a identidade visual "Impacto Sofisticado"
 * - Primary: Gradiente verde com hover effect
 * - Secondary: Fundo escuro com borda verde
 * - Outline: Transparente com borda
 * - Ghost: Sem fundo, apenas texto
 */
const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'gradient-cta text-white shadow-lg',
      secondary: 'bg-card text-foreground border-2 border-primary hover:bg-primary/10 hover:border-primary/80',
      outline: 'bg-transparent text-foreground border-2 border-border hover:border-primary hover:text-primary',
      ghost: 'bg-transparent text-muted-foreground hover:text-primary hover:bg-primary/5',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

DSButton.displayName = 'DSButton';

export default DSButton;
