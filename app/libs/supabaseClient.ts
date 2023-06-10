import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://egehjeowzcpwlfxvjqci.supabase.co";

export const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZWhqZW93emNwd2xmeHZqcWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMTgzNzAsImV4cCI6MjAwMTg5NDM3MH0.JgM1gmr6k6smoPNFXeTWk2tJqgGOP-cxcgbM21ieayw"
);
