import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  onClick,
  style,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverStyle = hoverable
    ? 'hover:shadow-lg hover:border-primary-300 transition-all duration-200'
    : ''

  const combinedClassName = `bg-white rounded-xl border-2 border-gray-200 shadow-md ${paddingStyles[padding]} ${hoverStyle} ${className}`

  const Component = onClick ? 'button' : 'div'
  const extraProps = onClick ? { onClick, type: 'button' as const, style } : { style }

  return <Component className={combinedClassName} {...extraProps}>{children}</Component>
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  style,
}) => {
  return <div className={`mb-4 ${className}`} style={style}>{children}</div>
}

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  style?: React.CSSProperties
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  as: Component = 'h3',
  style,
}) => {
  return (
    <Component className={`text-2xl font-bold text-gray-900 ${className}`} style={style}>
      {children}
    </Component>
  )
}

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <p className={`text-base text-gray-600 mt-2 leading-relaxed ${className}`} style={style}>
      {children}
    </p>
  )
}

export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>
}

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return <div className={`mt-6 ${className}`}>{children}</div>
}
