import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Jeff&apos;s Bucket List
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          A platform designed specifically for adults 60+ to discover and achieve meaningful life goals
          through thoughtful reflection and guided questions.
        </p>
      </section>

      {/* Origin Story */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle as="h3">Born from a Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-gray-700 leading-relaxed">
          <p>
            This platform began with a simple conversation with Jeff, a 73-year-old who wanted to live his
            remaining years with intention and meaning. He didn&apos;t want a generic bucket list filled with
            skydiving and world travel. He wanted something more thoughtful—goals that fit his real life,
            constraints, and values.
          </p>
          <p>
            We discovered that while there are countless bucket list apps, none are designed for the unique
            needs of older adults. None combine thoughtful self-reflection, age-appropriate goal setting,
            and a respectful, non-anxious approach to living meaningfully.
          </p>
          <p className="font-semibold text-gray-900">
            So we built this platform with one guiding question: Does this empower users or extract from them?
          </p>
        </CardContent>
      </Card>

      {/* Principles */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Core Principles</h3>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle as="h4">🎩 Gold Hat Philosophy</CardTitle>
              <CardDescription>Every feature must empower, not extract</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• No dark patterns or manipulative design</li>
                <li>• No social pressure or FOMO mechanics</li>
                <li>• No selling your data</li>
                <li>• Just thoughtful tools that respect your autonomy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h4">🔒 Privacy by Default</CardTitle>
              <CardDescription>Your reflections are yours alone</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Everything private unless you choose to share</li>
                <li>• Granular control over what family can see</li>
                <li>• Your data belongs to you</li>
                <li>• Full export and deletion rights (GDPR compliant)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h4">♿ Accessibility First</CardTitle>
              <CardDescription>Designed for your comfort and ease</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Large, readable fonts (minimum 18px)</li>
                <li>• High contrast for better visibility</li>
                <li>• Generous touch targets (44px minimum)</li>
                <li>• Plain language, no jargon</li>
                <li>• Patient pacing—no time pressure</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h4">💫 Non-Anxious Tracking</CardTitle>
              <CardDescription>Progress without pressure</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Multiple goal statuses beyond "done/not done"</li>
                <li>• Option to "release" goals without guilt</li>
                <li>• No percentages or gamification</li>
                <li>• Focus on meaning, not metrics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h3>
        <Card>
          <CardContent className="space-y-4 text-lg text-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Traditional Bucket Lists</h4>
                <ul className="space-y-1 text-base">
                  <li>❌ Generic prompts</li>
                  <li>❌ Youth-oriented activities</li>
                  <li>❌ Social pressure to share</li>
                  <li>❌ Binary done/not-done tracking</li>
                  <li>❌ One-size-fits-all</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Jeff&apos;s Bucket List</h4>
                <ul className="space-y-1 text-base">
                  <li>✅ Thoughtful, age-appropriate questions</li>
                  <li>✅ Goals that fit real life</li>
                  <li>✅ Private by default</li>
                  <li>✅ Non-anxious progress tracking</li>
                  <li>✅ Personalized to your values</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Begin Your Journey?
        </h3>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Take 10-15 minutes to discover what truly matters to you through our thoughtful question-based
          discovery process.
        </p>
        <Link href="/discovery">
          <Button size="lg">Start Discovery</Button>
        </Link>
      </section>
    </div>
  )
}
