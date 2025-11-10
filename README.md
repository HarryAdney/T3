# Thoralby Through Time

A community heritage website dedicated to preserving and sharing the rich history of Thoralby and the surrounding Bishopdale area in North Yorkshire, England.

## About

Thoralby Through Time is a digital archive that brings together historical photographs, documents, maps, personal stories, and records that tell the tale of this Yorkshire Dales village. The project aims to preserve local history for future generations while making it accessible to the community and visitors.

## Features

- **People & Families**: Explore biographies and family connections of individuals who shaped Thoralby's history
- **Buildings & Places**: Interactive maps and detailed information about historic architecture and landmarks
- **Historical Timeline**: Journey through centuries of events organized by decade and category
- **Photo Archive**: Browse and search a growing collection of historical photographs with detailed metadata
- **Maps & Geography**: Compare historical and modern maps to see how the landscape has evolved
- **Community Contributions**: Submit your own stories, photographs, and documents to help grow the archive

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Static Generation**: Build-time data fetching with static JSON files
- **Maps**: Leaflet with React Leaflet
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Search**: Fuse.js for fuzzy search

## Static Site Architecture

This application uses a hybrid static/dynamic approach:

- **Public Pages** (Home, People, Buildings, Timeline, Gallery, Puck Pages): Use pre-generated static JSON data fetched from Supabase at build time
- **Admin Pages** (Editor, Page Manager, Admin): Connect directly to Supabase for real-time data management
- **Benefits**: Fast page loads, reduced database queries, better SEO, CDN-friendly

### Build-Time Data Generation

During the build process (`npm run build`), the application:

1. Connects to Supabase using credentials from `.env`
2. Fetches all content (people, buildings, events, photographs, puck pages)
3. Generates static JSON files in `public/data/`
4. These files are included in the production build at `dist/data/`

The frontend loads data from these JSON files using the `useStaticData` hook, providing instant page loads without database queries.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Type check
npm run typecheck

# Build for production (automatically generates static data first)
npm run build

# Preview production build
npm run preview
```

To manually regenerate static data without building:

```bash
npm run generate:data
```

This will fetch the latest content from Supabase and update the JSON files in `public/data/`.

## Database Schema

The application uses Supabase with the following main tables:

- `people` - Biographical information about individuals
- `buildings` - Historic buildings and places with geographic coordinates
- `events` - Timeline events with categories and dates
- `photographs` - Photo archive with metadata and tagging
- `maps` - Historical and modern map collection
- `contributions` - User-submitted content for moderation
- `relationships` - Family connections between people
- `event_people` - Links people to historical events
- `building_photos` - Associates photographs with buildings

All tables use Row Level Security (RLS) for data protection, with public read access for historical content and controlled write access for contributions.

## Design Philosophy

The application features a heritage-focused design with:

- Warm, earthy color palette (sage, parchment, stone tones)
- Serif typography for headings to evoke historical character
- Sepia overlay effects on historical images
- Subtle animations and transitions for modern user experience
- Fully responsive design for all device sizes

## Contributing

We welcome contributions from the community! You can:

1. Submit stories, photographs, or documents through the Contribute page
2. Report issues or suggest features via GitHub Issues
3. Contribute code improvements via Pull Requests

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page-level components
├── lib/             # Utilities and Supabase client
└── index.css        # Global styles and Tailwind config

supabase/
└── migrations/      # Database migration files
```

## License

This project is dedicated to preserving local history for the community.

## Contact

For questions or to contribute content, please visit the About page on the website.
