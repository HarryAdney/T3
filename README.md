# Thoralby Through Time -- 1

A clean, static React website dedicated to preserving and sharing the rich history of Thoralby and the surrounding Bishopdale area in North Yorkshire, England.

## About

Thoralby Through Time is a heritage website showcasing the history of this Yorkshire Dales village. The site features historical information, photographs, timelines, and community resources.

## Features

- **Home Page**: Attractive hero section with rotating historical images
- **People & Families**: Directory of individuals who shaped Thoralby's history (coming soon)
- **Buildings & Places**: Historic architecture and landmarks (coming soon)
- **Historical Timeline**: Journey through centuries of local events (coming soon)
- **Photo Archive**: Browse historical photographs with search functionality
- **Maps & Geography**: Historical and modern maps (coming soon)
- **Contact**: Get in touch with the community

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS with custom heritage-focused design system
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React

## Design Philosophy

The application features a heritage-focused design with:

- Warm, earthy color palette (sage, parchment, stone tones)
- Serif typography for headings to evoke historical character
- Sepia overlay effects on historical images
- Subtle animations and transitions for modern user experience
- Fully responsive design for all device sizes

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

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The built site (in the `dist/` directory) is completely static and can be deployed to any static hosting provider:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN or web server

Simply upload the contents of the `dist/` folder after running `npm run build`.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Breadcrumbs.tsx
│   └── PageWrapper.tsx
├── pages/           # Page-level components
│   ├── Home.tsx
│   ├── People.tsx
│   ├── Buildings.tsx
│   ├── Timeline.tsx
│   ├── Maps.tsx
│   ├── Gallery.tsx
│   └── Contact.tsx
└── index.css        # Global styles and Tailwind config

public/
└── images/          # Static images
    └── hero/        # Hero section images
```

## Customization

### Adding Content

Content is currently hardcoded in the respective page components. To add or modify content:

1. Navigate to the appropriate page in `src/pages/`
2. Update the data arrays or content sections
3. The site will hot-reload in development mode

### Styling

The site uses a custom Tailwind configuration with heritage-appropriate colors:

- **sage**: Green tones inspired by Yorkshire landscapes
- **parchment**: Warm, aged paper tones
- **stone**: Neutral grays and browns

Colors are defined in `tailwind.config.js` and can be customized there.

## Future Enhancements

Potential additions for future development:

- Content Management System integration
- Database-backed content
- User authentication for content contributions
- Advanced search functionality
- Interactive maps with historical overlays
- Timeline visualization
- Family tree diagrams

## License

This project is dedicated to preserving local history for the community.

## Contact

For questions or to contribute content, please visit the Contact page on the website.
