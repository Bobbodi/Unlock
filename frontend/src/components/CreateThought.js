import { useState } from "react";

export default function CreateThought({ defaultVisibility, onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState(defaultVisibility || "all");

  function post() {
    const trimmed = content.trim();
    if (!trimmed) return;
    onSubmit({ content: trimmed, visibility });
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 600, background: "white", borderRadius: 16, padding: 16 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Share Your Thought</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", marginTop: 12, padding: 10, borderRadius: 12 }}
          placeholder="Write here..."
        />

        <div style={{ marginTop: 12, display: "flex", gap: 14 }}>
          <label>
            <input type="radio" checked={visibility === "all"} onChange={() => setVisibility("all")} /> All
          </label>
          <label>
            <input type="radio" checked={visibility === "friends"} onChange={() => setVisibility("friends")} /> Friends
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button onClick={post} style={{ padding: "10px 16px", borderRadius: 12 }}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
