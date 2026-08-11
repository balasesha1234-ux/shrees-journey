import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export interface PetalRow {
  id?: number | string;
  name: string;
  country?: string;
  location?: string;
  message: string;
  created_at?: string;
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Reusable Supabase client with graceful fallback if environment variables are not configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
