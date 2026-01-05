-- Content Versioning System for tracking content changes

-- Create content_versions table to track all content changes
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  content JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_by_email VARCHAR(255),
  change_type VARCHAR(20) NOT NULL DEFAULT 'update',
  change_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX idx_content_versions_table_name ON content_versions(table_name);
CREATE INDEX idx_content_versions_record_id ON content_versions(record_id);
CREATE INDEX idx_content_versions_created_at ON content_versions(created_at DESC);
CREATE INDEX idx_content_versions_changed_by ON content_versions(changed_by);

-- Create a view for easy access to recent changes
CREATE OR REPLACE VIEW recent_changes AS
SELECT
  table_name,
  record_id,
  change_type,
  change_summary,
  changed_by_email,
  created_at,
  content
FROM content_versions
ORDER BY created_at DESC
LIMIT 100;

-- Create function to get version history for a specific record
CREATE OR REPLACE FUNCTION get_version_history(
  p_table_name VARCHAR,
  p_record_id UUID
)
RETURNS TABLE (
  id UUID,
  change_type VARCHAR,
  changed_by_email VARCHAR,
  change_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  content JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cv.id,
    cv.change_type,
    cv.changed_by_email,
    cv.change_summary,
    cv.created_at,
    cv.content
  FROM content_versions cv
  WHERE cv.table_name = p_table_name
    AND cv.record_id = p_record_id
  ORDER BY cv.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add user_roles enum type if not exists
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add role column to profiles table (create profiles table if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    'editor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can view all content versions"
  ON content_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Editors can view content versions"
  ON content_versions FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

COMMENT ON TABLE content_versions IS 'Tracks all content changes for audit and version history';
