import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listQotdComments, createQotdComment } from "../../api/qotdComments";

export default function Qotd() {
  const navigate = useNavigate();

  const [question] = useState(
    "Do you think mental health is something that should be talked about more today?" // placeholder question
  );
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await listQotdComments();
        setComments(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handlePost() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newC = await createQotdComment({ text: trimmed });
    setComments((prev) => [newC, ...prev]);
    setInput("");
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
  
      <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 16,
            border: "none",
            background: "#c2ceff",
            color: "#2b4bbd",
            fontWeight: 800,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 18 }}>←</span>
          Back
        </button>
  
        <h1 style={{ marginTop: 0 }}>Question Of The Day</h1>
  
        {/* QOTD card */}
        <div
          style={{
            width: "100%",
            background: "#cdd5ff",
            borderRadius: 26,
            padding: 22,
            boxSizing: "border-box",
            marginBottom: 22,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 750, marginBottom: 14 }}>
            {question}
          </div>
  
          <div style={{ background: "#dfe6ff", borderRadius: 22, padding: 18 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write Your Comment...."
              style={{
                width: "100%",
                minHeight: 110,
                resize: "none",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
  
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button
                onClick={handlePost}
                style={{
                  padding: "10px 22px",
                  borderRadius: 14,
                  border: "none",
                  background: "#c2ceff",
                  color: "#2b4bbd",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
  
        {/* Comments */}
        {loading ? (
          <p style={{ opacity: 0.7 }}>Loading...</p>
        ) : comments.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No comments yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {comments.map((c) => (
              <div
                key={c.id}
                style={{
                  width: "100%",
                  background: "#dfe6ff",
                  borderRadius: 22,
                  padding: 20,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 750, marginBottom: 6 }}>
                  {c.author}
                </div>
                <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>
                  {c.text}
                </div>
  
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                  <button
                    style={{
                      padding: "10px 22px",
                      borderRadius: 14,
                      border: "none",
                      background: "#c2ceff",
                      color: "#2b4bbd",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}  