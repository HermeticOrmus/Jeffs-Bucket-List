# Phase 0 Research: Question-Based Discovery Engine

**Feature**: Question-Based Discovery Engine
**Date**: 2025-11-13
**Status**: Resolved - All clarifications addressed

## Executive Summary

All technical decisions have been researched and resolved based on the platform's constitution principles and target audience needs. The recommended stack prioritizes accessibility, privacy, and senior-friendly user experience.

## Technology Decisions

### 1. Frontend Framework

**Decision**: Next.js 14+ (App Router) with TypeScript

**Rationale**:
- Best-in-class accessibility tooling with built-in ESLint plugins
- Server Components reduce JavaScript load for older devices
- Mature ecosystem of accessible component libraries (Radix UI, Mantine)
- Built-in font and image optimization crucial for senior users
- Strong community support and documentation

**Alternatives Considered**:
- **Remix**: Better progressive enhancement but smaller ecosystem
- **SvelteKit**: Smaller bundles but limited accessible component libraries
- **Vue/Nuxt**: Less mature accessibility ecosystem

### 2. Component Library

**Decision**: Radix UI (headless) + Tailwind CSS with Mantine for complex components

**Rationale**:
- Radix UI provides WCAG 2.1 AA compliant primitives
- Full control over styling for senior-specific needs
- Tailwind enables rapid development with custom configuration
- Mantine offers pre-built accessible components for faster development

**Alternatives Considered**:
- **Chakra UI**: Good accessibility but less flexible
- **Material UI**: Too opinionated, harder to customize for seniors
- **Ant Design**: Weaker accessibility support

### 3. Backend Framework

**Decision**: Node.js with TypeScript + Express/Fastify

**Rationale**:
- Consistent TypeScript across full stack
- Excellent Supabase integration
- Mature ecosystem for API development
- Easy deployment to various platforms

**Alternatives Considered**:
- **Python/Django**: Good but adds language complexity
- **Go**: Excellent performance but smaller ecosystem
- **Ruby/Rails**: Good conventions but declining popularity

### 4. Database

**Decision**: PostgreSQL with Row-Level Security (via Supabase)

**Rationale**:
- Strong privacy guarantees through RLS
- JSONB provides flexibility for varying question types
- ACID transactions crucial for sensitive data
- Built-in audit capabilities for GDPR compliance
- Proven scalability for target audience (10k users)

**Alternatives Considered**:
- **MongoDB**: No built-in RLS, weaker consistency guarantees
- **MySQL**: Less flexible for JSONB data
- **DynamoDB**: Vendor lock-in, complex for relational data

### 5. Testing Framework

**Decision**: Playwright for E2E, Vitest for unit tests, axe-core for accessibility

**Rationale**:
- Playwright excels at testing senior-specific interactions
- Vitest provides fast, modern testing with great DX
- axe-core ensures WCAG compliance in automated tests

**Alternatives Considered**:
- **Cypress**: Good but Playwright more comprehensive
- **Jest**: Slower than Vitest
- **Selenium**: Outdated compared to Playwright

### 6. Deployment Platform

**Decision**: Vercel for frontend, Supabase for backend/database

**Rationale**:
- Vercel optimizes Next.js deployment automatically
- Supabase provides database, auth, and real-time features
- Both have generous free tiers for MVP development
- Excellent performance and global CDN

**Alternatives Considered**:
- **AWS**: More complex, overkill for MVP
- **Railway**: Good but less mature
- **Render**: Good alternative but less Next.js optimization

## Architecture Patterns

### Question Flow Algorithm

**Decision**: Graph-based navigation with conditional branching

**Rationale**:
- Supports complex dependencies between questions
- Enables progressive depth based on prior responses
- More flexible than simple decision trees
- Allows for dynamic path adjustments

**Implementation**:
```typescript
interface QuestionNode {
  id: string;
  question: Question;
  conditions: Condition[];
  nextNodes: QuestionNode[];
}

interface Condition {
  type: 'response_contains' | 'response_equals' | 'always';
  value: any;
  targetNodeId: string;
}
```

### Goal Generation Logic

**Decision**: Keyword matching with weighted scoring (non-AI initially)

**Rationale**:
- Transparent and predictable for users
- No "black box" AI concerns
- Can be enhanced with AI later
- Respects privacy (no external API calls)

**Implementation**:
```typescript
interface GoalTemplate {
  category: string;
  keywords: string[];
  weight: number;
  template: string;
}

function generateGoals(responses: Response[]): Goal[] {
  // Match responses against templates
  // Score based on keyword frequency
  // Return top scoring goals
}
```

### Data Privacy Pattern

**Decision**: Application-layer encryption for sensitive responses

