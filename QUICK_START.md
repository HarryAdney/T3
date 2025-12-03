# 🚀 Quick Start Guide - Thoralby Through Time

## ✅ What's Already Done

Your website is **100% built and ready**! Here's what you have:

- ✅ Full React website with 9 pages
- ✅ Sanity.io integration configured
- ✅ Sanity Studio schemas created
- ✅ Responsive design with hamburger menu
- ✅ All ready for deployment

## 📝 Next Steps (5 minutes)

### Step 1: Get Your Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project (xv5k9ssi)
3. Click **"API"** in the left sidebar
4. Scroll to **"Tokens"** section
5. Click **"Add API token"**
6. Name: `Production Token`
7. Permissions: **Editor**
8. Click **Save** and **copy the token**

### Step 2: Add Token to Your Project

Open `/app/frontend/.env.local` and add your token:

```
REACT_APP_SANITY_PROJECT_ID=xv5k9ssi
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2024-05-08
REACT_APP_SANITY_TOKEN=paste_your_token_here
```

Then restart frontend:
```bash
sudo supervisorctl restart frontend
```

### Step 3: Start Sanity Studio

```bash
cd /app/sanity-studio
npm run dev
```

Sanity Studio will open at: http://localhost:3333

### Step 4: Add Your First Content

In Sanity Studio (http://localhost:3333):

1. Click **"Person"** in the sidebar
2. Click **"Create new"**
3. Fill in:
   - Name: `Penny Ellis`
   - Biography: `Born at Holmeside Farm in Thoralby...`
   - Upload a portrait photo
4. Click **"Publish"**

Refresh your website and see the content appear!

### Step 5: Deploy Your Website

1. Click **"Deploy"** button in Emergent
2. Click **"Deploy Now"**
3. Wait 10-15 minutes
4. Get your live URL!

### Step 6: Deploy Sanity Studio (Optional)

Make your Studio accessible online:

```bash
cd /app/sanity-studio
npm run deploy
```

Choose a hostname like: `thoralby-studio`

Your Studio will be at: `https://thoralby-studio.sanity.studio`

## 🎨 Adding Different Content Types

### Add a Place
1. Click **"Place"** → **"Create new"**
2. Fill in name, description, upload image
3. Add latitude/longitude if you have it
4. **Publish**

### Add a Photo
1. Click **"Photo"** → **"Create new"**
2. Upload the image
3. Add title and description
4. Link to a location (if you've created places)
5. **Publish**

### Add a Timeline Entry
1. Click **"Timeline Entry"** → **"Create new"**
2. Set the date
3. Add title and description
4. Link to related people/events/places
5. **Publish**

## 📱 Your Website URLs

- **Local Frontend**: http://localhost:3000
- **Local Sanity Studio**: http://localhost:3333
- **After Deployment**: `https://your-app.emergent.sh`

## 🆘 Troubleshooting

### Content Not Showing?
- Make sure you clicked **"Publish"** not just "Save"
- Check that your API token is added to `.env.local`
- Restart frontend: `sudo supervisorctl restart frontend`

### Can't Access Sanity Studio?
```bash
cd /app/sanity-studio
npm run dev
```

### CORS Errors?
1. Go to https://www.sanity.io/manage
2. Select your project → Settings → API
3. Add CORS origin: `http://localhost:3000`
4. After deployment, add your live URL too

## 💡 Tips for Non-Technical Editors

Sanity Studio is designed for **non-coders**:
- **Drag & drop** to upload images
- **Click and type** to add text
- **Link items** by selecting from dropdowns
- **Preview** before publishing
- **No coding required!**

## 🎯 Ready to Go!

You're all set! Your historical archive website is ready to:
1. ✅ Add content through Sanity Studio
2. ✅ Deploy to the internet
3. ✅ Share with the world

**Need help?** Check `/app/SANITY_SETUP.md` for detailed documentation.
