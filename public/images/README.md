# Local Images Directory

This directory contains all locally stored images for the Thoralby Through Time website.

## Directory Structure

- `hero/` - Homepage carousel images (1920x1080px recommended)
- `gallery/` - Main gallery photographs
- `buildings/` - Historical building photographs
- `people/` - Portrait and people photographs
- `events/` - Historical events and community photos
- `maps/` - Historical and modern maps

## Usage

Images in this directory can be referenced directly in your code:
```typescript
// For React components
const imageUrl = '/images/hero/village-view.jpg';

// For CSS background images
background-image: url('/images/gallery/church-1950.jpg');
```

## File Requirements

- **Hero Images**: 1920x1080px, JPG/WebP, under 2MB
- **Gallery Images**: 800x600px recommended, JPG/WebP, under 1MB
- **Portraits**: 600x600px, JPG/WebP, under 500KB
- **General Content**: Match intended display size, optimized for web

## Performance Tips

- Use WebP format when possible for better compression
- Optimize images before placing in these folders
- Consider creating thumbnail versions for gallery grids
- Ensure descriptive filenames for SEO