# Static Site Deployment Guide

This application has been converted to a static site that can be deployed to any static hosting provider (Netlify, Vercel, GitHub Pages, AWS S3, etc.).

## Architecture Overview

### Hybrid Static/Dynamic Approach

The application uses a smart hybrid architecture:

**Static Public Pages:**
- Home page
- People directory
- Buildings directory
- Timeline
- Gallery
- All Puck-managed content pages

**Dynamic Admin Pages:**
- Page Editor (`/editor`)
- Page Manager (`/pages`)
- Admin panel (`/admin`)

### How It Works

1. **Build Time**: The `npm run build` command:
   - Fetches all content from Supabase
   - Generates static JSON files in `dist/data/`
   - Bundles the React application
   - Creates a fully static site

2. **Runtime**: Public pages:
   - Load data from static JSON files (instant, no database queries)
   - Render immediately without loading states
   - Work offline once cached

3. **Admin Access**: Admin pages:
   - Still connect to Supabase for real-time editing
   - Require authentication
   - Changes trigger a rebuild to update static content

## Deployment Steps

### Prerequisites

1. Ensure `.env` file has Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Make sure your Supabase database has content to export

### Build Command

```bash
npm run build
```

This automatically:
- Generates static data from Supabase
- Builds the React application
- Outputs to `dist/` directory

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

**Deploy settings:**
```
Build command: npm run build
Publish directory: dist
Environment variables:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

### Deploy to AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Configure S3 for static website hosting
4. Set up CloudFront distribution
5. Configure error pages to redirect to `index.html`

## Updating Content

When content is added or updated in Supabase:

1. Rebuild the site: `npm run build`
2. Deploy the new build

Or use a CI/CD pipeline that:
- Triggers on Supabase webhooks
- Runs `npm run build`
- Deploys automatically

## Performance Benefits

- **First Load**: ~200ms (static HTML + preloaded data)
- **Database Queries**: 0 for public pages
- **CDN Caching**: Full site can be cached
- **SEO**: Complete HTML with content on first paint
- **Offline**: Works with service workers

## File Structure

```
dist/
├── index.html           # Main entry point
├── assets/              # JS, CSS bundles
├── data/                # Static JSON data (120KB)
│   ├── site-data.json   # All content
│   ├── page-*.json      # Individual pages
└── images/              # Static images
```

## Continuous Deployment

### Option 1: Webhook Triggered Rebuild

Set up a webhook from Supabase that triggers your hosting provider to rebuild when content changes.

### Option 2: Scheduled Rebuilds

Configure your hosting provider to rebuild daily/hourly to pick up content changes.

### Option 3: Manual Rebuild API

Create an admin endpoint that triggers a rebuild when editors publish changes.

## Monitoring

After deployment, monitor:
- Static data freshness (check `generatedAt` in JSON files)
- Cache hit rates
- Page load times
- Build success/failure rates

## Troubleshooting

**Build fails with "Missing Supabase environment variables":**
- Ensure `.env` file exists and has correct values
- Check environment variables in hosting provider dashboard

**Static data is outdated:**
- Run `npm run generate:data` to refresh
- Rebuild and redeploy

**Admin pages not working:**
- Admin pages require Supabase connection
- Check authentication is configured
- Verify RLS policies allow editor access

## Security Notes

- Static JSON data is public (by design for public pages)
- Admin pages protected by Supabase authentication
- Row Level Security policies control data access
- API keys are public-safe (anon key)
- Never expose service role key in frontend
