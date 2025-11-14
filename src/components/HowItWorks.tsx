/**
 * HowItWorks Component
 * 
 * Displays three feature cards highlighting the platform's core approach:
 * - Thoughtful Questions
 * - Meaningful Goals
 * - Private by Default
 */

import { Brain, Target, Lock } from 'lucide-react';

export function HowItWorks() {
  const features = [
    {
      id: 1,
      icon: Brain,
      title: 'Thoughtful Questions',
      description: 'Answer meaningful questions designed to help you reflect on what truly matters in this chapter of your life.'
    },
    {
      id: 2,
      icon: Target,
      title: 'Meaningful Goals',
      description: 'Turn your reflections into actionable goals tailored to your priorities, values, and available time.'
    },
    {
      id: 3,
      icon: Lock,
      title: 'Private by Default',
      description: 'Your bucket list is completely private. Share only what you want with the people you choose.'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-surface relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-semibold text-text mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A simple, thoughtful approach to living with purpose and intention.
          </p>
          <p className="flavor-text text-sm md:text-base mt-4">
            Three pillars to guide your journey
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-background p-8 md:p-10 rounded-xl border border-border-light hover:border-accent-teal hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6 inline-block p-3 bg-accent-teal rounded-lg">
                  <Icon size={28} className="text-background" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-accent-teal mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
