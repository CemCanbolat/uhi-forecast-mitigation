'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-sm">
      <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-20 py-2 sm:py-4 flex items-center justify-between">
        <Link href="/" className="text-base sm:text-xl font-bold text-white hover:text-gray-300 flex items-center gap-2">
          <Image src="/logo-white.png" alt="Logo" width={50} height={50} />
          <span className="text-md sm:text-base md:text-xl">AI-Powered UHI Prediction System</span>
        </Link>

      <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            href="/app"
            className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            App
          </Link>
          <Link
            href="/docs"
            className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            Documentation
          </Link>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 md:hidden bg-gray-700 shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/app"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              App
            </Link>
            <Link
              href="/docs"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
