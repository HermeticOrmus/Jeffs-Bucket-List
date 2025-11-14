'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
        <Card className="w-full max-w-md" style={{ borderColor: 'var(--border-medium)' }}>
          <CardHeader>
            <CardTitle as="h1" style={{ color: 'var(--text-primary)' }}>
              Check Your Email
            </CardTitle>
            <CardDescription style={{ color: 'var(--text-secondary)' }}>
              Password reset instructions sent to <em>{email}</em>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p style={{ color: 'var(--text-secondary)' }}>
              We've sent you an email with a link to reset your password. Please check your inbox and follow the instructions.
            </p>
          </CardContent>

          <CardFooter>
            <Link href="/login" className="w-full">
              <Button fullWidth variant="outline" size="lg">
                Return to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <Card className="w-full max-w-md" style={{ borderColor: 'var(--border-medium)' }}>
        <CardHeader>
          <CardTitle as="h1" style={{ color: 'var(--text-primary)' }}>
            Reset Password
          </CardTitle>
          <CardDescription style={{ color: 'var(--text-secondary)' }}>
            Enter your email address and we'll send you <em>reset instructions</em>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div
                className="p-4 rounded-lg"
                style={{
                  background: 'var(--color-error)',
                  color: 'var(--text-primary)',
                  opacity: 0.9,
                }}
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="your.email@example.com"
                className="w-full"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
              className="font-medium"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Remember your password?{' '}
              <Link href="/login" style={{ color: 'var(--color-primary-light)' }} className="font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
