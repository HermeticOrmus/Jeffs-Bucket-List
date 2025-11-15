import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined

    const widthStyle = fullWidth ? 'w-full' : ''

    const inputClassName = `
      px-4 py-3 text-base
      rounded-lg border-2
      ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-primary-500'}
      bg-white
      focus:outline-none focus:ring-4 focus:ring-primary-200
      disabled:bg-gray-100 disabled:cursor-not-allowed
      transition-colors duration-200
      ${widthStyle}
      ${className}
    `.trim()

    return (
      <div className={widthStyle}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-base font-semibold text-gray-900 mb-2"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [errorId, helperId].filter(Boolean).join(' ') || undefined
          }
          required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 text-base text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-base text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${textareaId}-error` : undefined
    const helperId = helperText ? `${textareaId}-helper` : undefined

    const widthStyle = fullWidth ? 'w-full' : ''

    const textareaClassName = `
      px-4 py-3 text-base
      rounded-lg border-2
      ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-primary-500'}
      bg-white
      focus:outline-none focus:ring-4 focus:ring-primary-200
      disabled:bg-gray-100 disabled:cursor-not-allowed
      transition-colors duration-200
      resize-vertical
      ${widthStyle}
      ${className}
    `.trim()

    return (
      <div className={widthStyle}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-base font-semibold text-gray-900 mb-2"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={textareaClassName}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [errorId, helperId].filter(Boolean).join(' ') || undefined
          }
          required={required}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 text-base text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-base text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
