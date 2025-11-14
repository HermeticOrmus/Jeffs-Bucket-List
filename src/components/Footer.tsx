/**
 * Footer Component
 * 
 * Displays footer information including links (About, Privacy, Support),
 * contact email, and copyright notice.
 */

import { Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-light py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-text mb-2">
              <span className="text-accent-teal">Jeff's</span> Bucket List
            </h3>
            <p className="text-sm text-text-secondary">
              Living with intention and meaning
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wide">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-light pt-8 mb-8">
          {/* Contact Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-accent-teal" strokeWidth={1.5} />
              <a href="mailto:hello@jeffsbucketlist.com" className="text-text-secondary hover:text-accent-teal transition-colors">
                hello@jeffsbucketlist.com
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors font-medium">
                Twitter
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors font-medium">
                LinkedIn
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-teal transition-colors font-medium">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-text-secondary">
          <p>&copy; {currentYear} Jeff's Bucket List. All rights reserved.</p>
          <p className="mt-2">Made with intention and care for meaningful living.</p>
        </div>
      </div>
    </footer>
  );
}
