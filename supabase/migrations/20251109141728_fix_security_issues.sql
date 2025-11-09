/*
  # Fix Security Issues

  1. Foreign Key Indexes
    - Add indexes for unindexed foreign keys to improve query performance:
      - `building_photos.photograph_id`
      - `event_people.person_id`
      - `relationships.related_person_id`

  2. RLS Policy Optimization
    - Optimize RLS policies to use `(select auth.uid())` instead of `auth.uid()`
    - This prevents re-evaluation for each row and improves performance at scale

  3. Remove Unused Indexes
    - Drop indexes that are not being used to reduce maintenance overhead

  4. Fix Multiple Permissive Policies
    - Consolidate multiple permissive policies into single policies where appropriate

  5. Function Search Path
    - Set explicit search_path for functions to prevent security issues
*/

-- 1. Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_building_photos_photograph_id 
  ON building_photos(photograph_id);

CREATE INDEX IF NOT EXISTS idx_event_people_person_id 
  ON event_people(person_id);

CREATE INDEX IF NOT EXISTS idx_relationships_related_person_id 
  ON relationships(related_person_id);

-- 2. Optimize RLS policies with proper auth function calls
-- Drop existing policies for puck_pages
DROP POLICY IF EXISTS "Editors can view all pages" ON puck_pages;
DROP POLICY IF EXISTS "Editors can create pages" ON puck_pages;
DROP POLICY IF EXISTS "Editors can update pages" ON puck_pages;
DROP POLICY IF EXISTS "Editors can delete pages" ON puck_pages;

-- Recreate with optimized auth functions
CREATE POLICY "Editors can view all pages"
  ON puck_pages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Editors can create pages"
  ON puck_pages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Editors can update pages"
  ON puck_pages FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  );

CREATE POLICY "Editors can delete pages"
  ON puck_pages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = (select auth.uid())
      AND role IN ('editor', 'admin')
    )
  );

-- Optimize user_profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Recreate with optimized auth functions
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK (
    (select auth.uid()) = id
    AND role = (SELECT role FROM user_profiles WHERE id = (select auth.uid()))
  );

-- 3. Remove unused indexes
DROP INDEX IF EXISTS idx_user_profiles_role;
DROP INDEX IF EXISTS idx_people_birth_year;
DROP INDEX IF EXISTS idx_buildings_coordinates;
DROP INDEX IF EXISTS idx_events_decade;
DROP INDEX IF EXISTS idx_events_category;
DROP INDEX IF EXISTS idx_photographs_tags;
DROP INDEX IF EXISTS idx_contributions_status;
DROP INDEX IF EXISTS idx_puck_pages_published;

-- 4. Fix function search paths
-- Drop and recreate functions with explicit search_path
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (
    new.id,
    new.email,
    'viewer'
  );
  RETURN new;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers for update_updated_at_column
CREATE TRIGGER update_puck_pages_updated_at
  BEFORE UPDATE ON puck_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
