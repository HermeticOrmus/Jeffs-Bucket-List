'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { mockQuestions, mockCategories, generateMockGoalSuggestions } from '@/lib/mockData'
import { Question, Response, ResponseData } from '@/types'

function DiscoverySessionContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams?.get('category')

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Response[]>([])
  const [currentResponse, setCurrentResponse] = useState<string | string[]>('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])

  // Filter questions by category if provided
  const questions = categoryId
    ? mockQuestions.filter((q) => q.category_id === categoryId)
    : mockQuestions

  const currentQuestion = questions[currentQuestionIndex]
  const progress = {
    answered: responses.length,
    total: questions.length,
    percentage: Math.round((responses.length / questions.length) * 100),
  }

  const handleResponseChange = (value: string | string[]) => {
    setCurrentResponse(value)
  }

  const handleSubmitResponse = () => {
    if (!currentResponse || (Array.isArray(currentResponse) && currentResponse.length === 0)) {
      return
    }

    // Create response object
    const newResponse: Response = {
      id: `r-${Date.now()}`,
      user_id: 'demo-user',
      session_id: 'demo-session',
      question_id: currentQuestion.id,
      response_data: {
        encrypted: false,
        text: typeof currentResponse === 'string' ? currentResponse : undefined,
        selected: Array.isArray(currentResponse) ? currentResponse : undefined,
      },
      is_private: true,
      share_with_family: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setResponses([...responses, newResponse])
    setCurrentResponse('')

    // Check if we should show suggestions
    if (responses.length + 1 >= 5 && currentQuestionIndex === questions.length - 1) {
      // Generate suggestions after 5+ responses
      const goalSuggestions = generateMockGoalSuggestions([...responses, newResponse])
      setSuggestions(goalSuggestions)
      setShowSuggestions(true)
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // End of questions
      const goalSuggestions = generateMockGoalSuggestions([...responses, newResponse])
      setSuggestions(goalSuggestions)
      setShowSuggestions(true)
    }
  }

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (responses.length >= 5) {
      // Show suggestions even if last question was skipped
      const goalSuggestions = generateMockGoalSuggestions(responses)
      setSuggestions(goalSuggestions)
      setShowSuggestions(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // Load previous response if exists
      const prevResponse = responses.find(
        (r) => r.question_id === questions[currentQuestionIndex - 1].id
      )
      if (prevResponse) {
        setCurrentResponse(
          prevResponse.response_data.text ||
            prevResponse.response_data.selected ||
            ''
        )
      }
    }
  }

  const handleCreateGoal = (suggestion: any) => {
    // In production, this would create a goal and navigate to goals page
    console.log('Creating goal from suggestion:', suggestion)
    alert(`Goal "${suggestion.title}" would be created here. This is a demo.`)
  }

  if (showSuggestions) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="mb-8 border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle as="h2">✨ Discovery Complete!</CardTitle>
            <CardDescription>
              Based on your thoughtful responses, here are some meaningful goals you might consider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700">
              You answered {responses.length} questions and shared valuable insights about what matters to you.
              These suggestions are personalized based on your reflections.
            </p>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Personalized Goal Suggestions</h3>

        {suggestions.length > 0 ? (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <Card key={index} hoverable>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle as="h4">{suggestion.title}</CardTitle>
                      <CardDescription>{suggestion.description}</CardDescription>
                    </div>
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-800">
                      {suggestion.category}
                    </span>
                  </div>
                </CardHeader>
                <CardFooter className="flex gap-4">
                  <Button onClick={() => handleCreateGoal(suggestion)}>
                    Add to My Goals
                  </Button>
                  <span className="text-sm text-gray-600 flex items-center">
                    {Math.round(suggestion.confidence_score * 100)}% match
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent>
              <p className="text-lg text-gray-700 text-center py-8">
                Keep exploring and answering questions to receive personalized suggestions.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 flex gap-4">
          <Button onClick={() => (window.location.href = '/discovery')}>
            Start New Discovery Session
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = '/goals')}>
            View My Goals
          </Button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card>
          <CardContent>
            <p className="text-center py-8">No questions available. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {progress.answered} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentQuestionIndex}
            aria-valuemin={0}
            aria-valuemax={questions.length}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle as="h2">{currentQuestion.question_text}</CardTitle>
          {currentQuestion.question_subtext && (
            <CardDescription>{currentQuestion.question_subtext}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {currentQuestion.question_type === 'text' && (
            <Textarea
              value={currentResponse as string}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder={currentQuestion.response_schema.placeholder}
              maxLength={currentQuestion.response_schema.maxLength}
              rows={6}
              fullWidth
              aria-label="Your response"
            />
          )}

          {currentQuestion.question_type === 'multiple_choice' && (
            <div className="space-y-3">
              {currentQuestion.response_schema.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer transition-colors"
                >
                  <input
                    type={
                      currentQuestion.response_schema.allowMultiple
                        ? 'checkbox'
                        : 'radio'
                    }
                    name="response"
                    value={option}
                    checked={
                      Array.isArray(currentResponse)
                        ? currentResponse.includes(option)
                        : currentResponse === option
                    }
                    onChange={(e) => {
                      if (currentQuestion.response_schema.allowMultiple) {
                        const current = Array.isArray(currentResponse)
                          ? currentResponse
                          : []
                        if (e.target.checked) {
                          handleResponseChange([...current, option])
                        } else {
                          handleResponseChange(
                            current.filter((v) => v !== option)
                          )
                        }
                      } else {
                        handleResponseChange(option)
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <span className="text-base">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.question_type === 'scale' && (
            <div className="py-4">
              <input
                type="range"
                min={currentQuestion.response_schema.min}
                max={currentQuestion.response_schema.max}
                value={currentResponse as string}
                onChange={(e) => handleResponseChange(e.target.value)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Scale response"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{currentQuestion.response_schema.minLabel}</span>
                <span className="font-bold text-lg text-primary-600">
                  {currentResponse || currentQuestion.response_schema.min}
                </span>
                <span>{currentQuestion.response_schema.maxLabel}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4 flex-wrap">
          <Button
            onClick={handleSubmitResponse}
            disabled={
              !currentResponse ||
              (Array.isArray(currentResponse) && currentResponse.length === 0)
            }
            size="lg"
          >
            {currentQuestionIndex === questions.length - 1
              ? 'Finish & See Suggestions'
              : 'Next Question'}
          </Button>
          <Button variant="outline" onClick={handleSkipQuestion} size="lg">
            Skip This Question
          </Button>
          {currentQuestionIndex > 0 && (
            <Button variant="ghost" onClick={handlePreviousQuestion} size="lg">
              Previous
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Help Text */}
      <div className="text-center text-gray-600">
        <p>
          Take your time. You can skip any question and come back to discovery anytime.
        </p>
      </div>
    </div>
  )
}

export default function DiscoverySessionPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading discovery session...</p>
        </div>
      </div>
    }>
      <DiscoverySessionContent />
    </Suspense>
  )
}
