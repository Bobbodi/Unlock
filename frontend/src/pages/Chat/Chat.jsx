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
  ChannelPreviewMessenger,
  useChatContext,
  useChannelStateContext,
} from "stream-chat-react";

import "../../styles/stream-theme.css";

import { useStream } from "../../contexts/streamClientContext";

function CustomDMHeader() {
  const { channel } = useChannelStateContext();
  const myId = channel.getClient().userID;

  const other = getOtherUser(channel, myId);
  const title = other?.name || other?.username || other?.id || "Chat";

  return (
    <div style={{ padding: "7px", borderBottom: "1.5px solid #eee" }}>
      <ChannelHeader title={title} />
    </div>
  );
}

function CustomDMPreview(props) {
  const { client } = useChatContext();
  const { channel } = props;

  const myId = client.userID;

  const other = getOtherUser(channel, myId);
  const title = other?.name || other?.username || other?.id || "Chat";

  return <ChannelPreviewMessenger {...props} displayTitle={title} />;
}

function getOtherUser(channel, myId) {
  const members = Object.values(channel.state.members || {});
  return members.map((m) => m.user).find((u) => u?.id && u.id !== myId);
}

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
              Preview={CustomDMPreview}
            />
          </div>

          {/* Right chat window */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <Channel>
              <Window>
                <CustomDMHeader />
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
