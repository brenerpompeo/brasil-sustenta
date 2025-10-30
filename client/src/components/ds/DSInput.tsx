import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface DSInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Design System Input Component
 * 
 * Input premium seguindo a identidade visual "Impacto Sofisticado"
 * - Foco com borda verde
 * - Suporte a ícones laterais
 * - Estados de erro e helper text
 */
const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-card border-2 border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed';

    const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';
    const widthStyle = fullWidth ? 'w-full' : '';
    const iconPaddingLeft = leftIcon ? 'pl-12' : '';
    const iconPaddingRight = rightIcon ? 'pr-12' : '';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${baseStyles} ${errorStyles} ${widthStyle} ${iconPaddingLeft} ${iconPaddingRight} ${className}`}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

DSInput.displayName = 'DSInput';

export default DSInput;
