# Jeff's Bucket List Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HermeticOrmus/Jeffs-Bucket-List)

## Mission

Create a personalized bucket list platform that helps individuals (particularly those in later life stages) develop and achieve meaningful life goals through thoughtful questioning and supportive features.

## Project Status

**✅ MVP Built and Ready for Deployment**

The platform is now fully functional with the core discovery flow implemented. Ready to deploy to Vercel!

## What's Built

### Core Features (Phase 1 - MVP)

1. **Question-Based Discovery Engine**
   - Thoughtful, age-appropriate questions across 6 life categories
   - Progressive question flow with skip functionality
   - Automatic progress saving
   - 30+ initial questions across all categories

2. **Six Life Categories**
   - ❤️ Reconnection (relationships to rebuild)
   - 📚 Learning (skills to acquire)
   - 🎨 Creation (things to make)
   - ✅ Completion (unfinished business)
   - 🤝 Contribution (ways to give back)
   - 🌟 Simple Joys (moments to savor)

3. **Goal Suggestion System**
   - Personalized goal recommendations based on responses
   - Confidence scoring for relevance
   - Direct goal creation from suggestions

4. **Senior-Friendly Design**
   - Minimum 18px font sizes throughout
   - High contrast colors for visibility
   - 44px minimum touch targets
   - Clean, uncluttered interface
   - No time pressure or anxiety-inducing features

5. **Core Pages**
   - Home page with platform introduction
   - Discovery landing page with category selection
   - Interactive discovery session flow
   - Goals dashboard with status tracking
   - About page explaining platform philosophy

## Technical Stack

- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom senior-friendly configuration
- **AI**: Anthropic Claude API (Sonnet 4) for conversational sage "Jeff"
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for Phase 2)
- **Deployment**: Vercel (optimized configuration included)

## Project Structure

