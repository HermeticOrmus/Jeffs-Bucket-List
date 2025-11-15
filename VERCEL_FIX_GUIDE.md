# Vercel Deployment Fix Guide

## Issue: "No Next.js version detected" Error

Your code is correct (verified: Next.js 15.5.6 in package.json), but Vercel project settings may be misconfigured.

## Step-by-Step Fix

### 1. Check Your Vercel Project Settings

Go to your Vercel Dashboard → Select Project → **Settings** → **General**

#### Critical Settings to Verify:

**Root Directory:**
- Should be: `.` OR leave **completely blank**
- ❌ DO NOT set it to any subdirectory
- Screenshot: [Root Directory should show "." or be empty]

**Framework Preset:**
- Should be: **Next.js**
- If it shows "Other" or anything else, change it to "Next.js"

**Build & Development Settings:**
- Build Command: `npm run build` (or leave default)
- Output Directory: `.next` (or leave default)
- Install Command: `npm install` (or leave default)

### 2. Verify You're Deploying the Correct Branch

Go to **Settings** → **Git**

**Production Branch:**
- Should be: `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6`
- OR whatever branch you want to deploy

### 3. Check Latest Deployment Commit

Go to **Deployments** tab

Look at the most recent deployment:
- **Commit hash** should be: `fff5d09`
- **Branch** should be: `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6`

If it's showing a different commit or branch, that's your problem.

### 4. Clear and Redeploy

**Option A: Redeploy from Deployments tab**
1. Go to **Deployments**
2. Find the latest deployment
3. Click three dots `...` → **Redeploy**
4. Uncheck "Use existing Build Cache"
5. Click **Redeploy**

**Option B: Trigger new deployment from Git**
1. Make a small change locally (add a comment to a file)
2. Commit and push:
```bash
git commit --allow-empty -m "Trigger Vercel rebuild"
git push origin claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6
```

### 5. If Still Failing: Delete and Reimport Project

**Last resort if settings are corrupted:**

1. Go to **Settings** → **General** → scroll to bottom
2. Click **Delete Project** (don't worry, your code is safe in Git)
3. Go back to Vercel Dashboard → **Add New Project**
4. Import your GitHub repo again
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: (leave blank)
   - **Branch**: `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6`
6. **DO NOT DEPLOY YET** - first add environment variables (see below)
7. Add environment variables (Settings → Environment Variables)
8. Then deploy

## Required Environment Variables

Before deploying, you MUST add these in **Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

Make sure to check:
- ✅ Production
- ✅ Preview
- ✅ Development

(for the NEXT_PUBLIC_* variables)

## Debugging Steps

### Check Build Logs

When deployment runs, look for:

**✅ Good:**
```
14:18:02.563 Detected Next.js version: 15.5.6
14:18:02.564 Running "npm run build"
```

**❌ Bad:**
```
No Next.js version detected
```

### Common Mistakes

1. **Root Directory set incorrectly** (e.g., set to `src` or `/`)
2. **Framework Preset not set to Next.js**
3. **Deploying from wrong branch** (deploying `main` which has Vite project)
4. **Build cache from old Vite project** (clear cache and redeploy)

## What We've Verified

✅ Remote code has correct package.json with Next.js 15.5.6
✅ Remote code has correct vercel.json with framework: "nextjs"
✅ Latest commit (fff5d09) has all correct configuration

**The issue is in Vercel project settings, not your code.**

## Need More Help?

Check these in order:
1. What does **Settings → General → Root Directory** show?
2. What does **Settings → General → Framework Preset** show?
3. What branch is selected in **Settings → Git → Production Branch**?
4. What commit hash shows in **Deployments** tab (latest deployment)?

Share screenshots of these and we can pinpoint the exact issue.
