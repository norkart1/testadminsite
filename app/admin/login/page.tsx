'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'admin' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('[v0] Login error:', err);
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:opacity-80">EduAdmin</h1>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="sm">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Login Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in to your administrator account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="border-border"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Username: <code className="font-mono text-foreground">admin</code></p>
                <p>Password: <code className="font-mono text-foreground">12345</code></p>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-center text-sm text-foreground/70 mt-6">
              Not an admin? <Link href="/student/login" className="text-primary hover:underline font-semibold">
                Login as Student
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-4 px-4 text-center">
        <p className="text-sm">&copy; 2025 EduAdmin. All rights reserved.</p>
      </footer>
    </div>
  );
}
