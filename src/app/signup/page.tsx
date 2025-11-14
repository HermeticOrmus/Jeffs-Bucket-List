'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Link from 'next/link'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password, displayName)

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
              We've sent you a confirmation link to <em>{email}</em>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p style={{ color: 'var(--text-secondary)' }}>
              Please click the link in the email to verify your account and complete your registration.
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
            Begin Your Journey
          </CardTitle>
          <CardDescription style={{ color: 'var(--text-secondary)' }}>
            Create your account to start exploring <em>what matters most</em>
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
                htmlFor="displayName"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Your Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                autoComplete="name"
                placeholder="What should we call you?"
                className="w-full"
              />
            </div>

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

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className="w-full"
              />
            </div>

            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              By creating an account, you agree to our privacy-first approach. Your data is yours alone,
              and we'll never share it without your explicit consent.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
              className="font-medium"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
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
