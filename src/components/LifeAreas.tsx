/**
 * LifeAreas Component
 * 
 * Displays a grid of six life category cards that help users explore different
 * aspects of their lives: Reconnection, Learning, Creation, Completion, Contribution, and Simple Joys.
 */

import { Users, BookOpen, Palette, CheckCircle2, Heart, Sparkles } from 'lucide-react';

export function LifeAreas() {
  const lifeAreas = [
    {
      id: 1,
      icon: Users,
      title: 'Reconnection',
      description: 'Rebuild relationships and connect with people who matter most to you.'
    },
    {
      id: 2,
      icon: BookOpen,
      title: 'Learning',
      description: 'Explore new skills, knowledge, and perspectives that interest you.'
    },
    {
      id: 3,
      icon: Palette,
      title: 'Creation',
      description: 'Express yourself through art, writing, music, or other creative pursuits.'
    },
    {
      id: 4,
      icon: CheckCircle2,
      title: 'Completion',
      description: 'Finish what you started or resolve unfinished business.'
    },
    {
      id: 5,
      icon: Heart,
      title: 'Contribution',
      description: 'Give back to your community and make a positive impact on others.'
    },
    {
      id: 6,
      icon: Sparkles,
      title: 'Simple Joys',
      description: 'Celebrate and savor the everyday moments that bring happiness.'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-semibold text-text mb-4">
            Explore Your Life Areas
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover what matters most to you across different dimensions of a meaningful life.
          </p>
        </div>

        {/* Life Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lifeAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.id}
                className="group bg-surface border border-border-light rounded-xl p-8 hover:border-primary hover:shadow-lg hover:bg-background transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => alert(`Clicked: ${area.title}`)}
              >
                {/* Icon Container */}
                <div className="mb-6 inline-block p-4 bg-primary-light rounded-lg group-hover:bg-primary transition-colors">
                  <Icon size={24} className="text-primary group-hover:text-background transition-colors" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium text-primary">Explore →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
