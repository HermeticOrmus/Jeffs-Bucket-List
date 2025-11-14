import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Navigation from '@/components/layout/Navigation'

export const metadata: Metadata = {
  title: "Jeff's Bucket List - Live Your Remaining Years with Intention",
  description: 'A thoughtful platform for adults 60+ to discover and achieve meaningful life goals through guided reflection.',
  keywords: ['bucket list', 'life goals', 'seniors', 'retirement planning', 'meaningful living'],
  authors: [{ name: "Jeff's Bucket List Platform" }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7a9b8e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <AuthProvider>
          {/* Skip to main content link for keyboard navigation */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Main navigation */}
          <Navigation />

          {/* Main content area */}
          <main id="main-content" className="min-h-screen" role="main">
            {children}
          </main>

          {/* Footer */}
          <footer className="px-6 py-8 mt-12" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }} role="contentinfo">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>About</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    A platform designed for adults 60+ to discover and achieve <em>meaningful life goals</em> through thoughtful reflection.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Privacy</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Your reflections and goals are <em>private by default</em>. You control what you share and with whom.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Support</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Need help? Contact us at <em>support@jeffsbucketlist.com</em>
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <p className="text-center" style={{ color: 'var(--text-tertiary)' }}>
                  &copy; 2025 Jeff&apos;s Bucket List. <em>Built with respect and dignity.</em>
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
