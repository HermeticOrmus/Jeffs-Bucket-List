/**
 * Header Component
 * 
 * Displays the fixed navigation bar with logo and main navigation links.
 * Features the site branding "Jeff's Bucket List" with tagline and responsive navigation.
 */

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border-light z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold text-text">
            <span className="text-accent-teal">Jeff's</span> Bucket List
          </h1>
          <p className="text-xs md:text-sm text-text-secondary font-light">
            Living with intention and meaning
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a 
            href="#home" 
            className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
          >
            Home
          </a>
          <a 
            href="#discovery" 
            className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
          >
            Discovery
          </a>
          <a 
            href="#goals" 
            className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
          >
            My Goals
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-text-secondary hover:text-accent-teal transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-surface border-t border-border-light">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#home" 
              className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#discovery" 
              className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Discovery
            </a>
            <a 
              href="#goals" 
              className="text-text-secondary hover:text-accent-teal font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Goals
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