```
Jeffs-Bucket-List/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── discovery/         # Discovery flow pages
│   │   └── goals/             # Goals management
│   ├── components/
│   │   ├── ui/                # Base UI components (Button, Card, Input)
│   │   ├── accessibility/     # Accessibility helpers
│   │   ├── discovery/         # Discovery-specific components
│   │   └── goals/             # Goal-specific components
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   ├── mockData.ts        # Development mock data
│   │   └── utils/             # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles
├── database/
│   ├── migrations/            # Database schema migrations
│   └── seeds/                 # Seed data (categories, questions)
├── research/                  # Market research and competitive analysis
├── specs/                     # Detailed feature specifications
│   └── 001-question-discovery/ # Discovery engine spec
├── CLAUDE.md                  # Development guidelines
├── DEPLOYMENT.md             # Comprehensive deployment guide
└── package.json              # Dependencies and scripts
```

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/HermeticOrmus/Jeffs-Bucket-List.git
   cd Jeffs-Bucket-List
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with:
   # - Supabase credentials (or use placeholders for local dev)
   # - ANTHROPIC_API_KEY from https://console.anthropic.com/
   #   (Optional: Without API key, Jeff will use simulated responses)
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Deploy to Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy:**
1. Set up Supabase project
2. Run database migrations
3. Import to Vercel
4. Add environment variables
5. Deploy!

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run a11y-test    # Run accessibility tests (future)
```

## Key Design Principles

### Gold Hat Philosophy

Every feature must pass the empowerment test: "Does this empower users or extract from them?"

- ✅ No dark patterns (FOMO mechanics, social pressure, gamification)
- ✅ Privacy-first (everything private by default)
- ✅ Dignity-preserving (treat users as wise elders, not subjects)
- ✅ Ethical revenue model (transparent subscription, no data selling)

### Senior-Specific Accessibility

When implementing ANY UI component:

1. **Visual**: Minimum 18px fonts, high contrast, generous spacing
2. **Interaction**: Large touch targets (44x44px minimum), no time pressure
3. **Content**: Plain language, patient pacing, respectful tone
4. **Navigation**: Simple, consistent patterns, clear affordances

### Privacy Architecture

- Everything private by default
- Granular sharing controls
- Family access only through explicit invitation
- Data export capability (user owns their data)
- No third-party tracking or analytics that violate privacy

## Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- Row-Level Security for data isolation
- Soft deletes for data recovery
- Audit logging for GDPR compliance
- Encrypted storage for sensitive responses
- Flexible question/response structures

See `database/migrations/001_initial_schema.sql` for full schema.

## Current Question Bank

- **30 initial questions** across 6 categories
- Depth level 1 (surface-level discovery)
- Multiple question types: text, multiple choice, scale, yes/no
- Age-appropriate and respectful language
- Optional skip functionality on all questions

## Claude AI Integration

Jeff's conversational sage personality is powered by **Anthropic's Claude API (Sonnet 4)**.

### Features

- **Real AI Conversations**: Direct integration with Claude for thoughtful, contextual responses
- **Jeff's Personality**: Wise sage character defined through detailed system prompts
- **Graceful Fallback**: Automatic simulated responses if API key not configured
- **Streaming Support**: Infrastructure ready for real-time response streaming
- **Cost Effective**: ~$0.07-$0.10 per conversation with pay-per-use pricing

### Setup

1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
3. Chat with Jeff at `/chat`

**See [CLAUDE_INTEGRATION.md](CLAUDE_INTEGRATION.md) for detailed documentation.**

### Why Claude (Not LibreChat)

We evaluated [Hermetic-LibreChat](https://github.com/HermeticOrmus/Hermetic-LibreChat) but chose direct Claude integration because:
- **Simpler**: No Docker services, databases, or proxy layers
- **Cleaner**: Works seamlessly with Next.js serverless deployment
- **Controlled**: Full control over Jeff's personality and conversation flow
- **Maintainable**: Straightforward codebase without unnecessary complexity

LibreChat is excellent as a standalone ChatGPT alternative, but our needs are better served by direct API integration.

## What's Next (Phase 2)

### Planned Features

1. **User Authentication**
   - Secure account creation
   - Password recovery
   - Profile management

2. **Enhanced Discovery**
   - Category-focused sessions (User Story 2)
   - Progressive depth questions (User Story 3)
   - Voice input support (User Story 4)

3. **Goal Management**
   - Milestone tracking
   - Progress notes
   - Status transitions
   - Timeline visualization

4. **Family Sharing**
   - Invite-only access
   - Granular permission controls
   - Encouragement features

5. **Legacy Features**
   - Annual review summaries
   - Exportable life story books
   - Memory preservation

## Target Audience

- **Primary**: Adults 60+ planning their remaining years meaningfully
- **Secondary**: Anyone seeking to live more intentionally
- **Specific**: People like Jeff who want thoughtful reflection, not generic bucket lists

## Ethics & Values

Following Hermetic principles and Gold Hat philosophy:

- **Empowerment over extraction**: Help people live meaningfully, not maximize engagement
- **Dignity and respect**: Especially for older users
- **Privacy first**: Personal dreams and goals are sacred
- **No dark patterns**: Clear, honest, supportive interface
- **Sustainable pace**: Quality of life over metrics

## Documentation

- **[CLAUDE.md](CLAUDE.md)**: Development guidelines and project philosophy
- **[CLAUDE_INTEGRATION.md](CLAUDE_INTEGRATION.md)**: Claude AI integration guide
- **[JEFF_AI_PERSONALITY.md](JEFF_AI_PERSONALITY.md)**: Jeff's conversational sage personality
- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Comprehensive deployment guide
- **[specs/](specs/)**: Detailed feature specifications
- **[research/](research/)**: Competitive analysis and market research

## Contributing

This project follows strict ethical guidelines. Before contributing:

1. Read [CLAUDE.md](CLAUDE.md) for project philosophy
2. Review feature specs in [specs/](specs/)
3. Ensure changes align with senior-friendly accessibility standards
4. Test with actual users 60+ when possible

## Testing

### Manual Testing Checklist

- [ ] Home page loads and navigation works
- [ ] Discovery flow allows question answering
- [ ] Skip functionality works correctly
- [ ] Goal suggestions appear after 5+ responses
- [ ] Goals page displays correctly
- [ ] Text is readable (minimum 18px)
- [ ] Touch targets are large enough (44px)
- [ ] High contrast mode works
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

### Automated Testing (Future)

- Unit tests for components
- Integration tests for discovery flow
- E2E tests with Playwright
- Accessibility tests with axe-core

## Support

For questions or issues:
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review [CLAUDE.md](CLAUDE.md) for development guidelines
- Check Next.js docs: https://nextjs.org/docs
- Check Supabase docs: https://supabase.com/docs

## License

[To be determined]

---

**Built with:**
- ❤️ Respect for the wisdom of older adults
- 🎯 Focus on meaningful living over metrics
- 🔒 Privacy and dignity as core values
- ♿ Accessibility as a requirement, not an afterthought

*Created: November 2025*
*For: Jeff and all those seeking to live their remaining years with purpose*
