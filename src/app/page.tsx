import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'hsl(var(--background))' }}>
      <div className="max-w-3xl w-full text-center">
        {/* Simple, Direct Introduction */}
        <h1
          className="text-5xl md:text-6xl font-semibold mb-8"
          style={{
            color: 'hsl(var(--text))',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.3'
          }}
        >
          What truly matters to you<br />
          <span className="flavor-text">in the time you have left?</span>
        </h1>

        <p
          className="text-2xl md:text-3xl mb-12 leading-relaxed"
          style={{ color: 'hsl(var(--text-secondary))' }}
        >
          Meet Jeff. He's here to help you think about that question.
        </p>

        {/* Single Clear Call to Action */}
        <Link
          href="/chat"
          className="inline-block text-2xl font-semibold px-16 py-6 rounded-lg transition-all no-underline shadow-lg hover:shadow-xl min-h-[64px] mb-8"
          style={{
            background: 'hsl(var(--accent-teal))',
            color: 'hsl(var(--background))',
          }}
        >
          Start a Conversation
        </Link>

        {/* Minimal Reassurance */}
        <p
          className="text-lg"
          style={{ color: 'hsl(var(--text-secondary) / 0.8)' }}
        >
          No account needed to begin.
          <br />
          <em className="flavor-text">Just a thoughtful conversation.</em>
        </p>
      </div>
    </div>
  )
}
