import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  institution: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

export type AnswerSheet = {
  id: string;
  user_id: string;
  title: string;
  file_url: string;
  file_name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploaded_at: string;
  processed_at: string | null;
};

export type GradingResult = {
  id: string;
  sheet_id: string;
  user_id: string;
  score: number;
  total_score: number;
  percentage: number;
  feedback: string | null;
  extracted_text: string | null;
  created_at: string;
};

export type Analytics = {
  id: string;
  user_id: string;
  total_sheets_processed: number;
  average_score: number;
  total_processing_time: number;
  last_updated: string;
};
