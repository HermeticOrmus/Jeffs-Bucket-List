'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const THOUGHTFUL_LOADING_MESSAGES = [
  "Taking a moment to reflect on what you've shared...",
  "Considering your thoughts carefully...",
  "Thinking about how to respond thoughtfully...",
  "Giving this the attention it deserves...",
  "Reflecting on your words...",
  "Taking time to consider this properly...",
  "Letting your thoughts settle...",
  "Thinking this through with care...",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello. I'm Jeff. I'm here to help you think about how you want to live the time you have left—not in a morbid way, but in a clarifying one. Most people never pause to ask themselves what truly matters. You're here, which means some part of you is ready to ask that question. So... what brings you here today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Select a random thoughtful loading message
    const randomMessage = THOUGHTFUL_LOADING_MESSAGES[Math.floor(Math.random() * THOUGHTFUL_LOADING_MESSAGES.length)]
    setLoadingMessage(randomMessage)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'hsl(var(--background))' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold mb-3" style={{ color: 'hsl(var(--text))', fontFamily: 'var(--font-serif)' }}>
            Chat with Jeff
          </h1>
          <p className="text-lg flavor-text">
            A wise conversation about living with intention
          </p>
        </div>

        {/* Chat Container */}
        <Card style={{ background: 'hsl(var(--surface))', border: '1px solid hsl(var(--border))' }}>
          <CardContent className="p-0">
            {/* Messages Area */}
            <div
              className="h-[600px] overflow-y-auto p-6 space-y-6"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--border)) hsl(var(--surface))'
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.role === 'user'
                        ? 'ml-auto'
                        : 'mr-auto'
                    }`}
                    style={{
                      background: message.role === 'user'
                        ? 'hsl(var(--accent-teal) / 0.2)'
                        : 'hsl(var(--background))',
                      border: `1px solid ${message.role === 'user' ? 'hsl(var(--accent-teal))' : 'hsl(var(--border))'}`,
                    }}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold flavor-text">Jeff</span>
                      </div>
                    )}
                    <p
                      className="text-base leading-relaxed whitespace-pre-wrap"
                      style={{
                        color: 'hsl(var(--text))',
                        fontFamily: message.role === 'assistant' ? 'var(--font-serif)' : 'var(--font-sans)',
                        fontStyle: message.role === 'assistant' ? 'italic' : 'normal'
                      }}
                    >
                      {message.content}
                    </p>
                    <div className="mt-2 text-sm" style={{ color: 'hsl(var(--text-secondary) / 0.6)' }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div
                    className="max-w-[80%] rounded-xl p-4"
                    style={{
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold flavor-text">Jeff</span>
                    </div>
                    <p
                      className="text-base leading-relaxed animate-gentle-pulse"
                      style={{
                        color: 'hsl(var(--text-secondary))',
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                      }}
                    >
                      {loadingMessage}
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-6 border-t"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <div className="flex gap-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts... (Press Enter to send, Shift+Enter for new line)"
                  rows={3}
                  disabled={isLoading}
                  className="flex-1"
                  style={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--text))',
                    resize: 'none',
                  }}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="self-end px-8"
                  style={{
                    background: input.trim() && !isLoading ? 'hsl(var(--accent-teal))' : 'hsl(var(--border))',
                    color: 'hsl(var(--background))',
                  }}
                >
                  Send
                </Button>
              </div>
              <p className="mt-3 text-sm text-center" style={{ color: 'hsl(var(--text-secondary) / 0.7)' }}>
                This is a <em className="flavor-text">private conversation</em>. Take your time and share what feels right.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: 'hsl(var(--text-secondary))' }}>
            Jeff is a wise guide who's seen a lot and wants the best life for you.
            <br />
            <em className="flavor-text">He'll ask powerful questions and help you see clearly what matters.</em>
          </p>
        </div>
      </div>
    </div>
  )
}
