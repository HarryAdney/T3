# Custom Images Guide for Thoralby Through Time

This guide explains how to replace the default Pexels images with your own custom images throughout the Thoralby Through Time website.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Adding Hero Images to Home Page](#adding-hero-images-to-home-page)
4. [Using Puck Editor for Custom Content](#using-puck-editor-for-custom-content)
5. [Image Upload and Management](#image-upload-and-management)
6. [Gallery Integration](#gallery-integration)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Overview

The Thoralby Through Time website has been updated to support custom images instead of relying on Pexels. You have several options for managing images:

- **Hardcoded Hero Images**: Replace the hero carousel on the home page
- **Puck Editor Components**: Use editable image components for custom pages
- **Image Upload System**: Upload images directly through the interface
- **Gallery System**: Add images to the main photograph collection

## Quick Start

### Option 1: Replace Hero Images (Fastest)

1. Open `src/pages/Home.tsx`
2. Find the `heroImages` array (around line 8)
3. Replace the commented URLs with your image URLs
4. Save and rebuild the site

```typescript
const heroImages: string[] = [
  'https://your-domain.com/images/thoralby-village-1.jpg',
  'https://your-domain.com/images/bishopdale-landscape-2.jpg',
  'https://your-domain.com/images/historical-building-3.jpg',
  'https://your-domain.com/images/valley-view-4.jpg',
];
```

### Option 2: Use Puck Editor (Recommended)

1. Log in to the admin interface
2. Navigate to the Page Manager
3. Edit any page using the visual editor
4. Add or modify Image components
5. Enter your image URLs or upload images directly

## Adding Hero Images to Home Page

The home page features a rotating hero image carousel. To customize it:

1. **Prepare Your Images**:
   - Recommended size: 1920x1080px (16:9 aspect ratio)
   - Format: JPG or WebP
   - File size: Under 2MB for best performance
   - Content: Landscape views of Thoralby, Bishopdale, or historical scenes

2. **Upload Images** to your preferred hosting service:
   - Your own web server
   - Cloud storage (AWS S3, Google Cloud Storage)
   - CDN service
   - Supabase Storage (if using the included setup)

3. **Update the Code**:

   ```typescript
   const heroImages: string[] = [
     'https://your-domain.com/images/hero-1.jpg',
     'https://your-domain.com/images/hero-2.jpg',
     'https://your-domain.com/images/hero-3.jpg',
     'https://your-domain.com/images/hero-4.jpg',
   ];
   ```

4. **Test the Changes**:
   - Start the development server
   - Navigate to the home page
   - Verify images load correctly
   - Check the carousel functionality

## Using Puck Editor for Custom Content

The site uses Puck for visual content editing. Here's how to use image components:

### ImageBlock Component

- **Purpose**: Single image with optional caption
- **Location**: Use in any Puck-editable page
- **Fields**:
  - Image URL (required)
  - Alt text (required for accessibility)
  - Caption (optional)

### Hero Component

- **Purpose**: Full-width hero section with background image
- **Location**: Page headers and feature sections
- **Fields**:
  - Title
  - Description
  - Image URL (background image)

### CardGrid Component

- **Purpose**: Grid of cards with optional images
- **Location**: Feature sections and content galleries
- **Fields**:
  - Grid title
  - Card array with title, description, and optional image

### How to Edit Images in Puck:


1. **Access the Editor**:
   - Go to `/admin` in your browser
   - Log in with editor credentials
   - Select "Page Manager"

2. **Edit a Page**:
   - Click "Edit" next to any page
   - The Puck editor will load

3. **Add/Edit Image Components**:
   - Drag "Image Block", "Hero", or "Card Grid" from the component panel
   - Fill in the image URL field
   - Add descriptive alt text
   - Add captions if needed

4. **Use the Image Upload Feature**:
   - Click "Upload Image" in any image field
   - Select an image file from your device
   - The image will be previewed and URL will be auto-filled
   - Note: This creates a local URL for development; for production, you need a file storage service

## Image Upload and Management

### Development vs Production


**Development (Current Setup)**:
- Image upload creates local blob URLs
- Images are temporary and lost on page refresh
- Good for testing and development

**Production (Recommended Setup)**:
- Integrate with Supabase Storage or similar service
- Images are permanently stored and served via CDN
- Provides better performance and reliability

### Setting Up Supabase Storage (Recommended)


1. **Create Storage Bucket**:
   ```sql
   -- Run in Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('images', 'images', true);
   ```

2. **Update RLS Policies**:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access" ON storage.objects
   FOR SELECT USING (bucket_id = 'images');

   -- Allow authenticated uploads
   CREATE POLICY "Authenticated Upload" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
   ```

3. **Update ImageUploader Component**:
   - Modify `src/components/ImageUploader.tsx` to use Supabase Storage
   - Add upload progress indicators
   - Handle upload errors gracefully

### Alternative Storage Solutions


- **AWS S3**: Enterprise-grade object storage
- **Google Cloud Storage**: Integrated with Google services
- **Cloudinary**: Optimized for images and videos
- **Imgix**: Advanced image processing and delivery

## Gallery Integration

The main gallery (`/gallery`) pulls images from the `photographs` table in Supabase. To add your own images:

### Method 1: Direct Database Entry

1. Go to Supabase Dashboard
2. Navigate to Table Editor > photographs
3. Click "Insert" > "Insert row"
4. Fill in the fields:
   - `title`: Descriptive title for the image
   - `description`: Optional detailed description
   - `image_url`: Direct URL to your image
   - `thumbnail_url`: Optional smaller version for grid view
   - `photo_year`: Year the photo was taken
   - `location`: Where the photo was taken
   - `tags`: Array of relevant tags
   - `contributor`: Your name or organization

### Method 2: Use the Contribution System

1. Implement the contact form to accept image submissions
2. Set up moderation workflow
3. Approved submissions appear in the gallery

## Best Practices

### Image Optimization

- **Format**: Use WebP for best compression, fallback to JPEG
- **Size**: Optimize images before uploading
- **Dimensions**: Match intended display size
- **Alt Text**: Always provide descriptive alt text for accessibility

### Performance

- **CDN**: Use a Content Delivery Network for faster loading
- **Lazy Loading**: Images load only when needed
- **Thumbnails**: Generate smaller versions for gallery grids
- **Progressive Loading**: Use low-quality placeholders

### SEO and Accessibility

- **Descriptive Names**: Use meaningful filenames
- **Alt Text**: Describe the image content for screen readers
- **Captions**: Provide context when helpful
- **Schema Markup**: Consider adding structured data for historical images

### File Organization

```
/images
  /hero          # Homepage carousel images
  /gallery       # Gallery photographs
  /buildings     # Historical building photos
  /people        # Portrait photos
  /events        # Event and historical photos
  /maps          # Historical and modern maps
```

## Troubleshooting

### Common Issues


**Images Not Loading**:
- Check URL correctness
- Verify CORS settings on your storage service
- Ensure images are publicly accessible

**Upload Not Working**:
- Check browser console for errors
- Verify file size limits (currently 5MB)
- Ensure supported image format

**Performance Issues**:
- Optimize image file sizes
- Use appropriate image dimensions
- Consider implementing lazy loading

**Puck Editor Issues**:
- Clear browser cache
- Check network connectivity
- Verify all required fields are filled

### Getting Help


1. **Check Browser Console**: Look for JavaScript errors
2. **Network Tab**: Verify image requests are successful
3. **Image URLs**: Test URLs directly in browser
4. **Documentation**: Refer to Puck.js documentation for editor-specific issues

### Support Resources


- **Puck Documentation**: https://measured.io/puck/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Supabase Documentation**: https://supabase.com/docs

---

## Next Steps

After setting up your images:

1. **Test Thoroughly**: Check all image components and pages
2. **Optimize Performance**: Implement image optimization if needed
3. **Set Up Monitoring**: Track image loading performance
4. **Create Backup Strategy**: Ensure image preservation
5. **Plan for Growth**: Consider scaling storage as collection grows

Remember to regularly backup your images and maintain proper documentation of your image sources and permissions.