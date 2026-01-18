'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">JDSA Students Bank</h1>
          <nav className="flex gap-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
            <Link href="/student/login">
              <Button variant="outline" size="sm">
                Student Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Mosque Illustration */}
          <div className="flex justify-center">
            <img
              src="/images/screenshot-2026-01-18-15-15-30-63-40deb401b9ffe8e1df2f1cc5ba480b12.jpg"
              alt="JDSA Students Bank"
              className="w-64 h-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome to <span className="text-purple-600">JDSA</span>
            </h2>
            <h3 className="text-3xl font-bold text-purple-600">
              Students Bank
            </h3>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-8 h-3 rounded-full bg-teal-700"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>

          {/* CTA Button */}
          <Link href="/admin/login">
            <Button 
              size="lg" 
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-6 text-lg rounded-full"
            >
              Find Your Account →
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-4 px-4 text-center">
        <p className="text-gray-600 text-sm">&copy; 2025 JDSA Students Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
