'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { mockCategories } from '@/lib/mockData'

export default function DiscoveryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleStartGeneralDiscovery = () => {
    // Start general discovery without category focus
    window.location.href = '/discovery/session'
  }

  const handleStartCategoryDiscovery = (categoryId: string) => {
    // Start category-focused discovery
    window.location.href = `/discovery/session?category=${categoryId}`
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Welcome Section */}
      <section className="mb-12" aria-labelledby="discovery-heading">
        <h2 id="discovery-heading" className="text-4xl font-bold text-gray-900 mb-4">
          Begin Your Discovery Journey
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
          Take 10-15 minutes to explore what truly matters to you through thoughtful questions.
          There are no wrong answers, and you can skip any question that doesn''t feel right.
        </p>
      </section>

      {/* Getting Started Card */}
      <Card className="mb-12 border-primary-200 bg-primary-50">
        <CardHeader>
          <CardTitle as="h3">How Discovery Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                1
              </span>
              <div>
                <h4 className="font-bold text-lg">Choose your path</h4>
                <p className="text-gray-700">
                  Start with general reflection or explore a specific life area that''s on your mind.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                2
              </span>
              <div>
                <h4 className="font-bold text-lg">Answer at your own pace</h4>
                <p className="text-gray-700">
                  Reflect on thoughtful questions. Skip any that don''t resonate. We''ll save your progress automatically.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary-500 text-white rounded-full font-bold">
                3
              </span>
              <div>
                <h4 className="font-bold text-lg">Discover meaningful goals</h4>
                <p className="text-gray-700">
                  After answering several questions, we''ll suggest personalized goals that fit your life and aspirations.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            fullWidth
            onClick={handleStartGeneralDiscovery}
          >
            Start General Discovery
          </Button>
        </CardFooter>
      </Card>

      {/* Category Selection */}
      <section className="mb-12" aria-labelledby="categories-heading">
        <h3 id="categories-heading" className="text-3xl font-bold text-gray-900 mb-6">
          Or Explore a Specific Life Area
        </h3>
        <p className="text-lg text-gray-700 mb-8">
          If there''s a particular aspect of life you''d like to focus on, choose a category below.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category) => (
            <Card
              key={category.id}
              hoverable
              className="cursor-pointer"
              onClick={() => handleStartCategoryDiscovery(category.id)}
            >
              <CardHeader>
                <div className="text-4xl mb-3" aria-hidden="true">
                  {category.icon}
                </div>
                <CardTitle as="h4">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" fullWidth>
                  Explore {category.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-gray-100 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Not Sure Where to Start?
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          If you''re feeling uncertain, that''s perfectly okay. The general discovery path will gently guide you through
          different areas of life to help you uncover what matters most right now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={handleStartGeneralDiscovery}
          >
            Start General Discovery
          </Button>
          <Link href="/">
            <Button variant="ghost" size="lg">
              Learn More About the Platform
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
