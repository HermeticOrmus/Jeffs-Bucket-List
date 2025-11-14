'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Link from 'next/link'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <Card className="w-full max-w-md" style={{ borderColor: 'var(--border-medium)' }}>
        <CardHeader>
          <CardTitle as="h1" style={{ color: 'var(--text-primary)' }}>
            Welcome Back
          </CardTitle>
          <CardDescription style={{ color: 'var(--text-secondary)' }}>
            Sign in to continue your <em>journey</em>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-sm"
                  style={{ color: 'var(--color-primary-light)' }}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <Link href="/signup" style={{ color: 'var(--color-primary-light)' }} className="font-medium">
                Create one
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
