# Project Structure

## Root Directory
- `src/` - Main application source code
- `public/` - Static assets (images, icons)
- `supabase/` - Database migrations and functions
- `Page content (text only)/` - Content files for migration
- Configuration files at root level

## Source Code Organization (`src/`)

### Core Application
- `App.tsx` - Main app component with routing configuration
- `main.tsx` - Application entry point
- `index.css` - Global styles and Tailwind imports
- `vite-env.d.ts` - Vite type definitions

### Components (`src/components/`)
- `Header.tsx` - Main navigation with dropdown menus
- `Footer.tsx` - Site footer
- `Breadcrumbs.tsx` - Navigation breadcrumbs
- `PageWrapper.tsx` - Common page layout wrapper
- `InlineEditor.tsx` - Inline content editing
- `RichTextEditor.tsx` - Rich text editing component
- `auth/ProtectedRoute.tsx` - Route protection for admin areas

### Pages (`src/pages/`)
- Root level: Main site pages (Home, Archive, etc.)
- `admin/` - Administrative interface pages
- `archive/` - Archive section pages
- `townships/` - Township-specific pages organized by location
  - `bishopdale/`, `thoralby/`, `burton-cum-walden/`, `newbiggin/`
  - `DynamicTownship.tsx` - Dynamic township page handler

### Supporting Code
- `contexts/` - React contexts (EditModeContext)
- `hooks/` - Custom React hooks (usePageContent)
- `lib/` - Utility libraries (supabase client)
- `content/` - Static content files

## Static Assets (`public/`)
- `images/` - Organized by category:
  - `hero/` - Hero section images
  - `buildings/`, `events/`, `gallery/`, `maps/`, `people/` - Content images
  - Each folder includes README.md for organization

## Database (`supabase/`)
- `migrations/` - SQL migration files with timestamps
- `functions/` - Serverless functions (password reset)

## Routing Patterns
- `/` - Home page
- `/townships/{slug}` - Township pages
- `/townships/{slug}/industry` - Township industry pages
- `/archive/{category}` - Archive sections
- `/admin/*` - Protected admin routes

## Naming Conventions
- Components: PascalCase (e.g., `Header.tsx`)
- Pages: PascalCase matching component names
- Hooks: camelCase with `use` prefix
- Files: kebab-case for assets, PascalCase for components
- Routes: kebab-case URLs