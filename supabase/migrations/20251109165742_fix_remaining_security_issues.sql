/*
  # Fix Remaining Security Issues

  1. Remove Unused Indexes
    - Drop the foreign key indexes that were added but are not being used:
      - `idx_building_photos_photograph_id`
      - `idx_event_people_person_id`
      - `idx_relationships_related_person_id`

  2. Fix Multiple Permissive Policies
    - Remove duplicate policies on puck_pages and user_profiles
    - Consolidate into single comprehensive policies

  3. Notes
    - Leaked Password Protection can only be enabled via Supabase Dashboard
    - This is not configurable via SQL migrations
*/

-- 1. Remove unused foreign key indexes that were just created
DROP INDEX IF EXISTS idx_building_photos_photograph_id;
DROP INDEX IF EXISTS idx_event_people_person_id;
DROP INDEX IF EXISTS idx_relationships_related_person_id;

-- 2. Fix multiple permissive policies on puck_pages
-- Drop all existing SELECT policies
DROP POLICY IF EXISTS "Public can view published pages" ON puck_pages;
DROP POLICY IF EXISTS "Editors can view all pages" ON puck_pages;
DROP POLICY IF EXISTS "Pages view policy" ON puck_pages;

-- Create a single consolidated SELECT policy for puck_pages
CREATE POLICY "Pages view policy"
  ON puck_pages FOR SELECT
  TO anon, authenticated
  USING (
    -- Anonymous and authenticated users can see published pages
    published = true
    OR
    -- Editors and admins can see all pages
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  );

-- 3. Fix multiple permissive policies on user_profiles
-- Drop old conflicting policies
DROP POLICY IF EXISTS "Allow authenticated reads" ON user_profiles;
DROP POLICY IF EXISTS "Allow service updates" ON user_profiles;

-- The existing "Users can view own profile" and "Users can update own profile" 
-- policies are sufficient and properly restrictive
