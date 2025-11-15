# CRITICAL: Stop Branch Contamination

## The Problem

Your deployment branch `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6` keeps getting automatically merged with `main` branch, which contains a **completely different Vite project**. This has happened **4 times now** and breaks every deployment.

**What's happening:**
- `main` branch = Old Vite project (wrong)
- Deployment branch = New Next.js project (correct)
- Something keeps merging them together = Broken hybrid that can't deploy

## Immediate Solution

I've force-pushed the correct code again (commit: d04b7bd). But this will keep happening unless you fix the root cause.

## Root Cause - You Need to Check

Someone or something is automatically merging `main` into your deployment branch. Check these:

### 1. GitHub Branch Protection Rules
Go to: **GitHub → Repository Settings → Branches**

Look for:
- [ ] Auto-merge rules
- [ ] Required status checks that trigger merges
- [ ] "Automatically delete head branches" enabled

**Fix:** Disable any auto-merge settings for this branch.

### 2. GitHub Actions / Workflows
Go to: **GitHub → Repository → .github/workflows/**

Check if there's a workflow that:
- Merges main into feature branches automatically
- Runs on push/PR events
- Has "merge" or "sync" in the name

**Fix:** Disable or delete any auto-merge workflows.

### 3. Vercel Git Integration
Go to: **Vercel Dashboard → Project Settings → Git**

Check:
- [ ] Is "Production Branch" set to the deployment branch?
- [ ] Is there an "auto-merge" or "sync" setting enabled?

**Fix:** Ensure Production Branch is ONLY set to your deployment branch, no auto-sync.

### 4. GitHub Apps / Integrations
Go to: **GitHub → Repository → Settings → Integrations & services**

Look for:
- Bots that auto-merge (Mergify, Kodiak, etc.)
- Branch syncing tools
- Auto-update apps

**Fix:** Disable any that might be merging branches.

## Permanent Solution Options

### Option A: Rename Main Branch (Recommended)
Since `main` contains the old Vite project and you're not using it:

1. Go to **GitHub → Repository → Settings → Branches**
2. Change default branch to `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6`
3. Rename `main` to `old-vite-project`

This prevents accidental merges.

### Option B: Delete Main Branch
If you don't need the Vite project anymore:

1. Make deployment branch the default first
2. Delete `main` branch
3. No more contamination possible

### Option C: Protect the Deployment Branch
Go to: **GitHub → Repository → Settings → Branches → Branch protection rules**

Add rule for `claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6`:
- [x] Require pull request reviews before merging
- [x] Restrict who can push to matching branches
- This prevents auto-merges

## How to Verify It's Fixed

After implementing one of the solutions above:

1. Wait 5 minutes
2. Run: `git fetch origin`
3. Run: `git log --oneline origin/claude/verl-platform-deployment-01WGdQ5zUfbHPJQgKdfmpzQ6 -3`
4. Check that the latest commit is still `d04b7bd` (not a new merge)

## If It Happens Again

If you see another "Merge branch 'main'" commit appear:

**Tell me immediately what happened between the fix and the new merge:**
- Did you create a PR?
- Did you push to main?
- Did Vercel redeploy?
- Did you change any settings?

This will help identify the trigger.

## Current Clean State

✅ Latest commit: `d04b7bd` - "Simplify homepage and chat experience"
✅ Contains: Next.js 15.5.6 with proper package.json
✅ Ready to deploy once you add Supabase env vars

**Action Required:** Implement one of the permanent solutions above to prevent this from happening a 5th time.
