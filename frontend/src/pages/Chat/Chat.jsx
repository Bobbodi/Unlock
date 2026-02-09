import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Window,
  LoadingIndicator,
  Thread,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { supabase } from "../../supabaseClient";

export default function ChatPage() {
  const navigate = useNavigate();
  const [streamClient, setStreamClient] = useState(null);
  const [error, setError] = useState("");

  const DEV_EMAIL = "user1@gmail.com";
  const DEV_PASSWORD = "1234567890";

  useEffect(() => {
    let client;

    (async () => {
      // DEV auto-login (temporary)
      await supabase.auth.signOut(); // clears any stale token from other projects

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: DEV_EMAIL,
          password: DEV_PASSWORD,
        });

      if (loginError) throw loginError;

      const session = loginData.session;
      if (!session) throw new Error("No session returned after login.");

      try {
        // 1) Must be logged in via Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }

        // 2) Call Edge Function to mint Stream token
        console.log("SUPABASE_URL", process.env.REACT_APP_SUPABASE_URL);

        const url = `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/stream-token`;
        console.log("Calling function:", url);

        let res;
        try {
          res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
              "Content-Type": "application/json",
            },
          });
        } catch (err) {
          console.error("FETCH FAILED:", err);
          throw err; // this will become "Error: load failed"
        }

        console.log("Function status:", res.status);

        const raw = await res.text();
        console.log("Function body:", raw);

        if (!res.ok) throw new Error(raw);

        // parse after text() so you can see errors even if JSON parsing fails
        const { apiKey, token, userId } = JSON.parse(raw);

        // 3) Connect Stream user
        client = StreamChat.getInstance(apiKey);
        await client.connectUser({ id: userId }, token);
        setStreamClient(client);

        // 4) Minimal demo channel (global channel)
        const ch = client.channel("messaging", "global", { name: "Global" });
        await ch.watch();
      } catch (e) {
        setError(e.message || "Failed to load chat");
      }
    })();

    return () => {
      // cleanup
      if (client) client.disconnectUser();
    };
  }, [navigate]);

  async function openDM(otherUserId) {
    if (!streamClient) return;

    const myId = streamClient.userID;

    // deterministic channel id so both users land in the same channel
    const channelId = [myId, otherUserId].sort().join("__");

    const dm = streamClient.channel("messaging", {
      members: [myId, otherUserId],
    });
    await dm.create(); // or await dm.watch();

    await dm.watch(); // creates if needed + starts listening
    return dm;
  }

  if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;
  if (!streamClient)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <LoadingIndicator size={50} />
        Loading your chat...
      </div>
    );

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Chat client={streamClient} theme="messaging light">
        {/* Left sidebar */}
        <div style={{ width: 320, borderRight: "1px solid #eee" }}>
          <ChannelList />
        </div>

        {/* Right chat window */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </Chat>
    </div>
  );
}
