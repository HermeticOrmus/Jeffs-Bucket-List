# Deployment Guide - Jeff's Bucket List Platform

## Overview

This guide will walk you through deploying Jeff's Bucket List platform to Vercel with Supabase as the database backend.

## Prerequisites

- GitHub account
- Vercel account (free tier works fine)
- Supabase account (free tier works fine)
- Git installed locally

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - Project name: `jeffs-bucket-list` (or your preferred name)
   - Database password: Generate a strong password and **save it securely**
   - Region: Choose closest to your target users
5. Click "Create new project" and wait for setup to complete (2-3 minutes)

### 1.2 Run Database Migrations

1. In your Supabase dashboard, go to the SQL Editor
2. Click "New Query"
3. Copy the contents of `database/migrations/001_initial_schema.sql`
4. Paste into the SQL editor and click "Run"
5. Wait for the migration to complete successfully

### 1.3 Seed Initial Data

1. Create a new query in the SQL Editor
2. Copy the contents of `database/seeds/001_categories.sql`
3. Run the query
4. Repeat for `database/seeds/002_questions.sql`

### 1.4 Get API Keys

1. Go to Project Settings > API
2. Copy the following values (you'll need them for Vercel):
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon/public key**: The `anon` public API key
   - **service_role key**: The service role secret key (keep this secret!)

## Step 2: Deploy to Vercel

### 2.1 Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Initial platform build for Vercel deployment"
git push origin claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6
```

### 2.2 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `.next` (should auto-detect)

### 2.3 Add Environment Variables

In the Vercel project settings, add the following environment variables:

#### Required Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

#### Optional Variables:

```
NEXT_PUBLIC_APP_URL=https://[your-vercel-app].vercel.app
```

**Important**: Make sure all variables starting with `NEXT_PUBLIC_` are available in both Production and Preview environments.

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-5 minutes)
3. Once deployed, click "Visit" to see your live site!

## Step 3: Post-Deployment Configuration

### 3.1 Configure Supabase Authentication (Optional for MVP)

If you want to enable user authentication:

1. In Supabase dashboard, go to Authentication > URL Configuration
2. Add your Vercel URL to "Site URL": `https://[your-vercel-app].vercel.app`
3. Add to "Redirect URLs":
   - `https://[your-vercel-app].vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local development)

### 3.2 Test the Deployment

1. Visit your Vercel URL
2. Test the following flows:
   - ✅ Home page loads correctly
   - ✅ Navigation works (Discovery, Goals, About)
   - ✅ Discovery flow allows answering questions
   - ✅ Goal suggestions appear after 5+ responses
   - ✅ Goals page displays correctly
   - ✅ Accessibility features work (text is large, high contrast)

### 3.3 Custom Domain (Optional)

To add a custom domain:

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS
4. Update `NEXT_PUBLIC_APP_URL` environment variable with your custom domain

## Step 4: Local Development Setup

To run the project locally for development:

### 4.1 Install Dependencies

```bash
npm install
```

### 4.2 Configure Local Environment

Create `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4.3 Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your local instance.

## Troubleshooting

### Build Fails on Vercel

- Check the build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify that the repository includes all necessary files
- Try running `npm run build` locally to reproduce the error

### Database Connection Issues

- Verify Supabase project is active and not paused
- Check that API keys are correct and not expired
- Ensure Row Level Security policies are properly configured
- Check Supabase logs in dashboard for authentication errors

### Slow Performance

- Enable Vercel Analytics to identify bottlenecks
- Check Supabase database indexes are created
- Consider enabling Vercel Edge Functions for faster responses
- Review Next.js Image Optimization settings

### Accessibility Issues

- Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- Use browser DevTools Lighthouse to audit accessibility
- Verify minimum font size is 18px
- Check color contrast ratios meet WCAG AA standards

## Monitoring and Maintenance

### Vercel Dashboard

- Monitor deployment status and build logs
- Review analytics for usage patterns
- Set up deployment notifications

### Supabase Dashboard

- Monitor database size and performance
- Review authentication logs
- Check API usage and rate limits
- Set up backup schedules

### Recommended Monitoring

- Set up Vercel Web Analytics (free)
- Configure Supabase email alerts for errors
- Monitor Core Web Vitals
- Track user feedback and accessibility issues

## Security Checklist

Before going to production:

- [ ] Rotate all API keys and secrets
- [ ] Enable Supabase Row Level Security on all tables
- [ ] Configure Content Security Policy headers
- [ ] Enable Vercel Bot Protection
- [ ] Set up proper CORS policies
- [ ] Enable Supabase Auth email verification
- [ ] Review and test all privacy settings
- [ ] Ensure GDPR compliance features work
- [ ] Test data export functionality
- [ ] Verify soft delete is working correctly

## Scaling Considerations

### When to Scale

- More than 10,000 active users
- More than 1 million database rows
- Response time > 2 seconds
- High CPU usage on Vercel

### Scaling Options

1. **Vercel**: Upgrade to Pro plan for:
   - More concurrent builds
   - Better performance analytics
   - Priority support

2. **Supabase**: Upgrade to Pro plan for:
   - More database connections
   - Automatic backups
   - Point-in-time recovery
   - Better performance

3. **Optimizations**:
   - Enable Incremental Static Regeneration
   - Implement Redis caching
   - Use CDN for static assets
   - Database query optimization

## Next Steps

Once deployed, consider:

1. **User Testing**: Invite 10-15 seniors to test the platform
2. **Analytics**: Set up event tracking for key actions
3. **Feedback Loop**: Add feedback mechanism for users
4. **Content**: Expand question bank to 150+ questions
5. **Features**: Implement Phase 2 features (category exploration, progressive depth)
6. **Authentication**: Add proper user accounts and authentication
7. **Family Sharing**: Implement invite system for family members
8. **Legacy Features**: Add the ability to create legacy books

## Support

For deployment issues:
- Check Vercel documentation: https://vercel.com/docs
- Check Supabase documentation: https://supabase.com/docs
- Review Next.js deployment guide: https://nextjs.org/docs/deployment

For platform-specific questions:
- Review CLAUDE.md for project philosophy and guidelines
- Check specs/ directory for detailed feature specifications
- Review database/migrations for schema details

---

**Remember**: This platform serves people in life's most precious season. Every deployment decision should honor their wisdom, respect their constraints, and empower them to live meaningfully.
