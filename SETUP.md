# Jeff's Bucket List - Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (create one at [supabase.com](https://supabase.com))
- Git

## Initial Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Jeffs-Bucket-List
npm install
```

### 2. Set Up Supabase Project

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**
   - **service_role key** (keep this secret!)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 4. Set Up Database Schema

Run the database migrations in your Supabase SQL editor:

1. Go to the SQL Editor in your Supabase dashboard
2. Open `database/migrations/001_initial_schema.sql`
3. Copy and paste the entire contents
4. Click "Run"

5. Then run the seed data:
   - Open `database/seeds/001_categories.sql` and run it
   - Open `database/seeds/002_questions.sql` and run it

### 5. Configure Row Level Security (RLS)

The migrations include RLS policies, but verify they're active:

1. Go to Authentication → Policies in Supabase
2. Ensure policies are enabled for:
   - `users`
   - `user_profiles`
   - `goals`
   - `discovery_sessions`
   - `responses`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Create Your First Account

1. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Create an account with your email
3. Check your email for the confirmation link (check spam if needed)
4. Click the confirmation link
5. Sign in at [http://localhost:3000/login](http://localhost:3000/login)

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (use your Vercel deployment URL)

### 3. Deploy

Vercel will automatically deploy your project!

## Troubleshooting

### "Missing Supabase environment variables" error

- Verify `.env.local` exists and has correct values
- Restart your development server after changing environment variables
- On Vercel, double-check the environment variables in project settings

### Email confirmation not arriving

- Check your Supabase Auth settings → Email Templates
- Verify email provider is configured (Supabase provides default SMTP)
- Check spam folder

### Database connection errors

- Verify your Supabase project URL and keys are correct
- Check if your Supabase project is active (not paused)
- Review Supabase logs for detailed error messages

### Build fails on Vercel

- Ensure all environment variables are set in Vercel project settings
- Check build logs for specific errors
- Verify Node.js version is 18+ (set in `package.json` engines if needed)

## Development Notes

### Authentication Flow

- Sign up creates a user in Supabase Auth and a profile in your `users` table
- Protected routes automatically redirect to `/login` if not authenticated
- Session is managed via HTTP-only cookies for security

### Database Access

- All database operations use Row Level Security (RLS)
- Users can only access their own data by default
- Service role key bypasses RLS (use with caution, server-side only)

### Code Structure

```
src/
├── app/                 # Next.js 15 app directory (pages)
├── components/          # Reusable UI components
├── contexts/            # React contexts (Auth, etc.)
├── lib/                 # Utility functions and configurations
│   └── supabase/       # Supabase client setup
├── types/              # TypeScript type definitions
└── styles/             # Global styles and CSS

database/
├── migrations/         # SQL schema migrations
└── seeds/             # Initial data (categories, questions)
```

## Support

For issues or questions:
- Check the [troubleshooting section](#troubleshooting) above
- Review [Supabase documentation](https://supabase.com/docs)
- Review [Next.js documentation](https://nextjs.org/docs)

---

Built with ❤️ for meaningful living in later years.
