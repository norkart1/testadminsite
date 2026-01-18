'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Session {
  userId: string;
  role: string;
  username: string;
  createdAt: string;
  expiresAt: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!data.session || data.session.role !== 'student') {
          router.push('/student/login');
          return;
        }

        setSession(data.session);
      } catch (err) {
        console.error('[v0] Session check error:', err);
        router.push('/student/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('[v0] Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-foreground/70">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Student Portal</h1>
            <p className="text-sm text-primary-foreground/80">Welcome, {session.username}</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Your current courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold text-sm">Mathematics 101</p>
                  <p className="text-xs text-foreground/70">Semester: Spring 2025</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold text-sm">English Literature</p>
                  <p className="text-xs text-foreground/70">Semester: Spring 2025</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold text-sm">Physics 101</p>
                  <p className="text-xs text-foreground/70">Semester: Spring 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Your latest submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm">Math Quiz 1</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">English Essay</span>
                  <span className="font-bold text-green-600">90%</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm">Physics Project</span>
                  <span className="font-bold text-blue-600">In Review</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Tasks to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/50">
                  <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Essay Due</p>
                  <p className="text-xs text-amber-700 dark:text-amber-200">Due in 3 days</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                  <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">Project Submission</p>
                  <p className="text-xs text-blue-700 dark:text-blue-200">Due in 7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Info */}
        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm">Session Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-foreground/70">Username</p>
                <p className="font-mono font-semibold">{session.username}</p>
              </div>
              <div>
                <p className="text-foreground/70">User ID</p>
                <p className="font-mono font-semibold">{session.userId}</p>
              </div>
              <div>
                <p className="text-foreground/70">Role</p>
                <p className="font-mono font-semibold capitalize">{session.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 px-4 text-center mt-12 border-t border-border">
        <p className="text-sm">&copy; 2025 EduAdmin. All rights reserved.</p>
      </footer>
    </div>
  );
}
