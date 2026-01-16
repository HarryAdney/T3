/*
  # Add UPDATE policy for townships table

  1. Security
    - Add policy for authenticated users to update townships
    - This enables WYSIWYG inline editing functionality
    - Restricts updates to authenticated users only
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Authenticated users can update townships" ON townships;

-- Create UPDATE policy for authenticated users
CREATE POLICY "Authenticated users can update townships"
  ON townships
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
