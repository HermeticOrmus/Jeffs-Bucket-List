import './global.css';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { LifeAreas } from './components/LifeAreas';
import { Footer } from './components/Footer';

export default function App() {
  // Configure tailwind theme
  if (typeof window !== 'undefined' && window.tailwind) {
    window.tailwind.config = {
      ...window.tailwind.config,
      theme: {
        extend: {
          colors: {
            primary: 'hsl(var(--primary))',
            'primary-light': 'hsl(var(--primary-light))',
            'primary-dark': 'hsl(var(--primary-dark))',
            text: 'hsl(var(--text))',
            'text-secondary': 'hsl(var(--text-secondary))',
            background: 'hsl(var(--background))',
            surface: 'hsl(var(--surface))',
            border: 'hsl(var(--border))',
            'border-light': 'hsl(var(--border-light))',
            'accent-teal': 'hsl(var(--accent-teal))',
            'accent-teal-light': 'hsl(var(--accent-teal-light))',
            success: 'hsl(var(--success))',
            warning: 'hsl(var(--warning))',
            error: 'hsl(var(--error))',
          },
        },
      },
    };
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <LifeAreas />
      <Footer />
    </div>
  );
}
