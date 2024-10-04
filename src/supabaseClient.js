import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrjojpryevajvoigwhex.supabase.co'; // Replace with your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyam9qcHJ5ZXZhanZvaWd3aGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTgxMDYsImV4cCI6MjA0MzU3NDEwNn0.A1mvY5JBrMYtmZgPSlBRJl6lEkDHGBUoqIkwivf6w8A'; // Replace with your Supabase public API key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
