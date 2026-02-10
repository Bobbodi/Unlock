import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { useStream } from "../../contexts/streamClientContext";

export default function ChatPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { streamClient, streamLoading } = useStream();

  // If not logged in, provider likely returns null client
  if (!streamLoading && !streamClient) {
    navigate("/login");
    return null;
  }

  // function to create/open chat with other user
  async function openDM(otherUserId) {
    if (!streamClient) return;

    const myId = streamClient.userID;

    const dm = streamClient.channel("messaging", {
      members: [myId, otherUserId],
    });

    await dm.watch(); // creates if needed + starts listening
    return dm;
  }

  if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Sidebar />

      {!streamClient ? (
        <div
          style={{
            flex: 1,
            minWidth: 0,
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
      ) : (
        <Chat client={streamClient} theme="messaging light">
          {/* Left channel list */}
          <div style={{ width: 320, borderRight: "1px solid #eee" }}>
            <ChannelList
              filters={{
                type: "messaging",
                members: { $in: [streamClient.userID] },
              }}
            />
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
      )}
    </div>
  );
}
