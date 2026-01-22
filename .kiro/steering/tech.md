---
inclusion: always
---

# Technology Stack & Development Guidelines

## Core Technologies

### Frontend Framework

- **React 18** with TypeScript - Use functional components with hooks
- **React Router v7** - Use `createBrowserRouter` for routing configuration
- **Vite** - Development server runs on `http://localhost:5173`

### Styling & UI Standards

- **Tailwind CSS** with custom heritage design system
- **Framer Motion** for page transitions and subtle animations
- **Lucide React** for all icons - import specific icons, not the entire library
- **Color Palette**: Use CSS custom properties defined in `index.css`
  - Sage (greens): `--sage-50` to `--sage-900`
  - Parchment (warm tones): `--parchment-50` to `--parchment-900`
  - Stone (neutrals): `--stone-50` to `--stone-900`
- **Typography**: Lora serif for headings, Inter sans-serif for body text

### Backend & Database

- **Supabase** - All database operations, authentication, and file storage
- **PostgreSQL** with Row Level Security (RLS) - Always respect RLS policies
- **Real-time subscriptions** for live content updates in admin interface

## Code Style & Conventions

### TypeScript Standards

- Use strict mode - all types must be explicitly defined
- Prefer interfaces over types for object shapes
- Use proper return types for all functions
- Import types with `import type` syntax when possible

### React Patterns

- Use functional components with hooks exclusively
- Custom hooks should start with `use` prefix
- Context providers should be wrapped in `PageWrapper` when needed
- Use `React.memo()` for performance optimization when appropriate

### Component Architecture

- **Pages**: Top-level route components in `src/pages/`
- **Components**: Reusable UI components in `src/components/`
- **Hooks**: Custom logic in `src/hooks/`
- **Contexts**: Global state in `src/contexts/`
- **Lib**: Utilities and external service clients in `src/lib/`

### Supabase Integration

- Use the client from `src/lib/supabase.ts`
- Always handle authentication state properly
- Use RLS policies instead of client-side filtering
- Prefer server-side filtering and pagination

### Content Management

- **React Quill** for rich text editing with custom toolbar
- **Inline editing** components for authenticated users
- Content should be stored in Supabase `pages` and `townships` tables

## Development Workflow

### Commands

```bash
npm run dev          # Development server
npm run typecheck    # TypeScript validation
npm run lint         # ESLint checking
npm run build        # Production build
npm run preview      # Preview production build
```

### Environment Setup

Required environment variables:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

### Testing & Quality

- Run `npm run typecheck` before committing
- Fix all ESLint warnings and errors
- Test authentication flows in incognito mode
- Verify responsive design on mobile devices

## Architecture Patterns

### Authentication

- Use `ProtectedRoute` component for admin areas
- Check authentication state with Supabase auth helpers
- Implement proper logout and session management

### Data Fetching

- Use React Query or SWR for server state management when needed
- Implement loading and error states for all async operations
- Use Supabase real-time subscriptions for live updates

### Performance

- Lazy load route components with `React.lazy()`
- Optimize images with proper formats (WebP, AVIF)
- Use Tailwind's purge configuration for smaller CSS bundles

### Error Handling

- Implement error boundaries for component error catching
- Handle Supabase errors gracefully with user-friendly messages
- Log errors appropriately for debugging

## Additional Libraries

- **date-fns** for date manipulation
- **Fuse.js** for fuzzy search functionality
- **Leaflet** with React Leaflet for interactive maps

## Deployment

- Static site deployment to CDN or hosting provider
- Built files generated in `dist/` directory
- Ensure environment variables are configured in production
