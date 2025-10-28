/*
  # Create Users and Grading System Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, nullable)
      - `institution` (text, nullable)
      - `role` (text, default 'educator')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `answer_sheets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `file_url` (text)
      - `file_name` (text)
      - `status` (text, default 'pending')
      - `uploaded_at` (timestamptz)
      - `processed_at` (timestamptz, nullable)
    
    - `grading_results`
      - `id` (uuid, primary key)
      - `sheet_id` (uuid, references answer_sheets)
      - `user_id` (uuid, references profiles)
      - `score` (numeric)
      - `total_score` (numeric)
      - `percentage` (numeric)
      - `feedback` (text, nullable)
      - `extracted_text` (text, nullable)
      - `created_at` (timestamptz)
    
    - `analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `total_sheets_processed` (integer, default 0)
      - `average_score` (numeric, default 0)
      - `total_processing_time` (integer, default 0)
      - `last_updated` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  institution text,
  role text DEFAULT 'educator',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create answer_sheets table
CREATE TABLE IF NOT EXISTS answer_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  status text DEFAULT 'pending',
  uploaded_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

ALTER TABLE answer_sheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own answer sheets"
  ON answer_sheets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answer sheets"
  ON answer_sheets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own answer sheets"
  ON answer_sheets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own answer sheets"
  ON answer_sheets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create grading_results table
CREATE TABLE IF NOT EXISTS grading_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id uuid NOT NULL REFERENCES answer_sheets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score numeric NOT NULL DEFAULT 0,
  total_score numeric NOT NULL DEFAULT 100,
  percentage numeric NOT NULL DEFAULT 0,
  feedback text,
  extracted_text text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grading_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own grading results"
  ON grading_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grading results"
  ON grading_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_sheets_processed integer DEFAULT 0,
  average_score numeric DEFAULT 0,
  total_processing_time integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics"
  ON analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
  ON analytics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
  ON analytics FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO public.analytics (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
