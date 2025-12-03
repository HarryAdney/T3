# Thoralby Through Time - Sanity Studio

This is the Sanity Studio for managing content for the Thoralby Through Time historical archive website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The studio will be available at http://localhost:3333

## Deploy

To deploy the studio to Sanity's hosted platform:

```bash
npm run deploy
```

Choose a unique studio hostname when prompted.

## Project Details

- **Project ID**: xv5k9ssi
- **Dataset**: production

## Content Types

- **Person**: Biographical information about people from Thoralby
- **Place**: Historic buildings and locations
- **Photo**: Historical photographs and images
- **Event**: Historical events
- **Timeline Entry**: Chronological entries for the timeline

## Getting Your API Token

1. Go to https://www.sanity.io/manage/personal/project/xv5k9ssi
2. Click "API" in the sidebar
3. Scroll to "Tokens"
4. Click "Add API token"
5. Name it "Production Token"
6. Select "Editor" permissions
7. Copy the token and add it to your frontend `.env.local` file
