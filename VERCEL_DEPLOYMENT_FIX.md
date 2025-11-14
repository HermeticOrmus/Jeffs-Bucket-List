# Vercel Deployment Fix Guide

## Issue: 404 Error on Vercel

If you're seeing a 404 error after deploying to Vercel, follow these steps:

## ✅ Quick Fixes

### 1. Update vercel.json (DONE)
The `vercel.json` has been simplified to only include essential headers. Vercel auto-detects Next.js configuration.

### 2. Redeploy with Correct Settings

In your Vercel dashboard:

1. **Go to Project Settings**
2. **Build & Development Settings**
3. **Verify these settings:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Build Command: Leave empty (auto-detect)
   - Output Directory: Leave empty (auto-detect)
   - Install Command: `npm install`
   - Development Command: Leave empty (auto-detect)

4. **Root Directory**: `.` (current directory)

### 3. Environment Variables

Make sure these are set in Vercel dashboard:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Force Redeploy

After updating configuration:
1. Go to Deployments tab
2. Click the three dots on latest deployment
3. Click "Redeploy"
4. Check "Clear Build Cache"
5. Click "Redeploy"

## 🔍 Debugging Steps

### Check Build Logs

1. Go to your deployment in Vercel dashboard
2. Click on the deployment
3. Look at the "Building" section
4. Verify it says "Detected Next.js"
5. Check for any build errors

### Verify Routes

After deployment, try accessing:
- `https://your-domain.vercel.app/` - Home page
- `https://your-domain.vercel.app/dashboard` - Dashboard
- `https://your-domain.vercel.app/discovery` - Discovery
- `https://your-domain.vercel.app/test.txt` - Test file (should show "Deployment test successful")

### Common Issues

#### Issue: "404: This page could not be found"

**Solution 1: Clear Build Cache**
```bash
# In Vercel dashboard:
Deployments → Select deployment → Redeploy → ✓ Clear Build Cache
```

**Solution 2: Check Node Version**
Vercel settings → General → Node.js Version → Use 18.x or 20.x

**Solution 3: Remove Conflicting Files**
Make sure you don't have:
- A `pages/` directory (we're using App Router)
- Conflicting routing files
- Old build artifacts

#### Issue: Static assets not loading

**Solution:** Ensure `public/` directory is not in `.vercelignore`

#### Issue: Environment variables not working

**Solution:**
1. Add variables in Vercel dashboard (Project Settings → Environment Variables)
2. Make sure to redeploy after adding variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

## 🚀 Fresh Deployment

If all else fails, try a fresh deployment:

1. **Delete the Vercel project**
2. **Re-import from GitHub:**
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import your repository
   - **DON'T modify any settings** - let Vercel auto-detect
   - Add environment variables
   - Deploy

3. **Verify Auto-Detection:**
   - Framework: Should say "Next.js"
   - Root Directory: Should be empty or "."
   - Build Command: Should be auto-detected
   - Output Directory: Should be auto-detected

## 📝 Vercel Configuration Checklist

- [ ] vercel.json simplified (no buildCommand, outputDirectory)
- [ ] Framework auto-detected as Next.js
- [ ] Environment variables added
- [ ] Build cache cleared
- [ ] Node.js version is 18.x or 20.x
- [ ] No pages/ directory conflicts
- [ ] public/ directory exists with test files

## 🔗 Useful Links

- [Vercel Next.js Deployment Docs](https://vercel.com/docs/frameworks/nextjs)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Vercel Support](https://vercel.com/support)

## 🆘 Still Not Working?

1. **Check Vercel Build Logs** - Look for specific error messages
2. **Test Local Build** - Run `npm run build && npm start` locally
3. **Check Vercel Status** - Visit https://www.vercel-status.com
4. **Contact Support** - Vercel support can help with specific deployment issues

## ✅ Expected Behavior

After successful deployment:
- `/` → Shows home page
- `/dashboard` → Shows dashboard
- `/discovery` → Shows discovery landing
- `/goals` → Shows goals page
- All static assets load correctly
- No console errors

---

**Last Updated:** November 2025
**Tested With:** Next.js 15.0.3, Vercel, Node.js 20.x
