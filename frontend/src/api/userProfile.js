import { supabase } from "../supabaseClient";

export async function getProfileInfo(user_id) {
  const { data, error } = await supabase
    .from("info")
    .select(`
      user_id,
      userName,
      gender,
      birth, 
      funFact, 
      animal, 
      distressMethod, 
      created_at
    `)
    .eq("user_id", user_id)
    .single();   
  if (error) throw error;

  return data;
}