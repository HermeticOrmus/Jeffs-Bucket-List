# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jeff's Bucket List Platform** - A personalized bucket list application designed specifically for adults 60+ to develop and achieve meaningful life goals through thoughtful questioning and supportive features.

Born from a conversation with Jeff (73), this platform addresses a critical market gap: there are no platforms that combine thoughtful life reflection, achievable goal setting, and legacy creation specifically for older adults who want to live their remaining years with intention and meaning.

## Project Architecture & Status

### Current Phase: Research & Planning
The project is currently in the research phase. The codebase includes:
- Comprehensive competitive analysis of existing bucket list and life planning platforms
- Market research identifying gaps in senior-focused goal planning tools
- Strategic positioning and feature recommendations

### Planned Architecture
- **Frontend**: React/Next.js with senior-friendly accessibility features
- **Backend**: Node.js/Supabase for scalability and privacy
- **AI Integration**: For personalized recommendations and question-based discovery
- **Mobile**: React Native for iOS/Android apps

## Development Commands

Since the project is in planning phase, no build commands exist yet. When development begins:

```bash
# Future commands structure:
npm install          # Install dependencies
npm run dev         # Run development server
npm run build       # Build for production
npm run test        # Run test suite
npm run lint        # Run linter
npm run a11y-test   # Run accessibility tests (critical for senior users)
```

## Key Design Principles

### Gold Hat Philosophy
Every feature must pass the empowerment test: "Does this empower users or extract from them?"
- No dark patterns (FOMO mechanics, social pressure, gamification)
- Privacy-first (everything private by default)
- Dignity-preserving (treat users as wise elders, not subjects)
- Ethical revenue model (transparent subscription, no data selling)

### Senior-Specific Accessibility Requirements
When implementing ANY UI component:
1. **Visual**: Minimum 18px fonts, high contrast, generous spacing
2. **Interaction**: Large touch targets (44x44px minimum), no time pressure
3. **Content**: Plain language, patient pacing, respectful tone
4. **Navigation**: Simple, consistent patterns, clear affordances

## Core Features to Implement

### Phase 1: MVP (Priority)
1. **Question-Based Discovery Engine**
   - Thoughtful prompts to surface authentic desires
   - Progressive depth (start simple, go deeper)
   - Question categories: Reconnection, Learning, Creation, Completion, Contribution, Simple Joys

2. **Life-Appropriate Goal Categories**
   - Not generic "travel/fitness" but senior-focused:
   - Reconnection (relationships to mend)
   - Wisdom Sharing (skills to teach, stories to tell)
   - Discovery (age-appropriate learning)
   - Creation (things to make)
   - Completion (unfinished business)
   - Contribution (giving back)
   - Simple Joys (moments to savor)

3. **Non-Anxious Tracking**
   - Multiple statuses: Thinking About / Planning / In Progress / Completed / Ongoing / Released
   - No percentages or gamification
   - Visual timeline showing life journey

### Phase 2: Enhanced Features
- Family sharing (invite-only, privacy controls)
- Voice memo recording (for non-typists)
- Life story integration (past, present, future chapters)
- Seasonal review prompts

### Phase 3: Legacy & Community
- Legacy book creation (annual printed compilation)
- Optional community features (story sharing, local meetups)
- Guided programs (4 Seasons Life Review, Wisdom Sharing Project)

## Critical Implementation Notes

### Question Bank Development
The heart of this platform is the question-based discovery. Sample questions in `research/competitive-analysis.md:1309-1352` must be:
- Age-appropriate and respectful
- Progressive in depth
- Skippable (no forced answers)
- Organized into meaningful sequences

### Privacy Architecture
- Everything private by default
- Granular sharing controls
- Family access only through explicit invitation
- Data export capability (user owns their data)
- No third-party tracking or analytics that violate privacy

### Business Model Implementation
Recommended hybrid approach:
- Free tier: Genuinely useful (not crippled)
- Premium ($5-10/month): Family sharing, legacy books, advanced features
- Physical products: Legacy book printing ($50-100)
- Transparent pricing with hardship considerations

## Market Context & Competitive Positioning

Key differentiators from 20+ analyzed competitors:
- **Age-appropriate** (not youth adventure focus)
- **Question-based** (not generic goal lists)
- **Meaning-focused** (not just task completion)
- **Privacy-first** (not social media)
- **Holistic** (combines aspirational living + practical preparation)

Main competitors and their weaknesses:
- **BucketList.org**: Youth-oriented, social pressure, travel-heavy
- **Storyworth**: Only backward-looking, no future goals
- **Everplans**: Death preparation only, no aspirational living

## Testing & Quality Assurance

### Accessibility Testing (Required)
- WCAG 2.1 AA compliance minimum
- Senior user testing with actual 60+ users
- Large text mode testing
- Screen reader compatibility
- Motor impairment considerations

### Emotional Impact Testing
- Platform should feel uplifting, not depressing
- Balance practical preparation with joyful aspiration
- Test emotional response to questions and UI

## File Structure (When Development Begins)

```
src/
├── components/        # Reusable UI components
│   ├── discovery/    # Question-based discovery engine
│   ├── goals/        # Goal creation and tracking
│   ├── timeline/     # Life story visualization
│   └── accessibility/ # Senior-specific UI helpers
├── features/         # Feature-specific logic
├── services/         # API and data services
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── styles/          # Global styles and themes
```

## Success Metrics

Track these beyond typical analytics:
- **Meaningfulness**: "This helped me clarify what matters"
- **Behavioral Change**: "I actually reconnected with my sister"
- **Life Satisfaction**: "I'm living more intentionally now"
- **Dignity**: "This treats me like a capable adult"

Ultimate metric: "Did this help someone live their remaining years more meaningfully?"

## Resources & References

- **Competitive Analysis**: `research/competitive-analysis.md` - Comprehensive analysis of 20+ platforms
- **Target User**: Jeff (73) - wants meaningful goals within real constraints
- **Philosophy**: Follow Hermetic principles and Gold Hat philosophy (empower, don't extract)
- **Accessibility**: W3C WCAG 2.1 AA guidelines, Nielsen Norman senior UX research

## Next Development Steps

1. **User Interviews**: Validate assumptions with 10-15 seniors (60+)
2. **Question Bank**: Develop and test 100+ reflection prompts
3. **UI/UX Design**: Create accessibility-first mockups
4. **MVP Development**: Implement Phase 1 features
5. **Beta Testing**: Partner with senior centers for real user feedback

Remember: This platform serves people in life's most precious season. Every line of code should honor their wisdom, respect their constraints, and empower them to live meaningfully.
