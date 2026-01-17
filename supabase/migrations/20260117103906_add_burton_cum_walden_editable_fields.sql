/*
  # Add editable fields for Burton-cum-Walden page
  
  1. New Columns
    - `west_burton_title` (text) - Title for West Burton section
    - `walden_title` (text) - Title for Walden section
    - `walden_content` (jsonb) - Content for Walden section
    - `united_township_title` (text) - Title for United Township section
    - `united_township_content` (jsonb) - Content for United Township section
  
  2. Notes
    - These fields enable full inline editing of Burton-cum-Walden page
    - Card fields (card1-4) already exist for West Burton feature cards
*/

-- Add new columns for Burton-cum-Walden content sections
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'townships' AND column_name = 'west_burton_title'
  ) THEN
    ALTER TABLE townships ADD COLUMN west_burton_title text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'townships' AND column_name = 'walden_title'
  ) THEN
    ALTER TABLE townships ADD COLUMN walden_title text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'townships' AND column_name = 'walden_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN walden_content jsonb;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'townships' AND column_name = 'united_township_title'
  ) THEN
    ALTER TABLE townships ADD COLUMN united_township_title text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'townships' AND column_name = 'united_township_content'
  ) THEN
    ALTER TABLE townships ADD COLUMN united_township_content jsonb;
  END IF;
END $$;