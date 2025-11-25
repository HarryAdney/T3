/*
  # Add Township Content Sections

  This migration adds additional content fields to support all the content sections
  displayed on township pages.

  1. New Columns
    - `geography_content` (jsonb) - Content for the Geography card
    - `history_content` (jsonb) - Content for the History card
    - `communities_content` (jsonb) - Content for the Communities card
    - `today_content` (jsonb) - Content for the "Township Today" section
    - `subtitle` (text) - Hero section subtitle

  2. Changes
    - All new columns are nullable to allow gradual content migration
    - Uses jsonb format consistent with existing description and industry_content fields
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'geography_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN geography_content jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'history_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN history_content jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'communities_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN communities_content jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'today_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN today_content jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'subtitle'
  ) THEN
    ALTER TABLE townships ADD COLUMN subtitle text;
  END IF;
END $$;