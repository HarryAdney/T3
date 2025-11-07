/*
  # Seed Static Pages with Initial Content

  1. Purpose
    - Initialize all static pages in the puck_pages table
    - Provides empty but valid Puck content structure for each page
    - Ensures all static pages can be edited immediately
  
  2. Static Pages Seeded
    - Home (/)
    - Bishopdale Valley (/bishopdale-valley)
    - The Four Townships (/four-townships)
    - Timeline (/timeline)
    - Maps (/maps)
    - Gallery (/gallery)
    - Contact (/contact)
  
  3. Notes
    - Uses ON CONFLICT to avoid duplicates
    - Each page starts with empty content array
    - Title is set in root props for Puck editor
*/

INSERT INTO puck_pages (slug, title, content, created_at, updated_at)
VALUES
  (
    'home',
    'Home',
    '{"content":[],"root":{"props":{"title":"Home"}}}',
    now(),
    now()
  ),
  (
    'bishopdale-valley',
    'Bishopdale Valley',
    '{"content":[],"root":{"props":{"title":"Bishopdale Valley"}}}',
    now(),
    now()
  ),
  (
    'four-townships',
    'The Four Townships',
    '{"content":[],"root":{"props":{"title":"The Four Townships"}}}',
    now(),
    now()
  ),
  (
    'timeline',
    'Timeline',
    '{"content":[],"root":{"props":{"title":"Timeline"}}}',
    now(),
    now()
  ),
  (
    'maps',
    'Maps',
    '{"content":[],"root":{"props":{"title":"Maps"}}}',
    now(),
    now()
  ),
  (
    'gallery',
    'Gallery',
    '{"content":[],"root":{"props":{"title":"Gallery"}}}',
    now(),
    now()
  ),
  (
    'contact',
    'Contact',
    '{"content":[],"root":{"props":{"title":"Contact"}}}',
    now(),
    now()
  )
ON CONFLICT (slug) 
DO UPDATE SET
  updated_at = EXCLUDED.updated_at;