import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-bold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
      primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-md hover:shadow-lg',
      secondary: 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 text-white shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
      ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-base min-h-[44px]', // Still meet 44px touch target
      md: 'px-6 py-3 text-lg min-h-[48px]',
      lg: 'px-8 py-4 text-xl min-h-[56px]',
    }

    const widthStyle = fullWidth ? 'w-full' : ''

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
