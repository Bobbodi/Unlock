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
      profilePic,
      distressMethod, 
      created_at
    `)
    .eq("user_id", user_id)
    .single();   
  if (error) throw error;

const { data: thoughtsData, error: thoughtsError } = await supabase
    .from("thoughts")
    .select("thoughts, created_at")
    .eq("user_id", user_id);

  if (thoughtsError) throw thoughtsError;
  return {data, thoughts: thoughtsData };
}

export async function saveNewProfilePic(svg, user_id) {
  const { data, error } = await supabase
    .from("info")
    .update({ profilePic: svg })
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getProfilePic(user_id) {
  const { data, error } = await supabase
  .from("info")
    .select(`
      profilePic
    `)
    .eq("user_id", user_id)
    .single();   

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}