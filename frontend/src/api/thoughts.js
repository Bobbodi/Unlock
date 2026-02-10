import { supabase } from "../supabaseClient";

// tab = "all" | "friends"
export async function listThoughts(tab) {
  const { data, error } = await supabase
    .from("thoughts")
    .select(
      `
      thoughts_id,
      user_id,
      created_at,
      thoughts,
      visibility,
      info (
        "userName"
      )
    `
    )
    .eq("visibility", tab)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((t) => ({
    id: t.thoughts_id,
    user_id: t.user_id,
    createdAt: t.created_at,
    content: t.thoughts,
    visibility: t.visibility,
    authorName: t.info?.userName || "Anonymous",
  }));
}

export async function createThought({ content, visibility }) {
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;

  const user = userRes?.user;
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("thoughts")
    .insert([{ user_id: user.id, thoughts: content, visibility }])
    .select(
      `
      thoughts_id,
      user_id,
      created_at,
      thoughts,
      visibility,
      info ( "userName" )
    `
    )
    .single();

  if (error) throw error;

  return {
    id: data.thoughts_id,
    user_id: data.user_id,
    createdAt: data.created_at,
    content: data.thoughts,
    visibility: data.visibility,
    authorName: data.info?.userName || "Anonymous",
  };
}
