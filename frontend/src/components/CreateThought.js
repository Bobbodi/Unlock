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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        /* ── Backdrop ── */
        .ct-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 50, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          z-index: 50;
          animation: ct-fade-in 0.2s ease forwards;
        }

        @keyframes ct-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal card ── */
        .ct-modal {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border-radius: 22px;
          padding: 28px 30px 26px;
          box-shadow:
            0 24px 64px rgba(20, 30, 100, 0.22),
            0 4px 16px rgba(20, 30, 100, 0.12),
            inset 0 1px 0 rgba(255,255,255,0.9);
          animation: ct-slide-up 0.28s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          position: relative;
          overflow: hidden;
        }

        /* Subtle top-edge accent */
        .ct-modal::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2b4bbd, #7b93e8, #2b4bbd);
          border-radius: 22px 22px 0 0;
        }

        @keyframes ct-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Header ── */
        .ct-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .ct-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.45);
          margin: 0 0 5px;
        }

        .ct-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 26px;
          color: #1a2255;
          margin: 0;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .ct-title em {
          font-style: italic;
          color: #2b4bbd;
        }

        .ct-close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(43, 75, 189, 0.15);
          background: transparent;
          color: rgba(43, 75, 189, 0.5);
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          flex-shrink: 0;
          margin-top: 2px;
          outline: none;
          font-family: 'Tenor Sans', sans-serif;
        }

        .ct-close:hover {
          background: rgba(43, 75, 189, 0.07);
          color: #1a2255;
          border-color: rgba(43, 75, 189, 0.3);
        }

        /* ── Textarea ── */
        .ct-textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid rgba(43, 75, 189, 0.15);
          background: rgba(43, 75, 189, 0.025);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 300;
          color: #1a2255;
          line-height: 1.6;
          resize: none;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          caret-color: #2b4bbd;
        }

        .ct-textarea::placeholder {
          color: rgba(43, 75, 189, 0.3);
          font-style: italic;
        }

        .ct-textarea:focus {
          border-color: rgba(43, 75, 189, 0.4);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(43, 75, 189, 0.08);
        }

        /* ── Footer row ── */
        .ct-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
        }

        /* ── Visibility radio group ── */
        .ct-vis-group {
          display: flex;
          gap: 4px;
          background: rgba(43, 75, 189, 0.06);
          border-radius: 10px;
          padding: 3px;
        }

        .ct-vis-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4a63b5;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          user-select: none;
        }

        .ct-vis-label input[type="radio"] {
          display: none;
        }

        .ct-vis-label.selected {
          background: #fff;
          color: #1a2255;
          box-shadow: 0 1px 4px rgba(43, 75, 189, 0.12);
        }

        /* ── Post button ── */
        .ct-post-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 11px;
          border: none;
          background: linear-gradient(135deg, #2b4bbd 0%, #1a2f85 100%);
          color: #e8ecff;
          cursor: pointer;
          box-shadow:
            0 4px 16px rgba(43, 75, 189, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition:
            transform 0.2s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.2s cubic-bezier(0.23, 1, 0.32, 1),
            opacity 0.2s;
          outline: none;
        }

        .ct-post-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 24px rgba(43, 75, 189, 0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .ct-post-btn:active {
          transform: translateY(0);
          box-shadow:
            0 2px 8px rgba(43, 75, 189, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .ct-post-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <div className="ct-backdrop" onClick={onClose}>
        <div className="ct-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="ct-header">
            <div>
              <p className="ct-eyebrow">New</p>
              <h3 className="ct-title">Share a <em>Thought</em></h3>
            </div>
            <button className="ct-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {/* Textarea */}
          <textarea
            className="ct-textarea"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind…"
          />

          {/* Footer: visibility + post */}
          <div className="ct-footer">
            <div className="ct-vis-group">
              <label className={`ct-vis-label${visibility === "all" ? " selected" : ""}`}>
                <input type="radio" checked={visibility === "all"} onChange={() => setVisibility("all")} />
                All
              </label>
              <label className={`ct-vis-label${visibility === "friends" ? " selected" : ""}`}>
                <input type="radio" checked={visibility === "friends"} onChange={() => setVisibility("friends")} />
                Friends
              </label>
            </div>

            <button
              className="ct-post-btn"
              onClick={post}
              disabled={!content.trim()}
            >
              <em style={{ fontStyle: "normal", opacity: 0.75 }}>✦</em>
              Post
            </button>
          </div>

        </div>
      </div>
    </>
  );
}