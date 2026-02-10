import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { openDM } from "../../utils/openDM";

function AutoOpenDM({ streamClient }) {
  const { setActiveChannel } = useChatContext();
  const query = new URLSearchParams(useLocation().search);
  const dmId = query.get("dm");

  useEffect(() => {
    if (!streamClient || !dmId) return;
    (async () => {
      const channel = await openDM(streamClient, dmId);
      if (channel) setActiveChannel(channel);
    })();
  }, [streamClient, dmId, setActiveChannel]);

  return null;
}

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
  const location = useLocation();
  const [error, setError] = useState("");
  const { streamClient, streamLoading } = useStream();

  const from = location.state?.from; // "qotd" if they came from there

  // If not logged in, provider likely returns null client
  if (!streamLoading && !streamClient) {
    navigate("/login");
    return null;
  }

  if (error) return <div style={{ padding: 16 }}>Error: {error}</div>;

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap');

        :root {
          --bg: #f4f6ff;
          --blue: #2b4bbd;
          --navy: #1a2255;
          --periwinkle: #c2ceff;
          --border: rgba(43, 75, 189, 0.1);
        }
          
        /* ── Back button ── */
        .qotd-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 16px 8px 12px;
          min-height: 44px;
          min-width: 320px;
          border: 1px solid rgba(43, 75, 189, 0.15);
          background: rgba(194, 206, 255, 0.25);
          color: var(--blue);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.23,1,0.32,1);
          outline: none;
        }

        .qotd-back-btn:hover {
          background: rgba(194, 206, 255, 0.45);
          border-color: rgba(43, 75, 189, 0.28);
        }

        .qotd-back-arrow {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.2s cubic-bezier(0.23,1,0.32,1);
        }

        .qotd-back-btn:hover .qotd-back-arrow {
          transform: translateX(-2px);
        }
    `}</style>
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
            <AutoOpenDM streamClient={streamClient} />
            {/* Left channel list */}
            <div style={{ width: 320, borderRight: "1px solid #eee" }}>
              {from === "qotd" && (
                <button className="qotd-back-btn" onClick={() => navigate(-1)}>
                  <span className="qotd-back-arrow">←</span>
                  Back to QOTD
                </button>
              )}
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
    </>
  );
}
