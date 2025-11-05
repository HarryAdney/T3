/*
  # Create Puck Pages Table

  ## Overview
  Creates a table to store pages created with Puck visual editor for custom content management.

  ## New Tables

  ### `puck_pages`
  Stores page data created with Puck editor
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Page title
  - `content` (jsonb) - Puck page data structure
  - `published` (boolean) - Whether the page is publicly visible
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on the table
  - Allow public read access for published pages
  - Restrict write access to authenticated users only

  ## Indexes
  - Create index on slug for fast lookups
  - Create index on published status
*/

-- Create puck_pages table
CREATE TABLE IF NOT EXISTS puck_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_puck_pages_slug ON puck_pages(slug);
CREATE INDEX IF NOT EXISTS idx_puck_pages_published ON puck_pages(published);

-- Enable Row Level Security
ALTER TABLE puck_pages ENABLE ROW LEVEL SECURITY;

-- Public can view published pages
CREATE POLICY "Public can view published pages"
  ON puck_pages FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Authenticated users can view all pages
CREATE POLICY "Authenticated users can view all pages"
  ON puck_pages FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert pages
CREATE POLICY "Authenticated users can create pages"
  ON puck_pages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update pages
CREATE POLICY "Authenticated users can update pages"
  ON puck_pages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete pages
CREATE POLICY "Authenticated users can delete pages"
  ON puck_pages FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_puck_pages_updated_at 
  BEFORE UPDATE ON puck_pages
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
