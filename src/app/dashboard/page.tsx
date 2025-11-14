'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Progress, CircularProgress } from '@/components/ui/Progress'
import Link from 'next/link'

export default function DashboardPage() {
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
      category: 'Reconnection',
      status: 'in_progress',
      progress: 60,
      daysRemaining: 45,
    },
    {
      id: '2',
      title: 'Learn basic Spanish conversation',
      category: 'Learning',
      status: 'planning',
      progress: 25,
      daysRemaining: 90,
    },
    {
      id: '3',
      title: 'Create a family recipe collection',
      category: 'Creation',
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
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Elegant Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <Avatar fallback={user.name} size="xl" />
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Welcome back, <span className="italic" style={{ color: 'var(--color-primary-light)' }}>{user.name}</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Your journey began in <em>{user.joinedDate}</em>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/discovery">
                <Button size="lg" className="font-medium">
                  Continue Discovery
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" size="lg" className="font-medium">
                  Profile Settings
                </Button>
              </Link>
            </div>
          </div>
          <div className="decorative-line my-8" />
        </div>

        {/* Refined Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Total Goals</p>
                <p className="text-5xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>{stats.totalGoals}</p>
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>Life aspirations identified</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ borderLeft: '4px solid var(--color-success)' }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Completed</p>
                <p className="text-5xl font-serif font-bold" style={{ color: 'var(--color-success-light)' }}>{stats.completedGoals}</p>
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>Meaningful achievements</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>In Progress</p>
                <p className="text-5xl font-serif font-bold" style={{ color: 'var(--color-secondary-light)' }}>{stats.inProgress}</p>
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>Active pursuits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover:shadow-xl transition-all duration-300" style={{ borderLeft: '4px solid var(--accent-sage)' }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Days Active</p>
                <p className="text-5xl font-serif font-bold" style={{ color: 'var(--color-primary-light)' }}>{stats.daysActive}</p>
                <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>Journey duration</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Goals Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Goals */}
            <Card className="shadow-lg" style={{ borderColor: 'var(--border-medium)' }}>
              <CardHeader className="pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle as="h2" style={{ color: 'var(--text-primary)' }}>Active Goals</CardTitle>
                    <CardDescription className="mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                      Goals you're currently nurturing
                    </CardDescription>
                  </div>
                  <Link href="/goals">
                    <Button variant="ghost" size="sm" className="font-medium">
                      View All →
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {recentGoals.map((goal, index) => (
                    <div
                      key={goal.id}
                      className="group p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-8 rounded-full" style={{ background: 'var(--color-primary)' }} />
                            <h3 className="font-serif font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>{goal.title}</h3>
                          </div>
                          <div className="flex gap-3 items-center ml-4">
                            <Badge variant="neutral" size="sm" className="font-medium">
                              {goal.category}
                            </Badge>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>·</span>
                            <span className="text-sm capitalize italic" style={{ color: 'var(--text-secondary)' }}>
                              {goal.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Update
                        </Button>
                      </div>
                      <Progress
                        value={goal.progress}
                        size="md"
                        variant={goal.progress > 50 ? 'success' : 'primary'}
                        showLabel
                        label={`${goal.daysRemaining} days remaining`}
                        className="mt-4"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg" style={{ borderColor: 'var(--border-medium)' }}>
              <CardHeader className="pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <CardTitle as="h2" style={{ color: 'var(--text-primary)' }}>Recent Activity</CardTitle>
                <CardDescription className="mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                  Your journey's latest moments
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-1">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-lg transition-colors"
                      style={{
                        background: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)'
                      }}
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{activity.action}</p>
                        <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{activity.category}</p>
                      </div>
                      <span className="text-sm whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Progress Overview */}
          <div className="space-y-8">
            {/* Overall Progress */}
            <Card
              className="shadow-lg"
              style={{
                borderColor: 'var(--color-primary)',
                background: 'linear-gradient(135deg, var(--bg-accent) 0%, var(--bg-secondary) 100%)'
              }}
            >
              <CardHeader className="pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <CardTitle as="h2" style={{ color: 'var(--text-primary)' }}>Overall Progress</CardTitle>
                <CardDescription className="mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                  Your journey at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 flex flex-col items-center">
                <CircularProgress
                  value={stats.completedGoals}
                  max={stats.totalGoals}
                  size={180}
                  strokeWidth={14}
                  variant="primary"
                />
                <div className="mt-8 text-center">
                  <p className="text-base leading-relaxed">
                    <span className="font-serif font-bold text-2xl" style={{ color: 'var(--color-primary-light)' }}>{stats.completedGoals}</span>
                    <span className="mx-2 italic" style={{ color: 'var(--text-secondary)' }}>of</span>
                    <span className="font-serif font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>{stats.totalGoals}</span>
                  </p>
                  <p className="text-sm mt-2 italic" style={{ color: 'var(--text-secondary)' }}>goals completed</p>
                </div>
              </CardContent>
            </Card>

            {/* Discovery Progress */}
            <Card className="shadow-lg" style={{ borderColor: 'var(--border-medium)' }}>
              <CardHeader className="pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <CardTitle as="h3" style={{ color: 'var(--text-primary)' }}>Discovery Journey</CardTitle>
                <CardDescription className="mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                  Exploration metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Questions Answered</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{stats.questionsAnswered}/100</span>
                  </div>
                  <Progress
                    value={stats.questionsAnswered}
                    max={100}
                    variant="secondary"
                    size="md"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Categories Explored</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{stats.categoriesExplored}/6</span>
                  </div>
                  <Progress
                    value={stats.categoriesExplored}
                    max={6}
                    variant="success"
                    size="md"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Sessions Completed</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{stats.sessionsCompleted}/10</span>
                  </div>
                  <Progress
                    value={stats.sessionsCompleted}
                    max={10}
                    variant="primary"
                    size="md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card
              className="shadow-lg"
              style={{
                borderColor: 'var(--color-secondary)',
                background: 'linear-gradient(135deg, var(--bg-accent) 0%, var(--bg-secondary) 100%)'
              }}
            >
              <CardHeader className="pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <CardTitle as="h3" style={{ color: 'var(--text-primary)' }}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <Link href="/discovery" className="block">
                  <Button fullWidth variant="primary" size="lg" className="font-medium">
                    Begin New Discovery
                  </Button>
                </Link>
                <Link href="/goals/new" className="block">
                  <Button fullWidth variant="outline" size="lg" className="font-medium">
                    Create Goal Manually
                  </Button>
                </Link>
                <Link href="/profile" className="block">
                  <Button fullWidth variant="ghost" size="lg" className="font-medium">
                    Update Preferences
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
