import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-5xl md:text-6xl font-semibold mb-6"
            style={{
              color: 'hsl(var(--text))',
              fontFamily: 'var(--font-serif)',
              lineHeight: '1.2'
            }}
          >
            Live Your Remaining Years with<br />
            <span className="flavor-text">Intention and Meaning</span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'hsl(var(--text-secondary))' }}
          >
            Not just another bucket list. A thoughtful journey to discover what truly matters to you
            through guided reflection and age-appropriate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/discovery"
              className="inline-block text-xl font-semibold px-12 py-5 rounded-lg transition-all no-underline shadow-lg hover:shadow-xl min-h-[56px] flex items-center"
              style={{
                background: 'hsl(var(--accent-teal))',
                color: 'hsl(var(--background))',
              }}
            >
              Start Your Discovery Journey
            </Link>
            <Link
              href="/about"
              className="inline-block text-xl font-semibold px-12 py-5 rounded-lg transition-all no-underline min-h-[56px] flex items-center"
              style={{
                background: 'transparent',
                color: 'hsl(var(--accent-teal))',
                border: '2px solid hsl(var(--accent-teal))'
              }}
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20" aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-4xl font-semibold text-center mb-16"
            style={{
              color: 'hsl(var(--text))',
              fontFamily: 'var(--font-serif)'
            }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="rounded-xl p-8 transition-all"
              style={{
                background: 'hsl(var(--surface))',
                border: '2px solid hsl(var(--border))'
              }}
            >
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: 'hsl(var(--text))' }}
              >
                Thoughtful Questions
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'hsl(var(--text-secondary))' }}
              >
                Not generic prompts. Age-appropriate questions that help you reflect on what truly matters in this stage of life.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="rounded-xl p-8 transition-all"
              style={{
                background: 'hsl(var(--surface))',
                border: '2px solid hsl(var(--border))'
              }}
            >
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: 'hsl(var(--text))' }}
              >
                <em className="flavor-text">Meaningful Goals</em>
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'hsl(var(--text-secondary))' }}
              >
                Discover goals that fit your life: reconnecting with loved ones, sharing wisdom, or savoring simple joys.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="rounded-xl p-8 transition-all"
              style={{
                background: 'hsl(var(--surface))',
                border: '2px solid hsl(var(--border))'
              }}
            >
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: 'hsl(var(--text))' }}
              >
                Private by Default
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'hsl(var(--text-secondary))' }}
              >
                Your reflections are yours alone. Choose what to share with family, or keep everything private.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="mb-20" aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="text-4xl font-semibold text-center mb-16"
            style={{
              color: 'hsl(var(--text))',
              fontFamily: 'var(--font-serif)'
            }}
          >
            Life Areas to Explore
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-lg p-6 transition-all hover:scale-105"
                style={{
                  background: 'hsl(var(--surface))',
                  border: '2px solid hsl(var(--border))',
                }}
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: 'hsl(var(--accent-teal))',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {category.name}
                </h3>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'hsl(var(--text-secondary))' }}
                >
                  <em>{category.description}</em>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="rounded-2xl p-12 md:p-16 text-center"
          style={{
            background: 'hsl(var(--surface))',
            border: '2px solid hsl(var(--accent-teal))'
          }}
        >
          <h2
            className="text-4xl font-semibold mb-6"
            style={{
              color: 'hsl(var(--text))',
              fontFamily: 'var(--font-serif)'
            }}
          >
            Ready to Begin?
          </h2>
          <p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'hsl(var(--text-secondary))' }}
          >
            Take 10-15 minutes to explore what truly matters to you.
            <br />
            <em className="flavor-text">No pressure, no judgment, just thoughtful reflection.</em>
          </p>
          <Link
            href="/discovery"
            className="inline-block text-xl font-semibold px-12 py-5 rounded-lg transition-all no-underline shadow-lg hover:shadow-xl min-h-[56px] flex items-center justify-center mx-auto"
            style={{
              background: 'hsl(var(--accent-teal))',
              color: 'hsl(var(--background))',
              maxWidth: 'fit-content'
            }}
          >
            Start Discovery
          </Link>
        </section>
      </div>
    </div>
  )
}

const categories = [
  {
    name: 'Reconnection',
    description: 'Relationships to rebuild or deepen with people who matter',
  },
  {
    name: 'Learning',
    description: 'Skills to acquire and knowledge to explore at your own pace',
  },
  {
    name: 'Creation',
    description: 'Things to make, build, or bring into the world',
  },
  {
    name: 'Completion',
    description: 'Unfinished business and projects worth completing',
  },
  {
    name: 'Contribution',
    description: 'Ways to give back and make a difference in your community',
  },
  {
    name: 'Simple Joys',
    description: 'Moments to savor and experiences to enjoy regularly',
  },
]
