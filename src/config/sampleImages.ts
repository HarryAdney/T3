/**
 * Sample Images Configuration
 *
 * This file contains sample image URLs for demonstration purposes.
 * Replace these with your own image URLs for production use.
 *
 * All URLs are currently placeholder/example URLs that you should replace
 * with actual images of Thoralby, Bishopdale, or your local area.
 */

interface GalleryItem {
  title: string;
  url: string;
  year: number;
  location: string;
  tags: string[];
}

export const sampleImages: {
  hero: string[];
  content: string[];
  portraits: string[];
  gallery: GalleryItem[];
} = {
  // Hero carousel images - landscape views
  hero: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Mountain landscape
    'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Countryside
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // English countryside
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Valley view
  ],

  // General images for content blocks
  content: [
    'https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Village street
    'https://images.unsplash.com/photo-1508264165352-258a6bf6cae9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Historic building
    'https://images.unsplash.com/photo-1547038577-da80d01f3a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Church spire
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Yorkshire landscape
  ],

  // Portrait/card images - vertical or square format
  portraits: [
    'https://images.unsplash.com/photo-1594736797933-d0d6b8b0d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Portrait format
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Historic portrait
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Square crop
  ],

  // Gallery photos - various sizes
  gallery: [
    {
      title: 'Thoralby Village Green',
      url: 'https://images.unsplash.com/photo-1569125670911-83e7e2c82db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1950,
      location: 'Thoralby',
      tags: ['village', 'green', 'community']
    },
    {
      title: 'Bishopdale Valley View',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1970,
      location: 'Bishopdale',
      tags: ['landscape', 'valley', 'hills']
    },
    {
      title: 'Historic St. Oswald\'s Church',
      url: 'https://images.unsplash.com/photo-1547038577-da80d01f3a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1965,
      location: 'Thoralby',
      tags: ['church', 'heritage', 'architecture']
    },
    {
      title: 'Traditional Yorkshire Farm',
      url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1980,
      location: 'Bishopdale',
      tags: ['farm', 'rural', 'agriculture']
    },
    {
      title: 'River Bishop',
      url: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1990,
      location: 'Bishopdale',
      tags: ['river', 'nature', 'water']
    },
    {
      title: 'Village Memorial Hall',
      url: 'https://images.unsplash.com/photo-1587588354456-ae376af71a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      year: 1975,
      location: 'Thoralby',
      tags: ['community', 'building', 'memorial']
    }
  ]
};

/**
 * Helper function to get a random image from a category
 */
export function getRandomImage(category: keyof typeof sampleImages): string {
  const images = sampleImages[category];
  if (Array.isArray(images)) {
    if (category === 'gallery') {
      const galleryItem = images[Math.floor(Math.random() * images.length)] as GalleryItem;
      return galleryItem.url;
    }
    return images[Math.floor(Math.random() * images.length)] as string;
  }
  return '';
}

/**
 * Helper function to get a random gallery item
 */
export function getRandomGalleryItem() {
  const items = sampleImages.gallery;
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Default configuration for the home page hero images
 * Copy this to src/pages/Home.tsx heroImages array
 */
export const homePageHeroConfig = `const heroImages: string[] = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
];`;