**Rationale**:
- Extra protection beyond database encryption
- Sensitive data protected even if database compromised
- Granular control over what gets encrypted
- Compliance with privacy-by-default principle

**Implementation**:
```typescript
class EncryptionService {
  encryptResponse(text: string): EncryptedData
  decryptResponse(data: EncryptedData): string
}
```

## Accessibility Patterns

### Senior-Specific UI Configuration

**Decision**: Custom Tailwind configuration with senior-friendly defaults

**Settings**:
- Base font size: 18px minimum
- Touch targets: 44x44px minimum
- Line height: 1.6 for readability
- High contrast color palette
- Generous spacing between elements

### Voice Input Integration

**Decision**: Web Speech API for MVP, upgrade to specialized service later

**Rationale**:
- Native browser support, no external dependencies
- Good enough for MVP validation
- Can upgrade to Google Cloud Speech or Azure later
- Respects privacy (processes locally where supported)

### Progressive Enhancement Strategy

**Decision**: Server-first rendering with progressive JavaScript enhancement

**Pattern**:
1. Core functionality works without JavaScript
2. JavaScript enhances experience when available
3. Features degrade gracefully
4. Forms submit to server by default

## Performance Targets

Based on senior user needs and device capabilities:

- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3.0 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Question Navigation**: < 100ms response
- **Session Save**: < 500ms
- **Concurrent Users**: 1,000 minimum

## Security & Privacy

### Encryption Strategy

- **At Rest**: PostgreSQL Transparent Data Encryption
- **In Transit**: TLS 1.3 minimum
- **Application Layer**: AES-256-GCM for sensitive responses
- **Key Management**: Environment variables, rotated quarterly

### Access Control

- **Database**: Row-Level Security enforces user isolation
- **API**: JWT tokens with short expiration
- **Family Sharing**: Explicit invitation-only with granular permissions
- **Admin Access**: Separate service accounts with minimal privileges

### GDPR Compliance

- **Data Export**: JSON, PDF, CSV formats supported
- **Right to Deletion**: Soft delete with 30-day hard delete
- **Audit Logging**: All data access logged
- **Consent Tracking**: Explicit consent for all sharing

## Scalability Considerations

### Phase 1 (0-10k users)
- Single PostgreSQL instance
- Basic caching with Redis
- Vercel/Supabase free tiers adequate

### Phase 2 (10k-50k users)
- Add read replicas
- Implement CDN for static assets
- Upgrade to paid tiers

### Phase 3 (50k+ users)
- Database partitioning by user
- Multiple API instances
- Advanced caching strategies

## Cost Analysis

### MVP Monthly Costs (estimated)
- **Vercel**: $0-20 (free tier likely sufficient)
- **Supabase**: $0-25 (free tier for development)
- **Domain**: $15/year (~$1.25/month)
- **Total**: ~$25-45/month for MVP

### Production Costs (10k active users)
- **Vercel Pro**: $20/month
- **Supabase Pro**: $25/month
- **Monitoring**: $10/month (Sentry)
- **Total**: ~$55-65/month

## Risk Mitigation

### Technical Risks
- **Risk**: Complex question flow logic
- **Mitigation**: Start simple, iterate based on user feedback

### Privacy Risks
- **Risk**: Data breach exposes sensitive reflections
- **Mitigation**: Multiple encryption layers, RLS, audit logging

### Accessibility Risks
- **Risk**: Interface too complex for target demographic
- **Mitigation**: Extensive testing with actual 60+ users

### Scalability Risks
- **Risk**: Unexpected viral growth
- **Mitigation**: Architecture supports horizontal scaling

## Recommendations

### Immediate Next Steps
1. Set up Next.js 14 project with TypeScript
2. Configure Tailwind with senior-friendly defaults
3. Create Supabase project and run database migrations
4. Build first 3-5 accessible components
5. Implement basic question flow with 10 sample questions

### MVP Priorities
1. Core discovery flow (P1 user story)
2. Basic goal suggestion (keyword matching)
3. Session persistence
4. Accessibility features (text sizing, high contrast)
5. Privacy controls (all private by default)

### Future Enhancements (Post-MVP)
1. AI-powered goal suggestions
2. Voice input/output
3. Family sharing features
4. Legacy book generation
5. Community features (opt-in)

## Conclusion

All technical clarifications from the implementation plan have been resolved. The chosen stack optimally balances:

- **Accessibility** for 60+ users
- **Privacy** for sensitive personal data
- **Performance** on varied devices
- **Scalability** for growth
- **Development velocity** for rapid iteration

The architecture strongly aligns with all six constitution principles and provides a solid foundation for the Question-Based Discovery Engine.