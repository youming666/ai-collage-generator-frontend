# Vercel Deployment Guide

## 🚀 Complete Deployment Steps

### Step 1: Vercel Project Setup

Since you've already imported your GitHub repository to Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Find your imported project
3. Click on it to enter project settings

### Step 2: Configure Environment Variables

⚠️ **CRITICAL**: You must add these environment variables before deployment

1. In Vercel project dashboard, click **Settings** → **Environment Variables**

2. Add the following variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `MODAL_API_URL` | Your Modal API endpoint URL | Production, Preview, Development |
| `API_SECRET_KEY` | Generate with: `openssl rand -hex 32` | Production, Preview, Development |
| `NEXT_PUBLIC_API_SECRET_KEY` | Same as API_SECRET_KEY | Production, Preview, Development |

#### How to get your Modal API URL:
```bash
# If you have Modal CLI installed
modal app list

# Your URL should look like:
# https://YOUR_USERNAME--3d-nine-grid-bg-removal.modal.run
```

#### How to generate API keys:
```bash
# On Mac/Linux:
openssl rand -hex 32

# On Windows (PowerShell):
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Step 3: Framework & Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Step 4: Deploy

1. After adding environment variables, click **Deployments** tab
2. Click **Redeploy** button (or trigger new deployment by pushing to GitHub)
3. Wait for deployment to complete (usually 1-3 minutes)

### Step 5: Verify Deployment

Once deployed, test these features:

✅ Homepage loads correctly
✅ Upload 9-grid photos
✅ Upload main photo
✅ Click "Generate" - should call Modal API for background removal
✅ Adjust parameters (scale, horizontal, vertical)
✅ Download final image
✅ Navigate to `/split` page
✅ Test grid photo split functionality

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

---

## 🔧 Troubleshooting

### Issue 1: "API key not configured" error

**Solution**: Make sure `NEXT_PUBLIC_API_SECRET_KEY` is added to Vercel environment variables

### Issue 2: "Modal API call failed"

**Solution**:
1. Verify `MODAL_API_URL` is correct
2. Make sure Modal function is deployed and running
3. Check Modal logs: `modal app logs YOUR_APP_NAME`

### Issue 3: Build fails

**Solution**:
```bash
# Test build locally first:
npm run build

# If successful locally, redeploy on Vercel
```

### Issue 4: 401 Unauthorized from Modal API

**Solution**: Make sure the `API_SECRET_KEY` in Vercel matches the one configured in your Modal function

---

## 📊 Post-Deployment Checklist

- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Homepage accessible
- [ ] Background removal working
- [ ] Photo split tool working
- [ ] Daily quota system working
- [ ] localStorage persistence working
- [ ] Downloads working
- [ ] Custom domain configured (if needed)
- [ ] Google Analytics added (if needed)

---

## 🔄 Continuous Deployment

Now that your project is connected to GitHub:

1. Any push to `main` branch → Automatic deployment to Production
2. Any push to other branches → Preview deployment
3. Pull requests → Preview deployments with unique URLs

---

## 🌐 Your Live URLs

After deployment, you'll have:

- **Production**: `https://your-project-name.vercel.app`
- **Preview**: `https://your-project-name-git-branch.vercel.app`
- **Custom Domain** (if configured): `https://yourdomain.com`

---

## 🔐 Security Notes

1. ✅ Never commit `.env.local` to GitHub
2. ✅ Keep `.env.example` for documentation only
3. ✅ Use Vercel environment variables for production secrets
4. ✅ Rotate API keys periodically

---

## 📈 Analytics & Monitoring

Optional: Add analytics to track usage

1. **Vercel Analytics** (Built-in):
   - Go to **Analytics** tab in Vercel dashboard
   - Enable Web Analytics

2. **Google Analytics** (Optional):
   - Add GA script to `app/layout.tsx`
   - Use environment variable for GA ID

---

**Deployment Time**: ~3 minutes for first deployment
**Build Time**: ~1-2 minutes
**CDN Propagation**: Instant (Vercel Edge Network)

Good luck with your deployment! 🚀
