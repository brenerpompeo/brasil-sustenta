import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface DSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

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
    const baseStyles =
      'relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--ring] focus:ring-offset-2 focus:ring-offset-[--background] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

    const variantStyles = {
      primary:
        'bg-[--leaf] text-[--paper] shadow-[0_0_20px_rgba(0,255,133,0.18)] hover:shadow-[0_0_40px_rgba(0,255,133,0.35),0_0_80px_rgba(0,255,133,0.18)] hover:bg-[--leaf-2] active:scale-[0.98]',
      secondary:
        'bg-[--paper-2] text-[--ink] border border-[--leaf]/30 hover:border-[--leaf]/70 hover:bg-[--leaf]/5 hover:shadow-[0_0_20px_rgba(0,255,133,0.12)]',
      outline:
        'bg-transparent text-[--ink] border border-[rgba(255,255,255,0.12)] hover:border-[--leaf]/50 hover:text-[--leaf] hover:bg-[--leaf]/5',
      ghost:
        'bg-transparent text-[--ink]/70 hover:text-[--leaf] hover:bg-[--leaf]/5',
      cta: 'bg-gradient-to-r from-[--leaf] to-[--accent] text-[--paper] font-bold shadow-[0_0_30px_rgba(0,255,133,0.35)] hover:shadow-[0_0_50px_rgba(0,255,133,0.5),0_0_100px_rgba(0,255,133,0.2)] hover:from-[--leaf-2] hover:to-[--accent] active:scale-[0.98] btn-shimmer',
    };

    const sizeStyles = {
      sm: 'px-5 py-2 text-sm',
      md: 'px-7 py-3 text-base',
      lg: 'px-9 py-4 text-lg',
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
