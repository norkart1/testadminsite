'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Session {
  userId: string;
  role: string;
  username: string;
  createdAt: string;
  expiresAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    totalStudents: 245,
    activeCourses: 12,
    pendingAssignments: 8,
    systemHealth: '99.9%',
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (!data.session || data.session.role !== 'admin') {
          router.push('/admin/login');
          return;
        }

        setSession(data.session);
      } catch (err) {
        console.error('[v0] Session check error:', err);
        router.push('/admin/login');
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
            <h1 className="text-2xl font-bold">EduAdmin Dashboard</h1>
            <p className="text-sm text-primary-foreground/80">Welcome back, {session.username}</p>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.totalStudents}</p>
              <p className="text-xs text-foreground/50 mt-1">Active students</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{stats.activeCourses}</p>
              <p className="text-xs text-foreground/50 mt-1">Running this semester</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Pending Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">{stats.pendingAssignments}</p>
              <p className="text-xs text-foreground/50 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/70">
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{stats.systemHealth}</p>
              <p className="text-xs text-foreground/50 mt-1">Uptime status</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrator tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Add New Student
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Create Course
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Manage Grades
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                View Reports
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 pb-4 border-b border-border">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      +
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">New student registered</p>
                    <p className="text-sm text-foreground/70">John Smith - Student ID: 2025001</p>
                    <p className="text-xs text-foreground/50 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-4 pb-4 border-b border-border">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 font-semibold text-sm">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Course created</p>
                    <p className="text-sm text-foreground/70">Advanced Web Development - Spring 2025</p>
                    <p className="text-xs text-foreground/50 mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 font-semibold text-sm">
                      !
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Grade submission deadline approaching</p>
                    <p className="text-sm text-foreground/70">Mathematics 101 - Midterm Exam</p>
                    <p className="text-xs text-foreground/50 mt-1">1 day remaining</p>
                  </div>
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
