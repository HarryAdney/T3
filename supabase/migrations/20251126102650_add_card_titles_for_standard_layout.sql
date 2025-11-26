/*
  # Add Card Title Fields for Standard Layout

  This migration adds title fields for the standard Bishopdale-style card layout
  (Geography, History, Communities cards) to make them editable.

  1. New Columns
    - `geography_title` (text) - Title for the Geography card
    - `history_title` (text) - Title for the History card
    - `communities_title` (text) - Title for the Communities card
    - `industry_title` (text) - Title for the Industry card
    - `today_section_title` (text) - Title for the "Township Today" section

  2. Notes
    - All fields are nullable for gradual migration
    - Provides consistency with the flexible card system (card1_title, etc.)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'geography_title'
  ) THEN
    ALTER TABLE townships ADD COLUMN geography_title text;
    ALTER TABLE townships ADD COLUMN history_title text;
    ALTER TABLE townships ADD COLUMN communities_title text;
    ALTER TABLE townships ADD COLUMN industry_title text;
    ALTER TABLE townships ADD COLUMN today_section_title text;
  END IF;
END $$;