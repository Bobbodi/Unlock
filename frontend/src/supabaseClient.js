import { createClient } from "@supabase/supabase-js";

console.log("ENV URL=", process.env.REACT_APP_SUPABASE_URL)

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY, {
    auth: {persistSession: true }
  }
);


