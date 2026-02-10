import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { StreamChat } from "npm:stream-chat@9.31.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  // 1) Read env secrets (server-side only)
  const SUPABASE_URL = Deno.env.get("SB_URL");
  const SUPABASE_ANON_KEY = Deno.env.get("SB_ANON_KEY");

  const STREAM_API_KEY = Deno.env.get("STREAM_API_KEY");
  const STREAM_API_SECRET = Deno.env.get("STREAM_API_SECRET");

  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    !STREAM_API_KEY ||
    !STREAM_API_SECRET
  ) {
    return new Response("Missing server secrets", { status: 500 });
  }

  // 2) Verify caller is logged in by validating their Supabase JWT
  const authHeader = req.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return new Response("Missing Authorization header", { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes?.user) {
    return new Response("Invalid or expired session", { status: 401 });
  }

  const user = userRes.user;

  const { data: profile, error: profileErr } = await supabase
    .from("info")
    .select("userName")
    .eq("user_id", user.id)
    .single();

  if (profileErr) {
    // Not fatal — you can fallback
    console.warn("profile lookup failed:", profileErr.message);
  }

  // Take a display name from metadata
  const name =
    profile?.userName ||
    (user.user_metadata?.name as string | undefined) ||
    user.email ||
    "User";

  // 3) Create Stream token using Stream SECRET (server-side)
  const serverClient = StreamChat.getInstance(
    STREAM_API_KEY,
    STREAM_API_SECRET,
  );

  // Create/update Stream user
  await serverClient.upsertUser({
    id: user.id,
    name,
  });

  // Mint token for this user
  const token = serverClient.createToken(user.id);

  // 4) Return token + apiKey (apiKey is safe to expose)
  return new Response(
    JSON.stringify({
      apiKey: STREAM_API_KEY,
      token,
      userId: user.id,
      userName: name,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
