import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16" aria-labelledby="hero-heading">
        <h2 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Live Your Remaining Years with<br />Intention and Meaning
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Not just another bucket list. A thoughtful journey to discover what truly matters to you
          through guided reflection and age-appropriate goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/discovery"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white text-lg font-bold px-8 py-4 rounded-lg transition-colors no-underline shadow-lg"
          >
            Start Your Discovery Journey
          </Link>
          <Link
            href="/about"
            className="inline-block bg-white hover:bg-gray-50 text-gray-800 text-lg font-bold px-8 py-4 rounded-lg transition-colors no-underline border-2 border-gray-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16" aria-labelledby="features-heading">
        <h3 id="features-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200">
            <div className="text-4xl mb-4" aria-hidden="true">🤔</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Thoughtful Questions</h4>
            <p className="text-gray-700 leading-relaxed">
              Not generic prompts. Age-appropriate questions that help you reflect on what truly matters in this stage of life.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200">
            <div className="text-4xl mb-4" aria-hidden="true">🎯</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Meaningful Goals</h4>
            <p className="text-gray-700 leading-relaxed">
              Discover goals that fit your life: reconnecting with loved ones, sharing wisdom, or savoring simple joys.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200">
            <div className="text-4xl mb-4" aria-hidden="true">🔒</div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Private by Default</h4>
            <p className="text-gray-700 leading-relaxed">
              Your reflections are yours alone. Choose what to share with family, or keep everything private.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="mb-16" aria-labelledby="categories-heading">
        <h3 id="categories-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
          Life Areas to Explore
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg p-6 shadow border-2 border-gray-200 hover:border-primary-400 transition-colors"
            >
              <div className="text-3xl mb-3" aria-hidden="true">{category.icon}</div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h4>
              <p className="text-gray-700">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Begin?
        </h3>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Take 10-15 minutes to explore what truly matters to you. No pressure, no judgment, just thoughtful reflection.
        </p>
        <Link
          href="/discovery"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white text-lg font-bold px-10 py-4 rounded-lg transition-colors no-underline shadow-lg"
        >
          Start Discovery
        </Link>
      </section>
    </div>
  )
}

const categories = [
  {
    name: 'Reconnection',
    icon: '❤️',
    description: 'Relationships to rebuild or deepen with people who matter',
  },
  {
    name: 'Learning',
    icon: '📚',
    description: 'Skills to acquire and knowledge to explore at your own pace',
  },
  {
    name: 'Creation',
    icon: '🎨',
    description: 'Things to make, build, or bring into the world',
  },
  {
    name: 'Completion',
    icon: '✅',
    description: 'Unfinished business and projects worth completing',
  },
  {
    name: 'Contribution',
    icon: '🤝',
    description: 'Ways to give back and make a difference in your community',
  },
  {
    name: 'Simple Joys',
    icon: '🌟',
    description: 'Moments to savor and experiences to enjoy regularly',
  },
]
