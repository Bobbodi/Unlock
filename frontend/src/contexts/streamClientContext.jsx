import { createContext, useContext, useEffect, useRef, useState } from "react";
import { StreamChat } from "stream-chat";
import { supabase } from "../supabaseClient";

const StreamContext = createContext(null);

export function StreamProvider({ children }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // track the currently connected Stream user id
  const connectedUserIdRef = useRef(null);

  const disconnectStream = async () => {
    try {
      if (client?.userID) {
        await client.disconnectUser();
      }
    } catch (e) {
      console.error("disconnectStream error:", e);
    } finally {
      connectedUserIdRef.current = null;
      setClient(null);
    }
  };

  const connectStreamForSession = async (session) => {
    // no session => ensure disconnected
    if (!session) {
      await disconnectStream();
      return;
    }

    // fetch token for this supabase user/session
    const res = await fetch(
      `${process.env.REACT_APP_SUPABASE_URL}/functions/v1/stream-token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) throw new Error(await res.text());
    const { apiKey, token, userId } = await res.json();

    // if already connected as the same user, do nothing
    if (connectedUserIdRef.current === userId && client?.userID === userId) {
      return;
    }

    // if connected as someone else, disconnect first
    if (client?.userID && client.userID !== userId) {
      await client.disconnectUser();
    }

    // create/get client instance
    const stream = StreamChat.getInstance(apiKey);

    // connect user
    await stream.connectUser({ id: userId }, token);

    connectedUserIdRef.current = userId;
    setClient(stream);
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!cancelled) {
          await connectStreamForSession(session);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) await disconnectStream();
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    init();

    // listen to login/logout/refresh events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLoading(true);
        try {
          await connectStreamForSession(session);
        } catch (e) {
          console.error(e);
          await disconnectStream();
        } finally {
          setLoading(false);
        }
      },
    );

    return () => {
      cancelled = true;
      authListener?.subscription?.unsubscribe();
      // optional: disconnect when provider unmounts
      // disconnectStream();
    };
    // include `client` because we may disconnect it / compare userID
  }, [client]);

  return (
    <StreamContext.Provider
      value={{ streamClient: client, streamLoading: loading }}
    >
      {children}
    </StreamContext.Provider>
  );
}

export function useStream() {
  return useContext(StreamContext);
}
