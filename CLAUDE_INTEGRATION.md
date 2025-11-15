# Claude AI Integration Documentation

## Overview

Jeff's Bucket List uses **Anthropic's Claude API** directly for real conversational AI, rather than embedding LibreChat or other third-party platforms. This approach provides:

- **Simplicity**: Direct API integration without additional services
- **Control**: Full control over Jeff's personality and conversation flow
- **Performance**: Lower latency with direct API calls
- **Deployability**: Works seamlessly with Vercel serverless deployment
- **Maintainability**: Clean, straightforward codebase

## Why Not LibreChat?

During research, we evaluated [Hermetic-LibreChat](https://github.com/HermeticOrmus/Hermetic-LibreChat) as a potential integration option. However, we determined it was not the right fit:

### LibreChat Analysis

**What LibreChat Is:**
- Full-stack ChatGPT alternative application
- Complete web interface with React frontend
- Node.js backend with database and authentication
- Designed as a standalone service, not an embeddable library

**Why We Didn't Use It:**
1. **Architectural Mismatch**: LibreChat is a complete application, not a component library
2. **Complexity**: Would require Docker services, database, proxy layer
3. **UI Conflict**: Has its own UI that doesn't match our senior-friendly design
4. **Deployment Friction**: Difficult to deploy alongside Next.js on Vercel
5. **Overkill**: We only need Claude API calls with personality - not a full chat platform

**Our Approach Instead:**
- Direct Anthropic SDK integration (`@anthropic-ai/sdk`)
- API route handles Claude communication
- Existing UI remains unchanged
- Simple, maintainable architecture

## Architecture

```
User Interface (chat/page.tsx)
         ↓
    HTTP POST /api/chat
         ↓
Chat API Route (api/chat/route.ts)
         ↓
    Anthropic SDK
         ↓
  Claude API (Sonnet 4)
         ↓
    Response to User
```

### Key Components

1. **Frontend**: `/src/app/chat/page.tsx`
   - React component with chat interface
   - Sends messages to `/api/chat`
   - Displays responses in elegant UI
   - No changes needed (works as-is)

2. **API Route**: `/src/app/api/chat/route.ts`
   - Handles chat requests
   - Manages Claude API communication
   - Implements Jeff's personality via system prompt
   - Graceful fallback to simulated responses if no API key

3. **Anthropic SDK**: `@anthropic-ai/sdk`
   - Official Anthropic TypeScript SDK
   - Handles authentication and API calls
   - Supports streaming and non-streaming responses

## Configuration

### Required Environment Variables

Add to `.env.local`:

```bash
# AI Configuration - Claude API for Jeff's conversational AI
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
```

### Getting an API Key

1. Visit [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)
6. Add to `.env.local` file

**Cost Considerations:**
- Claude uses pay-per-use pricing
- Sonnet 4 pricing: ~$3 per million input tokens, ~$15 per million output tokens
- Average conversation: 2,000-4,000 tokens (~$0.05-$0.10 per conversation)
- Set up billing alerts in Anthropic Console

### Fallback Behavior

**Without API Key:**
- System automatically falls back to simulated responses
- Console warning: `⚠️ No Anthropic API key configured`
- Users can still interact with Jeff (simulated personality)
- Useful for development/testing without incurring costs

**With API Key:**
- Real Claude responses using Jeff's personality
- Thoughtful, contextual conversations
- True AI-powered sage wisdom

## Jeff's Personality Configuration

Jeff's personality is defined in the `JEFF_SYSTEM_PROMPT` constant in `/src/app/api/chat/route.ts`.

### Key Personality Traits

**Character:**
- Wise old sage who's seen it all
- Warm but direct, patient but purposeful
- Comfortable with mortality, regret, and difficult topics

**Conversation Style:**
- Asks powerful questions that create reflection
- 2-4 sentence responses (concise, not verbose)
- No emojis, no generic advice
- Challenges limiting beliefs gently
- Helps crystallize meaningful goals

**Philosophy:**
- Life is finite and precious
- Most people know what matters; they need help articulating it
- Connection > accomplishment
- Authenticity > achievement
- It's never too late to live differently

### Modifying Jeff's Personality

To adjust Jeff's character or conversation approach:

1. Open `/src/app/api/chat/route.ts`
2. Edit the `JEFF_SYSTEM_PROMPT` constant (lines 4-122)
3. Reference `/JEFF_AI_PERSONALITY.md` for detailed guidelines
4. Test changes with real conversations
5. Ensure changes align with senior-friendly, dignified approach

**Important**: Jeff's personality is core to the platform's value. Changes should:
- Maintain respect and dignity for older adults
- Avoid patronizing or overly cheerful tones
- Keep responses concise (seniors may have cognitive load limits)
- Balance warmth with directness

## API Features

### Non-Streaming Responses (Default)

**Request:**
```typescript
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "I've been thinking about reconnecting with my sister..." }
  ]
}
```

**Response:**
```json
{
  "message": "Three years is a long time to carry that weight. What would need to be true for you to pick up the phone this week?"
}
```

### Streaming Responses (Available, Not Currently Used)

**Request:**
```typescript
POST /api/chat
{
  "messages": [...],
  "stream": true
}
```

**Response:**
```
data: {"text": "Three"}
data: {"text": " years"}
data: {"text": " is"}
...
data: [DONE]
```

**Note**: Current UI uses non-streaming. Streaming support exists for future enhancement.

### Error Handling

**Graceful Degradation:**
1. No API key → Simulated responses
2. API error → Fall back to simulated responses
3. Network timeout → Error message with retry option
4. Invalid request → 400 error with helpful message

## Model Configuration

**Current Model**: `claude-sonnet-4-20250514`

**Why Sonnet 4:**
- Excellent at thoughtful, nuanced conversations
- Superior understanding of emotional context
- Strong at asking follow-up questions
- Good balance of quality and cost
- Fast response times

**Alternatives:**
- `claude-opus-4-20250514`: More powerful, slower, more expensive
- `claude-haiku-4-20250514`: Faster, cheaper, less nuanced

To change models, edit line 163 or 201 in `/src/app/api/chat/route.ts`:

```typescript
model: 'claude-sonnet-4-20250514', // Change here
```

### Model Parameters

**Current Settings:**
- `max_tokens: 1024` - Enough for thoughtful 2-6 sentence responses
- `system: JEFF_SYSTEM_PROMPT` - Jeff's personality and guidelines
- `messages: [...]` - Full conversation history for context

**Adjusting Response Length:**
- Increase `max_tokens` for longer responses (not recommended - concise is better)
- Decrease for shorter responses (may cut off mid-sentence)
- Current setting optimized for Jeff's 2-4 sentence style

## Development Workflow

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Run development server
npm run dev

# 4. Test chat at http://localhost:3000/chat
```

### Testing Without API Key

```bash
# Use placeholder key (automatic fallback to simulated responses)
ANTHROPIC_API_KEY=sk-ant-placeholder-replace-with-real-anthropic-api-key

# You'll see console warnings but chat will work with simulated Jeff
```

### Testing With API Key

```bash
# Add real key to .env.local
ANTHROPIC_API_KEY=sk-ant-your-real-key-here

# Restart dev server
npm run dev

# Chat will now use real Claude responses
```

## Deployment

### Vercel (Recommended)

**Setup:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your actual API key
4. Deploy

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add `ANTHROPIC_API_KEY` for Production, Preview, Development
- Redeploy after adding

**Cost Monitoring:**
- Set up Anthropic billing alerts
- Monitor usage in Anthropic Console
- Consider implementing rate limiting for production

### Other Platforms

**Railway/Render/Fly.io:**
- Add `ANTHROPIC_API_KEY` to environment variables
- Deploy Next.js app normally
- API routes work serverless

**Docker (Not Recommended):**
- Not necessary for this architecture
- Next.js serverless deployment is simpler
- If needed, standard Next.js Dockerfile works

## Monitoring and Debugging

### Console Logging

**API Route Logs:**
```bash
# No API key configured
⚠️  No Anthropic API key configured. Using simulated responses.

# API error (fallback)
⚠️  Claude API error. Falling back to simulated response.

# Streaming error
Streaming error: [error details]
```

### Common Issues

**1. "No API key configured" warning**
- Check `.env.local` file exists
- Verify `ANTHROPIC_API_KEY` is set
- Ensure no typos in variable name
- Restart dev server after adding

**2. API errors despite valid key**
- Check Anthropic Console for account status
- Verify billing is set up
- Check rate limits (tier-based)
- Review API key permissions

**3. Responses don't match Jeff's personality**
- Verify `JEFF_SYSTEM_PROMPT` is being sent
- Check model version (Sonnet 4 recommended)
- Review conversation history being sent
- May need to adjust system prompt

**4. Slow responses**
- Claude API typically responds in 2-5 seconds
- Check network connectivity
- Consider enabling streaming for perceived speed
- Monitor Anthropic status page

### Testing Jeff's Personality

**Good Test Prompts:**
```
1. "I feel like I'm too old to start anything new"
   → Should gently challenge limiting belief

2. "I don't know what I want anymore"
   → Should ask clarifying question, not give advice

3. "I should spend more time with family"
   → Should notice "should" language, ask about "want"

4. "I've always wanted to write a book"
   → Should explore why it matters, not just how to do it
```

**Expected Responses:**
- 2-4 sentences (concise)
- No emojis or exclamation points
- Thoughtful question or gentle observation
- Warm but direct tone
- References time/mortality appropriately

## Security Considerations

### API Key Protection

**Never commit API keys to Git:**
```bash
# .env.local is already in .gitignore
# .env.local.example should only have placeholder values
```

**Production Security:**
- Use environment variables (never hardcode)
- Rotate API keys periodically
- Set up billing alerts to prevent unexpected charges
- Monitor usage patterns for anomalies

### Rate Limiting (Future Enhancement)

Consider implementing rate limiting for production:
```typescript
// Example: Limit to 20 messages per user per hour
// Could use Redis, Vercel KV, or middleware
```

### Content Filtering

Claude has built-in safety filters, but consider:
- Logging conversations for quality assurance
- Monitoring for abuse patterns
- Implementing user feedback mechanism

## Maintenance

### Updating Anthropic SDK

```bash
# Check for updates
npm outdated @anthropic-ai/sdk

# Update to latest
npm install @anthropic-ai/sdk@latest
```

### Model Updates

Anthropic periodically releases new models. To update:

1. Check [Anthropic documentation](https://docs.anthropic.com/en/docs/models-overview) for new models
2. Test new model with sample conversations
3. Update model string in `route.ts`
4. Verify Jeff's personality is maintained

### System Prompt Refinement

Based on user feedback, you may need to refine Jeff's personality:

1. Collect user feedback on conversation quality
2. Identify patterns (too formal, too casual, etc.)
3. Adjust `JEFF_SYSTEM_PROMPT`
4. Test with representative conversations
5. Deploy changes incrementally

## Cost Management

### Pricing (As of 2025)

**Claude Sonnet 4:**
- Input: ~$3 per 1M tokens
- Output: ~$15 per 1M tokens

**Typical Conversation:**
- System prompt: ~1,500 tokens (sent each time)
- User message: ~50-200 tokens
- Assistant response: ~100-300 tokens
- 10-message conversation: ~5,000 tokens total
- **Cost per conversation**: ~$0.07-$0.10

**Monthly Estimates:**
- 100 conversations: ~$7-$10
- 1,000 conversations: ~$70-$100
- 10,000 conversations: ~$700-$1,000

### Optimization Tips

1. **Cache system prompt** (future enhancement)
2. **Limit conversation history** (only send recent messages)
3. **Use Haiku for simple queries** (if implementing multi-model)
4. **Implement rate limiting** (prevent abuse)
5. **Monitor usage** (Anthropic Console)

## Future Enhancements

### Potential Improvements

1. **Streaming UI**
   - Update chat UI to support streaming responses
   - Display text as it's generated
   - Better perceived performance

2. **Conversation Memory**
   - Store conversation history in Supabase
   - Resume conversations across sessions
   - Build user profile over time

3. **Goal Tracking Integration**
   - Extract goals from conversations
   - Create tracking mechanism
   - Follow up on progress

4. **Multi-Model Support**
   - Use Haiku for simple responses
   - Use Opus for deep, complex conversations
   - Automatic model selection

5. **Voice Integration**
   - Speech-to-text for input (accessibility)
   - Text-to-speech for Jeff's responses
   - Better for seniors who prefer speaking

## Resources

### Documentation
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Model Overview](https://docs.anthropic.com/en/docs/models-overview)
- [Anthropic SDK (TypeScript)](https://github.com/anthropics/anthropic-sdk-typescript)

### Related Files
- `/src/app/api/chat/route.ts` - Main API implementation
- `/src/app/chat/page.tsx` - Chat UI component
- `/JEFF_AI_PERSONALITY.md` - Detailed personality guidelines
- `/.env.local.example` - Environment variable template

### Support
- [Anthropic Console](https://console.anthropic.com/)
- [Anthropic Discord](https://discord.gg/anthropic) (community support)
- [Anthropic Support](https://support.anthropic.com/)

## Summary

This integration provides Jeff's Bucket List with:

✅ **Real AI conversations** powered by Claude Sonnet 4
✅ **Jeff's wise sage personality** maintained through system prompts
✅ **Simple architecture** with direct API integration
✅ **Graceful fallbacks** when API unavailable
✅ **Production-ready** for Vercel deployment
✅ **Cost-effective** with pay-per-use pricing
✅ **Maintainable** codebase without complex dependencies

The decision to use direct Claude integration instead of LibreChat ensures the platform remains simple, senior-friendly, and aligned with the Gold Hat philosophy of empowering users without extracting value through unnecessary complexity.
