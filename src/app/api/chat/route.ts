import { NextRequest, NextResponse } from 'next/server'

// Jeff's personality and conversation guidelines
const JEFF_SYSTEM_PROMPT = `You are Jeff, a thoughtful conversational AI helping adults 60+ discover meaningful life goals.

Your personality:
- Warm, patient, and respectful
- You treat users as wise individuals with life experience
- You ask thoughtful, open-ended questions
- You listen more than you speak
- You validate feelings and reflections
- You never rush or pressure
- You speak in a calm, measured tone

Your purpose:
- Help users identify what truly matters to them in this season of life
- Guide them toward authentic, achievable goals
- Explore six life areas: Reconnection, Learning, Creation, Completion, Contribution, Simple Joys
- Help them think about goals within real constraints (health, budget, time)
- Encourage meaningful reflection, not bucket list clichés

Conversation style:
- Use natural, conversational language
- Ask ONE thoughtful question at a time
- Show genuine curiosity about their responses
- Reflect back what you hear to show understanding
- Gently probe deeper when appropriate
- Share brief, relevant observations or validations
- Use "I notice..." or "It sounds like..." rather than assumptions

Topics to explore:
- Relationships they want to deepen or repair
- Skills they've always wanted to learn
- Creative projects they dream about
- Unfinished business or loose ends
- Ways they want to contribute or give back
- Simple pleasures they want to savor more regularly
- Stories they want to preserve or share
- Places meaningful to them (not generic travel)

What NOT to do:
- Don't use emojis
- Don't be overly enthusiastic or cheerful
- Don't suggest generic bucket list items (skydiving, world travel, etc.)
- Don't rush to solutions or action items
- Don't make assumptions about their abilities or resources
- Don't be condescending or treat them as less capable

Remember: You're facilitating self-discovery, not selling experiences. The goal is authentic reflection leading to personally meaningful goals.

Keep responses concise (2-4 sentences). Ask questions that invite storytelling and reflection.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: Message[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    // For now, use a simulated thoughtful response
    // In production, this would call an LLM API (OpenAI, Anthropic, etc.)
    const response = await generateJeffResponse(messages)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

// Simulated Jeff responses for development
// Replace this with actual LLM API call in production
async function generateJeffResponse(messages: Message[]): Promise<string> {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || ''

  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simple conversation flow for demonstration
  if (messages.length <= 2) {
    return "I appreciate you sharing that with me. Before we explore specific goals, I'm curious—what does a meaningful day look like for you right now? Not an ideal day, but one where you feel like you're living in alignment with what matters to you."
  }

  // Detect themes and respond thoughtfully
  if (lastUserMessage.includes('family') || lastUserMessage.includes('children') || lastUserMessage.includes('grandchildren')) {
    return "Family connections often become more precious with time. Is there a particular person you've been thinking about reaching out to, or a relationship you'd like to deepen? What's been on your mind about that?"
  }

  if (lastUserMessage.includes('learn') || lastUserMessage.includes('skill') || lastUserMessage.includes('always wanted')) {
    return "It sounds like there's something you've been curious about for a while. What draws you to that? And what, if anything, has kept you from exploring it until now?"
  }

  if (lastUserMessage.includes('create') || lastUserMessage.includes('make') || lastUserMessage.includes('write') || lastUserMessage.includes('build')) {
    return "Creative pursuits can be deeply satisfying. When you imagine yourself working on this, what does that look like? Where are you, what's around you, how do you feel?"
  }

  if (lastUserMessage.includes('finish') || lastUserMessage.includes('complete') || lastUserMessage.includes('unfinished')) {
    return "Those unfinished things can weigh on us in quiet ways. What would it mean to you to bring that to completion? How would it feel?"
  }

  if (lastUserMessage.includes('help') || lastUserMessage.includes('give back') || lastUserMessage.includes('community') || lastUserMessage.includes('volunteer')) {
    return "The desire to contribute often grows stronger with experience. What kind of impact would feel most meaningful to you? And who or what would benefit from what you have to offer?"
  }

  if (lastUserMessage.includes('enjoy') || lastUserMessage.includes('savor') || lastUserMessage.includes('pleasure') || lastUserMessage.includes('happy')) {
    return "Sometimes the simplest pleasures become the most important. What's something small that brings you genuine joy? Something you could experience more regularly?"
  }

  // General thoughtful responses
  const thoughtfulResponses = [
    "Tell me more about that. What makes this important to you right now?",
    "I'm hearing that this matters to you. What would taking a step toward this look like, in practical terms?",
    "That's interesting. How long have you been thinking about this?",
    "It sounds like there's a story there. Would you feel comfortable sharing more?",
    "I notice you mentioned that. What is it about this season of your life that brings this to mind?",
    "That's a thoughtful reflection. If you were to focus on one aspect of what you just shared, which part feels most alive for you?",
  ]

  return thoughtfulResponses[Math.floor(Math.random() * thoughtfulResponses.length)]
}
