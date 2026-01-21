# Technology Stack

## Frontend Framework
- **React 18** with TypeScript for type safety
- **React Router v7** for client-side routing
- **Vite** as build tool and development server

## Styling & UI
- **Tailwind CSS** with custom heritage-focused design system
- **Framer Motion** for animations and transitions
- **Lucide React** for consistent iconography
- Custom color palette: sage (greens), parchment (warm tones), stone (neutrals)
- Typography: Lora serif for headings, Inter sans-serif for body text

## Backend & Database
- **Supabase** for authentication, database, and storage
- PostgreSQL database with Row Level Security (RLS)
- Real-time subscriptions for live content updates

## Content Management
- **React Quill** for rich text editing
- **Quill.js** as the underlying editor
- Custom inline editing components for authenticated users

## Additional Libraries
- **date-fns** for date manipulation
- **Fuse.js** for fuzzy search functionality
- **Leaflet** with React Leaflet for interactive maps

## Development Tools
- **ESLint** with TypeScript and React plugins
- **PostCSS** with Autoprefixer
- **TypeScript** with strict mode enabled

## Common Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:5173)
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Dependencies
npm install          # Install all dependencies
```

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Deployment
Static site deployment to any CDN or hosting provider. Built files are generated in `dist/` directory.