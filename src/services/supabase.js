import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pobmhdnrtjhkhxizzfnj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYm1oZG5ydGpoa2h4aXp6Zm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NTk1NDAsImV4cCI6MjAyNzAzNTU0MH0.2oX3-giXVuzNQqjdOF8e59ipmdRTXA32L5faMXGpV1A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
