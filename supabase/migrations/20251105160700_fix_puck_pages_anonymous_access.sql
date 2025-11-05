/*
  # Fix Puck Pages Anonymous Access

  ## Overview
  Temporarily allows anonymous users to insert, update, and delete puck_pages
  for development and testing purposes.

  ## Changes
  - Drop existing restrictive policies
  - Create new policies that allow anonymous access
  - This is suitable for development but should be restricted in production

  ## Security Note
  This change allows anyone to modify content. In production, you should:
  1. Set up proper authentication, OR
  2. Restrict access to specific users/roles
*/

-- Drop existing restrictive policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can create pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON puck_pages;

-- Allow anonymous users to insert pages
CREATE POLICY "Anyone can create pages"
  ON puck_pages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous users to update pages
CREATE POLICY "Anyone can update pages"
  ON puck_pages FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete pages
CREATE POLICY "Anyone can delete pages"
  ON puck_pages FOR DELETE
  TO anon, authenticated
  USING (true);