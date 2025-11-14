import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

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
  themeColor: '#eb7008',
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
      <body>
        {/* Skip to main content link for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Main navigation */}
        <nav className="bg-white border-b-2 border-gray-200 px-6 py-4" role="navigation" aria-label="Main navigation">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">
                Jeff&apos;s Bucket List
              </h1>
              <p className="text-sm text-gray-600 mt-1">Living with intention and meaning</p>
            </div>
            <div className="flex gap-6">
              <a href="/" className="text-base font-semibold hover:text-primary-600 transition-colors">
                Home
              </a>
              <a href="/discovery" className="text-base font-semibold hover:text-primary-600 transition-colors">
                Discovery
              </a>
              <a href="/goals" className="text-base font-semibold hover:text-primary-600 transition-colors">
                My Goals
              </a>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main id="main-content" className="min-h-screen bg-gray-50" role="main">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white px-6 py-8 mt-12" role="contentinfo">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-3">About</h3>
                <p className="text-gray-300">
                  A platform designed for adults 60+ to discover and achieve meaningful life goals through thoughtful reflection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Privacy</h3>
                <p className="text-gray-300">
                  Your reflections and goals are private by default. You control what you share and with whom.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Support</h3>
                <p className="text-gray-300">
                  Need help? Contact us at support@jeffsbucketlist.com
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2025 Jeff&apos;s Bucket List. Built with respect and dignity.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
