import { QuestionCategory, Question, GoalSuggestion } from '@/types'

// Mock categories for development
export const mockCategories: QuestionCategory[] = [
  {
    id: '1',
    name: 'Reconnection',
    slug: 'reconnection',
    description: 'Relationships to rebuild or deepen with people who matter to you',
    icon: '❤️',
    color: '#E74C3C',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    name: 'Learning',
    slug: 'learning',
    description: 'Skills to acquire and knowledge to explore at your own pace',
    icon: '📚',
    color: '#3498DB',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    name: 'Creation',
    slug: 'creation',
    description: 'Things to make, build, or bring into the world',
    icon: '🎨',
    color: '#9B59B6',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    name: 'Completion',
    slug: 'completion',
    description: 'Unfinished business and projects worth completing',
    icon: '✅',
    color: '#2ECC71',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    name: 'Contribution',
    slug: 'contribution',
    description: 'Ways to give back and make a difference in your community',
    icon: '🤝',
    color: '#F39C12',
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    name: 'Simple Joys',
    slug: 'simple-joys',
    description: 'Moments to savor and experiences to enjoy regularly',
    icon: '🌟',
    color: '#1ABC9C',
    display_order: 6,
    is_active: true,
  },
]

// Mock questions for development
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    category_id: '1',
    question_text: 'Is there someone you wish you were closer to?',
    question_subtext: 'This could be a family member, old friend, or someone you\'ve lost touch with over the years.',
    question_type: 'text',
    response_schema: {
      maxLength: 500,
      minLength: 10,
      placeholder: 'Share your thoughts...',
    },
    depth_level: 1,
    display_order: 1,
    is_required: false,
    is_sensitive: false,
    is_active: true,
  },
  {
    id: 'q2',
    category_id: '1',
    question_text: 'What stops you from reaching out to people you care about?',
    question_subtext: 'Understanding the barriers can help us think about ways to overcome them.',
    question_type: 'multiple_choice',
    response_schema: {
      options: [
        'Fear of rejection',
        'Too much time has passed',
        'Don\'t know what to say',
        'They might be upset with me',
        'I don\'t have their contact info',
      ],
      allowMultiple: true,
      allowOther: true,
    },
    depth_level: 1,
    display_order: 2,
    is_required: false,
    is_sensitive: false,
    is_active: true,
  },
  {
    id: 'q3',
    category_id: '2',
    question_text: 'What have you always wanted to learn but never had the time for?',
    question_subtext: 'It could be a skill, a language, an instrument, or just knowledge about something fascinating.',
    question_type: 'text',
    response_schema: {
      maxLength: 500,
      placeholder: 'What interests you?',
    },
    depth_level: 1,
    display_order: 1,
    is_required: false,
    is_sensitive: false,
    is_active: true,
  },
  {
    id: 'q4',
    category_id: '3',
    question_text: 'If you could create something to leave behind, what would it be?',
    question_subtext: 'This could be physical (a garden, a quilt) or intangible (a family recipe book, recorded stories).',
    question_type: 'text',
    response_schema: {
      maxLength: 500,
      placeholder: 'What would you create?',
    },
    depth_level: 1,
    display_order: 1,
    is_required: false,
    is_sensitive: false,
    is_active: true,
  },
  {
    id: 'q5',
    category_id: '6',
    question_text: 'What small, everyday moment makes you happiest?',
    question_subtext: 'Sometimes the best goals are about savoring what already brings us joy.',
    question_type: 'text',
    response_schema: {
      maxLength: 500,
      placeholder: 'What brings you joy?',
    },
    depth_level: 1,
    display_order: 1,
    is_required: false,
    is_sensitive: false,
    is_active: true,
  },
]

// Mock goal suggestions generator
export function generateMockGoalSuggestions(responses: any[]): GoalSuggestion[] {
  if (responses.length < 3) {
    return []
  }

  const suggestions: GoalSuggestion[] = [
    {
      title: 'Reconnect with an old friend',
      description: 'Based on your reflections about relationships, consider reaching out to someone you\'ve been thinking about.',
      category: 'reconnection',
      priority_suggestion: 'high',
      inspired_by_question_id: 'q1',
      inspired_by_response_id: responses[0]?.id || '',
      confidence_score: 0.85,
    },
    {
      title: 'Start a new learning journey',
      description: 'You mentioned wanting to learn something new. Consider taking a beginner-friendly class or workshop.',
      category: 'learning',
      priority_suggestion: 'medium',
      inspired_by_question_id: 'q3',
      inspired_by_response_id: responses[1]?.id || '',
      confidence_score: 0.78,
    },
    {
      title: 'Create something meaningful',
      description: 'Your creative interests suggest you\'d enjoy starting a project that reflects your passions.',
      category: 'creation',
      priority_suggestion: 'medium',
      inspired_by_question_id: 'q4',
      inspired_by_response_id: responses[2]?.id || '',
      confidence_score: 0.72,
    },
  ]

  return suggestions
}
