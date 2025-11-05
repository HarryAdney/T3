/*
  # Update Puck Pages Security for Editor Role

  ## Overview
  Updates the puck_pages table RLS policies to restrict write access to authenticated
  users with the 'editor' or 'admin' role only. Removes the insecure anonymous access
  policies that were previously in place.

  ## Changes
  1. Drop all existing policies that allow anonymous write access
  2. Keep public read access for published pages
  3. Create new policies that check for 'editor' or 'admin' role
  4. Editors and admins can create, update, and delete pages
  5. Editors and admins can view all pages (including unpublished)

  ## Security Improvements
  - Only authenticated users with proper roles can modify content
  - Anonymous users can still view published pages
  - Unpublished pages are only visible to editors and admins
*/

-- Drop all existing policies on puck_pages
DROP POLICY IF EXISTS "Anyone can create pages" ON puck_pages;
DROP POLICY IF EXISTS "Anyone can update pages" ON puck_pages;
DROP POLICY IF EXISTS "Anyone can delete pages" ON puck_pages;
DROP POLICY IF EXISTS "Public can view published pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can view all pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can create pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can update pages" ON puck_pages;
DROP POLICY IF EXISTS "Authenticated users can delete pages" ON puck_pages;

-- Public (including anonymous) can view published pages
CREATE POLICY "Public can view published pages"
  ON puck_pages FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Editors and admins can view all pages
CREATE POLICY "Editors can view all pages"
  ON puck_pages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  );

-- Editors and admins can create pages
CREATE POLICY "Editors can create pages"
  ON puck_pages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  );

-- Editors and admins can update pages
CREATE POLICY "Editors can update pages"
  ON puck_pages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  );

-- Editors and admins can delete pages
CREATE POLICY "Editors can delete pages"
  ON puck_pages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  );