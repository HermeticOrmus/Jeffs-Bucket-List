/**
 * HeroSection Component
 * 
 * Main hero banner with headline, value proposition, and call-to-action buttons.
 * Includes primary and secondary action buttons for user engagement.
 */

export function HeroSection() {
  return (
    <section className="pt-32 md:pt-40 pb-20 md:pb-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-teal-light rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-slide-up">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-semibold text-text leading-tight mb-6 md:mb-8">
            Make the most of your remaining years
          </h2>

          {/* Value Proposition */}
          <p className="text-lg md:text-xl text-text-secondary mb-10 md:mb-12 max-w-3xl leading-relaxed">
            Not just another bucket list. A thoughtful journey to discover what truly matters to you through guided reflection and age-appropriate goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <button 
              className="px-8 py-4 md:py-5 bg-accent-teal text-background font-semibold rounded-lg hover:bg-accent-teal-light transition-colors shadow-lg hover:shadow-xl"
              onClick={() => alert('Get Started clicked')}
            >
              Get Started
            </button>
            <button 
              className="px-8 py-4 md:py-5 bg-background text-accent-teal border-2 border-accent-teal font-semibold rounded-lg hover:bg-surface transition-colors"
              onClick={() => alert('Learn More clicked')}
            >
              Learn More
            </button>
          </div>

          {/* Flavor Text */}
          <p className="flavor-text text-sm md:text-base mt-8 md:mt-10">
            "Living intentionally isn't about doing more—it's about doing what matters most."
          </p>

          {/* Trust Statement */}
          <p className="text-sm text-text-secondary mt-6 md:mt-8">
            ✓ Private by default • ✓ No ads • ✓ Built for you
          </p>
        </div>
      </div>
    </section>
  );
}
