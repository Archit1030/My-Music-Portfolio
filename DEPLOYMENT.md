# 🚀 Deployment Guide: Vercel + Railway

This guide will walk you through deploying your Music Portfolio with Vercel (frontend) and Railway (backend).

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Railway account (sign up at [railway.app](https://railway.app))
- Your code pushed to GitHub

---

## Part 1: Deploy Backend to Railway (15 minutes)

### Step 1: Sign Up for Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with your **GitHub account**
4. Authorize Railway to access your repositories

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: **`My-Music-Portfolio`**
4. Railway will detect your project

### Step 3: Configure Backend Service

1. After project creation, click **"+ New"** → **"Empty Service"**
2. Click on the new service
3. Go to **"Settings"** tab
4. Under **"Source"**, click **"Connect Repo"**
5. Select your **`My-Music-Portfolio`** repository
6. Set **Root Directory** to: `backend`
7. Click **"Save"**

### Step 4: Set Environment Variables

1. In your service, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables:

```
MONGO_URL=your_mongodb_connection_string
DB_NAME=your_database_name
CORS_ORIGINS=*
PORT=8000
```

**Note:** If you don't have MongoDB yet:
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Or use Railway's MongoDB plugin (click "+ New" → "Database" → "Add MongoDB")

### Step 5: Deploy Backend

1. Railway will automatically deploy after you save
2. Wait for deployment to complete (2-3 minutes)
3. Once deployed, go to **"Settings"** tab
4. Click **"Generate Domain"** under **"Networking"**
5. **Copy your backend URL** (e.g., `https://your-backend.railway.app`)
6. **Save this URL** - you'll need it for frontend!

### Step 6: Test Backend

1. Open your backend URL in browser
2. Add `/api` to the URL: `https://your-backend.railway.app/api`
3. You should see: `{"message": "Hello World"}`
4. ✅ Backend is live!

---

## Part 2: Deploy Frontend to Vercel (10 minutes)

### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign in with your **GitHub account**
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find and select **`My-Music-Portfolio`**
3. Click **"Import"**

### Step 3: Configure Build Settings

1. **Framework Preset**: Vercel should auto-detect "Create React App"
2. **Root Directory**: Click **"Edit"** and set to `frontend`
3. **Build Command**: `npm run build` (should be auto-filled)
4. **Output Directory**: `build` (should be auto-filled)
5. **Install Command**: `npm install` (should be auto-filled)

### Step 4: Set Environment Variables

1. Expand **"Environment Variables"** section
2. Add this variable:

```
Name: REACT_APP_BACKEND_URL
Value: https://your-backend.railway.app
```

**Important:** Replace `your-backend.railway.app` with your actual Railway backend URL from Part 1, Step 5!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Vercel will build and deploy your frontend
4. Once complete, you'll see **"Congratulations!"**

### Step 6: Get Your Live URL

1. Click **"Visit"** or copy the URL
2. Your site will be at: `https://your-project.vercel.app`
3. ✅ Frontend is live!

---

## Part 3: Test Your Deployment

### Test Checklist:

1. **Visit your Vercel URL**
   - ✅ Site loads correctly
   - ✅ Music player is visible
   - ✅ Images and audio load

2. **Test Music Player**
   - ✅ Click play on a track
   - ✅ Audio plays
   - ✅ Controls work (pause, next, previous)

3. **Test Gesture Control**
   - ✅ Click "Activate Gesture Control"
   - ✅ Allow camera access
   - ✅ Hand skeleton appears
   - ✅ Gestures control music

4. **Test on Mobile**
   - ✅ Site is responsive
   - ✅ Music player works
   - ✅ Navigation works

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Backend not deploying
- Check Railway logs: Service → "Deployments" → Click latest deployment → "View Logs"
- Verify `requirements.txt` has all dependencies
- Check environment variables are set correctly

**Problem:** MongoDB connection error
- Verify `MONGO_URL` is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Or use Railway's MongoDB plugin

### Frontend Issues

**Problem:** Frontend can't connect to backend
- Check `REACT_APP_BACKEND_URL` is set correctly in Vercel
- Verify backend URL ends without trailing slash
- Check backend CORS settings allow your Vercel domain

**Problem:** Camera not working
- HTTPS is required for camera access (Vercel provides this automatically)
- Check browser permissions
- Try in Chrome/Edge (best MediaPipe support)

**Problem:** Audio files not loading
- Check audio files are in `frontend/public/audio/`
- Verify file paths in `mock.js` are correct
- Check browser console for 404 errors

---

## 🔄 Updating Your Deployment

### Update Backend:
1. Push changes to GitHub
2. Railway auto-deploys from `main` branch
3. Check deployment status in Railway dashboard

### Update Frontend:
1. Push changes to GitHub
2. Vercel auto-deploys from `main` branch
3. Check deployment status in Vercel dashboard

### Manual Redeploy:
- **Railway**: Service → "Deployments" → "Deploy"
- **Vercel**: Project → "Deployments" → "Redeploy"

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `myportfolio.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

### Add Custom Domain to Railway:

1. Go to your service in Railway
2. Click **"Settings"** → **"Networking"**
3. Add custom domain
4. Update DNS records as instructed

---

## 💰 Cost Breakdown

### Free Tier Limits:

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Perfect for this project

**Railway:**
- ✅ $5 free credit/month
- ✅ ~500 hours of uptime
- ✅ Enough for hobby projects
- ⚠️ May need paid plan if traffic is high

**Total Cost:** $0/month for moderate usage!

---

## 📞 Need Help?

If you encounter issues:

1. Check Railway logs for backend errors
2. Check Vercel logs for frontend errors
3. Check browser console for client-side errors
4. Verify all environment variables are set
5. Test backend API directly in browser

---

## ✅ Success Checklist

- [ ] Backend deployed to Railway
- [ ] Backend URL generated
- [ ] MongoDB connected (if using)
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set
- [ ] Site loads correctly
- [ ] Music player works
- [ ] Gesture control works
- [ ] Mobile responsive
- [ ] Custom domain added (optional)

---

**Congratulations! Your Music Portfolio is now live! 🎉**

Share your live URL:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.railway.app`
