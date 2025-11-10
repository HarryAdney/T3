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
    '/images/hero/home-page.webp',
    '/images/hero/bishopdale-valley.webp',
    '/images/hero/west-burton-village-green.webp',
    '/images/hero/bishopdale-beck-1938.webp',
  ],

  // General images for content blocks
  content: [
    '/images/gallery/village-street-historic.jpg', // Historic village street
    '/images/buildings/traditional-cottage.jpg', // Traditional cottage
    '/images/buildings/church-spire-thoralby.jpg', // Church spire
    '/images/gallery/yorkshire-landscape-1960s.jpg', // Yorkshire landscape
  ],

  // Portrait/card images - vertical or square format
  portraits: [
    '/images/people/village-community-1960s.jpg', // Community portrait
    '/images/people/historic-portrait-local.jpg', // Historic local portrait
    '/images/people/traditional-family-photo.jpg', // Traditional family photo
  ],

  // Gallery photos - various sizes
  gallery: [
    {
      title: 'Thoralby Village Green',
      url: '/images/gallery/village-green-1950s.jpg',
      year: 1950,
      location: 'Thoralby',
      tags: ['village', 'green', 'community']
    },
    {
      title: 'Bishopdale Valley View',
      url: '/images/gallery/bishopdale-valley-1970s.jpg',
      year: 1970,
      location: 'Bishopdale',
      tags: ['landscape', 'valley', 'hills']
    },
    {
      title: 'Historic St. Oswald\'s Church',
      url: '/images/buildings/church-exterior-1965.jpg',
      year: 1965,
      location: 'Thoralby',
      tags: ['church', 'heritage', 'architecture']
    },
    {
      title: 'Traditional Yorkshire Farm',
      url: '/images/gallery/farming-1980s.jpg',
      year: 1980,
      location: 'Bishopdale',
      tags: ['farm', 'rural', 'agriculture']
    },
    {
      title: 'River Bishop',
      url: '/images/gallery/river-bishop-1990s.jpg',
      year: 1990,
      location: 'Bishopdale',
      tags: ['river', 'nature', 'water']
    },
    {
      title: 'Village Memorial Hall',
      url: '/images/buildings/memorial-hall-1975.jpg',
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
  '/images/hero/thoralby-village-green.jpg',
  '/images/hero/bishopdale-valley-landscape.jpg',
  '/images/hero/traditional-yorkshire-countryside.jpg',
  '/images/hero/river-bishop-valley-view.jpg',
];`;