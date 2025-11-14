import React from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-20 w-20 text-lg',
  xl: 'h-28 w-28 text-2xl',
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false)

  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white shadow-lg ${className}`}
      role="img"
      aria-label={alt}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export interface AvatarGroupProps {
  avatars: Array<{ src?: string; alt?: string; fallback?: string }>
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 3,
  size = 'md',
}) => {
  const displayed = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className="flex items-center -space-x-3">
      {displayed.map((avatar, i) => (
        <Avatar key={i} {...avatar} size={size} className="ring-2 ring-white" />
      ))}
      {remaining > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 ring-2 ring-white`}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
