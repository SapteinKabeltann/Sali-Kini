// /lib/initSupabase.js
import { createClient } from '@supabase/supabase-js';

// Hent Supabase URL og Anon Key fra miljøvariablene
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sjekk at verdiene er lastet inn
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not defined.');
}

// Opprett Supabase-klienten
export const supabase = createClient(supabaseUrl, supabaseAnonKey);