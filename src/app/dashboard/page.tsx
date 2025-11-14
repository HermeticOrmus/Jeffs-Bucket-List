'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Progress, CircularProgress } from '@/components/ui/Progress'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: 'Margaret',
    initials: 'MJ',
    joinedDate: 'November 2025',
  }

  const stats = {
    totalGoals: 12,
    activeGoals: 7,
    completedGoals: 3,
    inProgress: 2,
    sessionsCompleted: 4,
    questionsAnswered: 48,
    categoriesExplored: 5,
    daysActive: 14,
  }

  const recentGoals = [
    {
      id: '1',
      title: 'Reconnect with my sister Sarah',
      category: 'reconnection',
      status: 'in_progress',
      progress: 60,
      daysRemaining: 45,
    },
    {
      id: '2',
      title: 'Learn basic Spanish',
      category: 'learning',
      status: 'planning',
      progress: 25,
      daysRemaining: 90,
    },
    {
      id: '3',
      title: 'Create a family recipe book',
      category: 'creation',
      status: 'thinking_about',
      progress: 10,
      daysRemaining: 120,
    },
  ]

  const recentActivity = [
    { action: 'Completed discovery session', category: 'Reconnection', time: '2 hours ago' },
    { action: 'Updated goal milestone', category: 'Learning', time: 'Yesterday' },
    { action: 'Added new goal', category: 'Creation', time: '2 days ago' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header with User Info */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <Avatar fallback={user.name} size="xl" />
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-lg text-gray-600">
                You've been on your journey since {user.joinedDate}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/discovery">
              <Button size="lg">
                Continue Discovery
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="animate-fade-in border-primary-200 bg-gradient-to-br from-primary-50 to-white hover:shadow-glow transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Goals</p>
                <p className="text-4xl font-bold text-primary-600">{stats.totalGoals}</p>
              </div>
              <div className="text-5xl">🎯</div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in border-success-200 bg-gradient-to-br from-success-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Completed</p>
                <p className="text-4xl font-bold text-success-600">{stats.completedGoals}</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in border-secondary-200 bg-gradient-to-br from-secondary-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">In Progress</p>
                <p className="text-4xl font-bold text-secondary-600">{stats.inProgress}</p>
              </div>
              <div className="text-5xl">🚀</div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in border-warning-200 bg-gradient-to-br from-warning-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Days Active</p>
                <p className="text-4xl font-bold text-warning-600">{stats.daysActive}</p>
              </div>
              <div className="text-5xl">📅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Goals Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Goals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle as="h3">Active Goals</CardTitle>
                  <CardDescription>Goals you're currently working on</CardDescription>
                </div>
                <Link href="/goals">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{goal.title}</h4>
                        <div className="flex gap-2 items-center">
                          <Badge variant="primary" size="sm">{goal.category}</Badge>
                          <Badge variant="neutral" size="sm">{goal.status.replace('_', ' ')}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                    <Progress
                      value={goal.progress}
                      size="md"
                      variant={goal.progress > 50 ? 'success' : 'primary'}
                      showLabel
                      label={`${goal.daysRemaining} days remaining`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">Recent Activity</CardTitle>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.category}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Progress Overview */}
        <div className="space-y-6">
          {/* Overall Progress */}
          <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-white">
            <CardHeader>
              <CardTitle as="h3">Overall Progress</CardTitle>
              <CardDescription>Your journey so far</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgress
                value={stats.completedGoals}
                max={stats.totalGoals}
                size={160}
                strokeWidth={12}
                variant="primary"
              />
              <p className="mt-6 text-center text-base text-gray-700">
                <span className="font-bold text-primary-600">{stats.completedGoals}</span> of{' '}
                <span className="font-bold">{stats.totalGoals}</span> goals completed
              </p>
            </CardContent>
          </Card>

          {/* Discovery Progress */}
          <Card>
            <CardHeader>
              <CardTitle as="h3">Discovery Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Progress
                  value={stats.questionsAnswered}
                  max={100}
                  variant="secondary"
                  showLabel
                  label="Questions Answered"
                />
              </div>
              <div>
                <Progress
                  value={stats.categoriesExplored}
                  max={6}
                  variant="success"
                  showLabel
                  label="Categories Explored"
                />
              </div>
              <div>
                <Progress
                  value={stats.sessionsCompleted}
                  max={10}
                  variant="primary"
                  showLabel
                  label="Sessions Completed"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-secondary-50 to-white border-secondary-200">
            <CardHeader>
              <CardTitle as="h3">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/discovery" className="block">
                <Button fullWidth variant="primary" size="lg">
                  Start New Discovery
                </Button>
              </Link>
              <Link href="/goals/new" className="block">
                <Button fullWidth variant="outline" size="lg">
                  Add Manual Goal
                </Button>
              </Link>
              <Link href="/profile" className="block">
                <Button fullWidth variant="ghost" size="lg">
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
