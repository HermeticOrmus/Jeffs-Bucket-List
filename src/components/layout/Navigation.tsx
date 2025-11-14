'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

export default function Navigation() {
  const pathname = usePathname()
  const { user, signOut, loading } = useAuth()

  // Don't show navigation on auth pages
  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(pathname)
  if (isAuthPage) return null

  const navLinks = user
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/chat', label: 'Chat with Jeff' },
        { href: '/discovery', label: 'Discovery' },
        { href: '/goals', label: 'My Goals' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
      ]

  return (
    <nav
      className="px-6 py-4"
      style={{
        background: 'hsl(var(--surface))',
        borderBottom: '1px solid hsl(var(--border))',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={user ? '/dashboard' : '/'}>
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--accent-teal))', fontFamily: 'var(--font-serif)' }}>
              Jeff&apos;s Bucket List
            </h1>
            <p className="text-xs flavor-text">
              Living with intention and meaning
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors ${
                pathname === link.href ? 'font-semibold' : ''
              }`}
              style={{
                color:
                  pathname === link.href
                    ? 'hsl(var(--accent-teal))'
                    : 'hsl(var(--text-secondary))',
              }}
            >
              {link.label}
            </Link>
          ))}

          {!loading && (
            <div className="ml-4 flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/profile">
                    <Avatar
                      fallback={user.user_metadata?.display_name || user.email || 'U'}
                      size="md"
                    />
                  </Link>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
