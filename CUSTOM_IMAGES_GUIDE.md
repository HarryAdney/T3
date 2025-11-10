# Custom Images Guide for Thoralby Through Time

This guide explains how to store and manage your own local images in the Thoralby Through Time website.

## Table of Contents

1. [Overview](#overview)
2. [Local Storage Structure](#local-storage-structure)
3. [Quick Start](#quick-start)
4. [Adding Images to Directories](#adding-images-to-directories)
5. [Using Puck Editor for Custom Content](#using-puck-editor-for-custom-content)
6. [Image Upload and Management](#image-upload-and-management)
7. [Gallery Integration](#gallery-integration)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Overview

The Thoralby Through Time website now supports local image storage for better control and performance. Images are stored in organized directories within the `public/images/` folder:

- **Local Hero Images**: Homepage carousel images stored locally
- **Puck Editor Components**: Use editable image components for custom pages
- **Image Upload System**: Upload images directly through the interface
- **Gallery System**: Add images to the main photograph collection

## Local Storage Structure

The website now uses a well-organized local image storage structure in the `public/images/` directory:

```
public/images/
├── README.md                 # This guide
├── hero/                     # Homepage carousel images
│   └── README.md
├── gallery/                  # Main gallery photographs
│   └── README.md
├── buildings/                # Historical building photos
│   └── README.md
├── people/                   # Portrait and people photos
│   └── README.md
├── events/                   # Historical events and community photos
│   └── README.md
└── maps/                     # Historical and modern maps
    └── README.md
```

### Image Directory Specifications

- **hero/**: 1920x1080px images for homepage carousel
- **gallery/**: 800x600px images for main photograph collection
- **buildings/**: 800x600px historical building photographs
- **people/**: 600x600px portrait and community photos
- **events/**: 800x600px community events and historical gatherings
- **maps/**: 800x600px or 1200x800px historical and modern maps

## Quick Start

### Option 1: Add Local Hero Images (Fastest)

1. Add your images to the `public/images/hero/` directory
2. Name them according to the examples in the hero/README.md
3. The configuration in `src/config/sampleImages.ts` has been updated with local paths
4. Save and rebuild the site

```typescript
// Current configuration uses local paths
const heroImages: string[] = [
  '/images/hero/thoralby-village-green.jpg',
  '/images/hero/bishopdale-valley-landscape.jpg',
  '/images/hero/traditional-yorkshire-countryside.jpg',
  '/images/hero/river-bishop-valley-view.jpg',
];
```

### Option 2: Use Puck Editor (Recommended)

1. Log in to the admin interface
2. Navigate to the Page Manager
3. Edit any page using the visual editor
4. Add or modify Image components
5. Enter your local image paths (e.g., `/images/hero/your-image.jpg`) or upload images

## Adding Images to Directories

### Step 1: Prepare Your Images

1. Optimize your images according to the specifications in each directory's README.md
2. Use descriptive, SEO-friendly filenames
3. Ensure images are in JPG or WebP format

### Step 2: Add Images to Directories

1. **Hero Images**: Place in `public/images/hero/`
   - Example: `thoralby-village-green.jpg`
   - Size: 1920x1080px, under 2MB

2. **Gallery Images**: Place in `public/images/gallery/`
   - Example: `church-exterior-1965.jpg`
   - Size: 800x600px, under 1MB

3. **Building Images**: Place in `public/images/buildings/`
   - Example: `traditional-cottage.jpg`
   - Size: 800x600px, under 1MB

4. **People Images**: Place in `public/images/people/`
   - Example: `village-community-1960s.jpg`
   - Size: 600x600px, under 500KB

5. **Event Images**: Place in `public/images/events/`
   - Example: `village-fete-1975.jpg`
   - Size: 800x600px, under 1MB

6. **Map Images**: Place in `public/images/maps/`
   - Example: `bishopdale-1900-ordnance-survey.jpg`
   - Size: 800x600px or 1200x800px, under 1MB

### Step 3: Update Configuration (if needed)

The image configuration in `src/config/sampleImages.ts` has been pre-configured with local paths that match the recommended filenames above. Simply add your images with the specified names, or update the configuration with your preferred filenames.

### Step 4: Test the Changes

- Start the development server: `npm run dev`
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

### How to Edit Images in Puck

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

- **Puck Documentation**: <https://measured.io/puck/>
- **React Documentation**: <https://react.dev/>
- **Tailwind CSS**: <https://tailwindcss.com/>
- **Supabase Documentation**: <https://supabase.com/docs>

---

## Next Steps

After setting up your images:

1. **Test Thoroughly**: Check all image components and pages
2. **Optimize Performance**: Implement image optimization if needed
3. **Set Up Monitoring**: Track image loading performance
4. **Create Backup Strategy**: Ensure image preservation
5. **Plan for Growth**: Consider scaling storage as collection grows

Remember to regularly backup your images and maintain proper documentation of your image sources and permissions.
