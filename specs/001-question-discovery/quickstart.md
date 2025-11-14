# Quickstart: Question-Based Discovery Engine

**Feature**: Question-Based Discovery Engine
**Version**: 1.0.0
**Last Updated**: 2025-11-13

## Overview

The Question-Based Discovery Engine helps users 60+ surface authentic life goals through thoughtful, age-appropriate prompts. This quickstart guide will help you get the feature running locally.

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+ (or Supabase account)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/jeffs-bucket-list.git
cd jeffs-bucket-list
git checkout 001-question-discovery
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

#### Option A: Using Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key
4. Run migrations:

```bash
cd database
npx supabase db push
```

#### Option B: Local PostgreSQL

1. Create a database:
```sql
CREATE DATABASE jeffs_bucket_list;
```

2. Run migrations:
```bash
cd database
npm run migrate:up
```

3. Seed sample data:
```bash
npm run seed
```

### 4. Environment Configuration

Create `.env.local` files:

#### Backend (.env.local)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jeffs_bucket_list
# Or for Supabase:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Auth
JWT_SECRET=your-jwt-secret-min-32-chars
JWT_EXPIRY=7d

# Encryption
ENCRYPTION_KEY=your-32-byte-hex-key

# Server
PORT=3001
NODE_ENV=development
```

#### Frontend (.env.local)
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Features
NEXT_PUBLIC_ENABLE_VOICE=false
```

### 5. Start Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/v1
- API Documentation: http://localhost:3001/api-docs

## Quick Test

### 1. Create a Test User

```bash
curl -X POST http://localhost:3001/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "display_name": "Test User",
    "birth_year": 1950
  }'
```

### 2. Start a Discovery Session

```bash
# Get auth token from login response
TOKEN="your-jwt-token"

curl -X POST http://localhost:3001/v1/discovery/sessions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Get First Question

```bash
SESSION_ID="session-id-from-response"

curl -X GET "http://localhost:3001/v1/discovery/sessions/$SESSION_ID/questions/next" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Submit a Response

```bash
QUESTION_ID="question-id-from-response"

curl -X POST http://localhost:3001/v1/discovery/responses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "'$SESSION_ID'",
    "question_id": "'$QUESTION_ID'",
    "response_data": {
      "text": "I want to reconnect with my sister"
    }
  }'
```

## Key Features

### Discovery Flow

1. **Start Session**: User begins discovery (optionally choosing a category)
2. **Answer Questions**: Progressive questions based on responses
3. **Skip Option**: Any question can be skipped
4. **Save Progress**: Automatic session saving
5. **Generate Goals**: After 5+ responses, get personalized suggestions

### Question Types

- **Text**: Free-form responses (10-500 characters)
- **Multiple Choice**: Select one or multiple options
- **Scale**: Rate importance/interest (1-10)
- **Yes/No**: Simple binary choices

### Privacy Features

- All responses private by default
- Optional family sharing (invite-only)
- Application-layer encryption for sensitive questions
- Data export in JSON/PDF/CSV formats

## Development Guidelines

### Accessibility Requirements

```tsx
// All interactive elements must meet size requirements
<Button className="min-h-[44px] min-w-[44px] text-lg">
  Next Question
</Button>

// Text must be readable
<p className="text-base leading-relaxed"> // 18px minimum
  Question text here
</p>

// Provide skip options
<button onClick={skipQuestion} className="text-muted">
  Skip this question
</button>
```

### State Management

```typescript
// Use React Context for discovery state
const {
  session,
  currentQuestion,
  submitResponse,
  skipQuestion,
  getNextQuestion
} = useDiscovery();
```

### API Integration

```typescript
// Use provided API client
import { discoveryAPI } from '@/lib/api';

// Start session
const session = await discoveryAPI.createSession();

// Get next question
const { question, progress } = await discoveryAPI.getNextQuestion(session.id);

// Submit response
await discoveryAPI.submitResponse({
  session_id: session.id,
  question_id: question.id,
  response_data: { text: userInput }
});
```

## Testing

### Unit Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### E2E Tests

```bash
# Run Playwright tests
npm run test:e2e
```

### Accessibility Tests

```bash
# Run axe-core accessibility tests
npm run test:a11y
```

## Common Issues

### Issue: Database connection failed

**Solution**: Ensure PostgreSQL is running and credentials are correct

```bash
# Check PostgreSQL status
pg_isready

# Test connection
psql -U your_user -d jeffs_bucket_list -c "SELECT 1"
```

### Issue: Questions not appearing

**Solution**: Ensure question bank is seeded

```bash
cd database
npm run seed:questions
```

### Issue: Encryption key error

**Solution**: Generate a proper encryption key

```bash
# Generate 32-byte hex key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Architecture Overview

```
Frontend (Next.js)
    ↓
API Gateway
    ↓
Backend Services
    ├── Discovery Engine
    ├── Question Selector
    ├── Goal Generator
    └── Session Manager
    ↓
PostgreSQL Database
    └── Row-Level Security
```

## API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /discovery/categories | List question categories |
| POST | /discovery/sessions | Start new session |
| GET | /discovery/sessions/:id/questions/next | Get next question |
| POST | /discovery/responses | Submit response |
| POST | /discovery/goals/suggestions | Generate goal suggestions |

### Full API Documentation

See [discovery-api.yaml](./contracts/discovery-api.yaml) for complete OpenAPI specification.

## Security Notes

- JWT tokens expire after 7 days
- All API endpoints require authentication
- Sensitive responses encrypted at application layer
- Row-level security enforces user isolation
- Rate limiting: 100 requests per minute per user

## Performance Targets

- Page load: < 2 seconds
- Question navigation: < 100ms
- Response submission: < 500ms
- Goal generation: < 2 seconds

## Monitoring

### Key Metrics

- Session completion rate (target: >60%)
- Questions answered per session (target: >10)
- Skip rate per question (target: <15%)
- Goal relevance rating (target: >75% relevant)

### Health Checks

```bash
# Backend health
curl http://localhost:3001/health

# Database health
curl http://localhost:3001/health/db
```

## Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] Rate limiting enabled
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (privacy-respecting)
- [ ] Backup strategy implemented
- [ ] GDPR compliance verified

### Deploy Commands

```bash
# Build for production
npm run build

# Run production server
npm start

# Or deploy to Vercel
vercel deploy --prod
```

## Support

For issues or questions:
- Check [README.md](../../README.md)
- Review [CONSTITUTION.md](../../.specify/memory/constitution.md)
- Open an issue on GitHub

## Next Steps

1. Complete the discovery flow UI
2. Implement goal suggestion algorithm
3. Add voice input support
4. Create family sharing features
5. Build data export functionality

---

**Remember**: This platform serves users in their most precious years. Every interaction should honor their wisdom and respect their journey.