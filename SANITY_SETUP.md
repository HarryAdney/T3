# Sanity.io Setup Guide for Thoralby Through Time

## Overview

Your Thoralby Through Time website is now built and ready! This guide will help you set up Sanity Studio so you can start editing content visually without touching any code.

## What You Have Now

✅ **Fully functional React website** with all pages
✅ **Sanity.io integration** configured and ready
✅ **Beautiful, responsive design** matching the original site
✅ **All routes working**: Home, People, Timeline, Archive, Places, etc.

## Next Steps: Setting Up Sanity Studio

### Step 1: Install Sanity CLI

Open your terminal and run:

```bash
npm install -g @sanity/cli
```

### Step 2: Create Sanity Studio Project

```bash
# Create a new directory for your Sanity Studio
mkdir sanity-studio
cd sanity-studio

# Initialize Sanity project
sanity init
```

When prompted:

- **Login**: Use your Sanity.io account
- **Project**: Select your existing project (**xv5k9ssi**)
- **Dataset**: Use `production`
- **Project output path**: `.` (current directory)
- **Template**: Choose "Clean project"

### Step 3: Create Schemas

Create a `schemas` folder and add these files:

#### `schemas/person.js`

```javascript
export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'text'
    },
    {
      name: 'birthDate',
      title: 'Birth Date',
      type: 'date'
    },
    {
      name: 'deathDate',
      title: 'Death Date',
      type: 'date'
    },
    {
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
```

#### `schemas/place.js`

```javascript
export default {
  name: 'place',
  title: 'Place',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Place Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'historicalSignificance',
      title: 'Historical Significance',
      type: 'text'
    },
    {
      name: 'placeImage',
      title: 'Place Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number'
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number'
    }
  ]
}
```

#### `schemas/photo.js`

```javascript
export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'datePhotographed',
      title: 'Date Photographed',
      type: 'date'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'place'}]
    }
  ]
}
```

#### `schemas/timelineEntry.js`

```javascript
export default {
  name: 'timelineEntry',
  title: 'Timeline Entry',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'relatedPeople',
      title: 'Related People',
      type: 'array',
      of: [{
        type: 'reference',
        to: {type: 'person'}
      }]
    },
    {
      name: 'relatedEvents',
      title: 'Related Events',
      type: 'array',
      of: [{
        type: 'reference',
        to: {type: 'event'}
      }]
    }
  ]
}
```

#### `schemas/event.js`

```javascript
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: {type: 'place'}
    }
  ]
}
```

#### `schemas/index.js`

```javascript
import person from './person'
import place from './place'
import photo from './photo'
import event from './event'
import timelineEntry from './timelineEntry'

export const schemaTypes = [person, place, photo, event, timelineEntry]
```

### Step 4: Update sanity.config.js

```javascript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Thoralby Through Time',

  projectId: 'xv5k9ssi',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

### Step 5: Update Frontend Environment Variables

Once you provide your Sanity API token, update `/app/frontend/.env.local`:

```
REACT_APP_SANITY_PROJECT_ID=xv5k9ssi
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2024-05-08
REACT_APP_SANITY_TOKEN=your_token_here
```

Then restart the frontend:

```bash
sudo supervisorctl restart frontend
```

### Step 6: Start Sanity Studio

```bash
cd sanity-studio
sanity start
```

Your Sanity Studio will open at `http://localhost:3333`

### Step 7: Deploy Sanity Studio (Optional)

To make it accessible online:

```bash
sanity deploy
```

## How to Add Content

### Adding People

1. Go to Sanity Studio
2. Click "Person" in the sidebar
3. Click "Create new"
4. Fill in the fields:
   - Name (required)
   - Biography
   - Birth/Death dates
   - Upload portrait image
5. Click "Publish"

### Adding Photos

1. Click "Photo" in sidebar
2. Create new entry
3. Upload image
4. Add title and description
5. Select location (if you've added places)
6. Publish

### Adding Timeline Entries

1. Click "Timeline Entry"
2. Add date, title, description
3. Link to related people/events
4. Publish

## Troubleshooting

### Content not showing on website?

- Make sure you clicked "Publish" in Sanity Studio (not just save)
- Check browser console for errors
- Verify API token is correct in `.env.local`

### Can't connect to Sanity?

- Verify project ID is correct: `xv5k9ssi`
- Check that dataset is `production`
- Ensure API token has read permissions

## CORS Configuration

If you see CORS errors:

1. Go to <https://www.sanity.io/manage>
2. Select your project
3. Go to Settings → API
4. Add CORS origin: `http://localhost:3000`
5. Enable credentials

## What's Next?

✅ **Set up Sanity Studio** (follow steps above)
✅ **Add your API token** to `.env.local`
✅ **Start adding content** through Sanity Studio
✅ **View your content** live on the website

The website will automatically fetch and display your content from Sanity in real-time!

---

**Need Help?**

- Sanity Documentation: <https://www.sanity.io/docs>
- Your Project Dashboard: <https://www.sanity.io/manage/personal/project/xv5k9ssi>
