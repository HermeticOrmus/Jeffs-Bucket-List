'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Goal, GoalStatus } from '@/types'

// Mock goals for demonstration
const mockGoals: Goal[] = [
  {
    id: '1',
    user_id: 'demo-user',
    title: 'Reconnect with my sister',
    description: 'Reach out and have a meaningful conversation after years of limited contact',
    category: 'reconnection',
    goal_type: 'relationship',
    priority: 'high',
    status: 'thinking_about',
    milestones: [],
    is_private: true,
    share_with_family: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'demo-user',
    title: 'Learn basic Spanish',
    description: 'Take an online beginner course to have simple conversations',
    category: 'learning',
    goal_type: 'skill',
    priority: 'medium',
    status: 'planning',
    milestones: [
      { title: 'Research online courses', completed: true, date: '2025-11-01' },
      { title: 'Enroll in course', completed: false, target_date: '2025-12-01' },
    ],
    is_private: true,
    share_with_family: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const statusLabels: Record<GoalStatus, string> = {
  thinking_about: 'Thinking About',
  planning: 'Planning',
  in_progress: 'In Progress',
  completed: 'Completed',
  ongoing: 'Ongoing',
  released: 'Released',
}

const statusColors: Record<GoalStatus, string> = {
  thinking_about: 'bg-gray-100 text-gray-800',
  planning: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  ongoing: 'bg-purple-100 text-purple-800',
  released: 'bg-gray-100 text-gray-600',
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [filter, setFilter] = useState<GoalStatus | 'all'>('all')

  const filteredGoals = filter === 'all' ? goals : goals.filter((g) => g.status === filter)

  const groupedGoals = {
    active: filteredGoals.filter((g) =>
      ['thinking_about', 'planning', 'in_progress', 'ongoing'].includes(g.status)
    ),
    completed: filteredGoals.filter((g) => g.status === 'completed'),
    released: filteredGoals.filter((g) => g.status === 'released'),
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">My Goals</h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Your personal goals for living intentionally and meaningfully.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/discovery">
            <Button>Discover New Goals</Button>
          </Link>
          <Button variant="outline">Add Goal Manually</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card padding="sm">
          <CardContent>
            <div className="text-3xl font-bold text-primary-600 mb-1">
              {groupedGoals.active.length}
            </div>
            <div className="text-sm font-semibold text-gray-600">Active Goals</div>
          </CardContent>
        </Card>
        <Card padding="sm">
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {groupedGoals.completed.length}
            </div>
            <div className="text-sm font-semibold text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card padding="sm">
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {goals.filter((g) => g.status === 'planning').length}
            </div>
            <div className="text-sm font-semibold text-gray-600">In Planning</div>
          </CardContent>
        </Card>
        <Card padding="sm">
          <CardContent>
            <div className="text-3xl font-bold text-gray-600 mb-1">{goals.length}</div>
            <div className="text-sm font-semibold text-gray-600">Total Goals</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-base rounded-lg font-semibold transition-colors min-h-[48px] ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Goals
          </button>
          {Object.entries(statusLabels).map(([status, label]) => (
            <button
              key={status}
              onClick={() => setFilter(status as GoalStatus)}
              className={`px-4 py-2 text-base rounded-lg font-semibold transition-colors min-h-[48px] ${
                filter === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Goals Yet</h3>
            <p className="text-lg text-gray-700 mb-6">
              Start your <em>discovery journey</em> to uncover meaningful goals that fit your life.
            </p>
            <Link href="/discovery">
              <Button size="lg">Begin Discovery</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {/* Active Goals */}
          {groupedGoals.active.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Active Goals</h3>
              <div className="space-y-6">
                {groupedGoals.active.map((goal) => (
                  <Card key={goal.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle as="h4">{goal.title}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${
                            statusColors[goal.status]
                          }`}
                        >
                          {statusLabels[goal.status]}
                        </span>
                      </div>
                    </CardHeader>
                    {goal.milestones && goal.milestones.length > 0 && (
                      <CardContent>
                        <h5 className="font-semibold text-gray-900 mb-2">Milestones:</h5>
                        <ul className="space-y-2">
                          {goal.milestones.map((milestone, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={milestone.completed}
                                readOnly
                                className="w-5 h-5"
                              />
                              <span
                                className={
                                  milestone.completed
                                    ? 'text-gray-500 line-through'
                                    : 'text-gray-900'
                                }
                              >
                                {milestone.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                    <CardFooter className="flex gap-4">
                      <Button size="sm">Update Progress</Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Completed Goals */}
          {groupedGoals.completed.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                <em>Completed Goals</em>
              </h3>
              <div className="space-y-6">
                {groupedGoals.completed.map((goal) => (
                  <Card key={goal.id} className="border-green-200 bg-green-50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle as="h4">{goal.title}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </div>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
