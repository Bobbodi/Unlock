import { useNavigate } from "react-router-dom";

/**
 * ThoughtsFeed
 *
 * UI component that displays a vertical list of thought cards.
 * If 'thoughts' is empty or not provided, "No thoughts yet" message will be shown to the user
 *
 * @param {{thoughts}} param0
 * array of thought objects to display
 * @returns
 */
export default function ThoughtsFeed({ thoughts }) {
  const navigate = useNavigate();

  if (!thoughts || thoughts.length === 0) {
    return (
      <p style={{ fontSize: 20, opacity: 0.7, marginTop: 10 }}>
        No thoughts yet.
      </p>
    );
  }

  return (
    <>
      <style>{`
        /* Reply button — lighter variant */
        .qotd-reply-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 8px;
          border: 1px solid rgba(43, 75, 189, 0.18);
          background: transparent;
          color: var(--blue);
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
          outline: none;
        }

        .qotd-reply-btn:hover {
          background: rgba(194, 206, 255, 0.3);
          border-color: rgba(43, 75, 189, 0.3);
        }
    `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {thoughts.map((t) => (
          <div key={t.id} style={cardStyle}>
            <div style={nameStyle}>{t.authorName}</div>
            <div style={contentStyle}>{t.content}</div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 13,
              }}
            >
              <button
                className="qotd-reply-btn"
                onClick={() => navigate("/chat?dm=" + t.user_id)}
              >
                ↩ Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const cardStyle = {
  background: "#dfe6ff",
  borderRadius: 24,
  padding: 22,
};

const nameStyle = {
  fontWeight: 800,
  fontSize: 20,
  marginBottom: 8,
};

const contentStyle = {
  fontSize: 13,
  lineHeight: 1.5,
  opacity: 0.9,
};

const replyBtnStyle = {
  padding: "10px 22px",
  borderRadius: 14,
  border: "none",
  background: "#c2ceff",
  color: "#2b4bbd",
  fontWeight: 800,
  cursor: "pointer",
};
