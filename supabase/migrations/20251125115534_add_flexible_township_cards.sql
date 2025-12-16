/*
  # Add Flexible Township Content Cards

  This migration adds flexible card content fields to support different township page layouts.
  Each township can have different featured content cards (e.g., churches, schools, village greens, etc.).

  1. New Columns
    - `card1_title` (text) - Title for first card
    - `card1_icon` (text) - Icon identifier for first card
    - `card1_content` (jsonb) - Content for first card
    - `card2_title` (text) - Title for second card
    - `card2_icon` (text) - Icon identifier for second card
    - `card2_content` (jsonb) - Content for second card
    - `card3_title` (text) - Title for third card
    - `card3_icon` (text) - Icon identifier for third card
    - `card3_content` (jsonb) - Content for third card
    - `card4_title` (text) - Title for fourth card
    - `card4_icon` (text) - Icon identifier for fourth card
    - `card4_content` (jsonb) - Content for fourth card
    - `history_section_title` (text) - Title for the bottom history section
    - `history_section_content` (jsonb) - Content for the bottom history section

  2. Notes
    - Replaces specific fields like geography_content, history_content, communities_content
    - Provides flexibility for different township layouts
    - All fields are nullable for gradual migration
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'townships' AND column_name = 'card1_title'
  ) THEN
    ALTER TABLE townships ADD COLUMN card1_title text;
    ALTER TABLE townships ADD COLUMN card1_icon text;
    ALTER TABLE townships ADD COLUMN card1_content jsonb;
    
    ALTER TABLE townships ADD COLUMN card2_title text;
    ALTER TABLE townships ADD COLUMN card2_icon text;
    ALTER TABLE townships ADD COLUMN card2_content jsonb;
    
    ALTER TABLE townships ADD COLUMN card3_title text;
    ALTER TABLE townships ADD COLUMN card3_icon text;
    ALTER TABLE townships ADD COLUMN card3_content jsonb;
    
    ALTER TABLE townships ADD COLUMN card4_title text;
    ALTER TABLE townships ADD COLUMN card4_icon text;
    ALTER TABLE townships ADD COLUMN card4_content jsonb;
    
    ALTER TABLE townships ADD COLUMN history_section_title text;
    ALTER TABLE townships ADD COLUMN history_section_content jsonb;
  END IF;
END $$;