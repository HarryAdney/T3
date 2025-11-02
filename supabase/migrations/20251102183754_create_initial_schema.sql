/*
  # Thoralby Through Time - Initial Database Schema

  ## Overview
  Creates the foundational database structure for a historical website about Thoralby,
  North Yorkshire, including people, places, events, photographs, and user contributions.

  ## New Tables

  ### 1. `people`
  Stores information about individuals and families from Thoralby's history
  - `id` (uuid, primary key)
  - `first_name` (text)
  - `last_name` (text)
  - `maiden_name` (text, optional)
  - `birth_year` (integer, optional)
  - `death_year` (integer, optional)
  - `occupation` (text, optional)
  - `biography` (text)
  - `profile_image_url` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `buildings`
  Historical buildings and places in Thoralby and Bishopdale
  - `id` (uuid, primary key)
  - `name` (text)
  - `address` (text, optional)
  - `latitude` (numeric, for map display)
  - `longitude` (numeric, for map display)
  - `construction_year` (integer, optional)
  - `description` (text)
  - `current_status` (text: 'standing', 'ruins', 'demolished')
  - `thumbnail_url` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `events`
  Historical events and timeline entries
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `event_date` (date, optional - some events may only have year)
  - `event_year` (integer)
  - `decade` (integer, computed for filtering)
  - `category` (text: 'social', 'political', 'economic', 'cultural', etc.)
  - `image_url` (text, optional)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `photographs`
  Photo archive with metadata
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text, optional)
  - `image_url` (text)
  - `thumbnail_url` (text)
  - `photo_date` (date, optional)
  - `photo_year` (integer, optional)
  - `location` (text, optional)
  - `photographer` (text, optional)
  - `contributor` (text, optional)
  - `tags` (text array)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `maps`
  Historical and modern maps
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `map_year` (integer, optional)
  - `map_url` (text)
  - `thumbnail_url` (text, optional)
  - `map_type` (text: 'historical', 'modern', 'survey', 'sketch')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `contributions`
  User-submitted content pending moderation
  - `id` (uuid, primary key)
  - `contributor_name` (text)
  - `contributor_email` (text)
  - `contribution_type` (text: 'story', 'photo', 'document', 'correction')
  - `title` (text)
  - `content` (text)
  - `attachments` (jsonb, stores file URLs and metadata)
  - `status` (text: 'pending', 'approved', 'rejected')
  - `notes` (text, optional - admin notes)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `relationships`
  Links between people (family connections)
  - `id` (uuid, primary key)
  - `person_id` (uuid, references people)
  - `related_person_id` (uuid, references people)
  - `relationship_type` (text: 'spouse', 'parent', 'child', 'sibling')
  - `created_at` (timestamptz)

  ### 8. `event_people`
  Many-to-many relationship between events and people
  - `event_id` (uuid, references events)
  - `person_id` (uuid, references people)
  - `role` (text, optional - their role in the event)

  ### 9. `building_photos`
  Links photographs to buildings
  - `building_id` (uuid, references buildings)
  - `photograph_id` (uuid, references photographs)

  ## Security
  - Enable RLS on all tables
  - Allow public read access to all historical content
  - Restrict write access to contributions table only
  - Admin operations require authentication

  ## Indexes
  - Create indexes on commonly searched fields (names, years, tags)
  - Coordinate indexes for map performance
*/

-- Create people table
CREATE TABLE IF NOT EXISTS people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  maiden_name text,
  birth_year integer,
  death_year integer,
  occupation text,
  biography text DEFAULT '',
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create buildings table
CREATE TABLE IF NOT EXISTS buildings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  construction_year integer,
  description text DEFAULT '',
  current_status text DEFAULT 'standing' CHECK (current_status IN ('standing', 'ruins', 'demolished')),
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  event_date date,
  event_year integer NOT NULL,
  decade integer GENERATED ALWAYS AS (floor(event_year / 10) * 10) STORED,
  category text DEFAULT 'general',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create photographs table
CREATE TABLE IF NOT EXISTS photographs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  thumbnail_url text,
  photo_date date,
  photo_year integer,
  location text,
  photographer text,
  contributor text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create maps table
CREATE TABLE IF NOT EXISTS maps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  map_year integer,
  map_url text NOT NULL,
  thumbnail_url text,
  map_type text DEFAULT 'historical' CHECK (map_type IN ('historical', 'modern', 'survey', 'sketch')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_name text NOT NULL,
  contributor_email text NOT NULL,
  contribution_type text NOT NULL CHECK (contribution_type IN ('story', 'photo', 'document', 'correction')),
  title text NOT NULL,
  content text DEFAULT '',
  attachments jsonb DEFAULT '[]',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create relationships table (family connections)
CREATE TABLE IF NOT EXISTS relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  related_person_id uuid NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  relationship_type text NOT NULL CHECK (relationship_type IN ('spouse', 'parent', 'child', 'sibling')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(person_id, related_person_id, relationship_type)
);

-- Create event_people junction table
CREATE TABLE IF NOT EXISTS event_people (
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  person_id uuid NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  role text,
  PRIMARY KEY (event_id, person_id)
);

-- Create building_photos junction table
CREATE TABLE IF NOT EXISTS building_photos (
  building_id uuid NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  photograph_id uuid NOT NULL REFERENCES photographs(id) ON DELETE CASCADE,
  PRIMARY KEY (building_id, photograph_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_people_last_name ON people(last_name);
CREATE INDEX IF NOT EXISTS idx_people_birth_year ON people(birth_year);
CREATE INDEX IF NOT EXISTS idx_buildings_name ON buildings(name);
CREATE INDEX IF NOT EXISTS idx_buildings_coordinates ON buildings(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_events_year ON events(event_year);
CREATE INDEX IF NOT EXISTS idx_events_decade ON events(decade);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_photographs_year ON photographs(photo_year);
CREATE INDEX IF NOT EXISTS idx_photographs_tags ON photographs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE photographs ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view people"
  ON people FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view buildings"
  ON buildings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view photographs"
  ON photographs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view maps"
  ON maps FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view relationships"
  ON relationships FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view event_people"
  ON event_people FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view building_photos"
  ON building_photos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Contributions: Anyone can insert, but can only view their own pending submissions
CREATE POLICY "Anyone can submit contributions"
  ON contributions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can view approved contributions"
  ON contributions FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buildings_updated_at BEFORE UPDATE ON buildings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photographs_updated_at BEFORE UPDATE ON photographs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maps_updated_at BEFORE UPDATE ON maps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();