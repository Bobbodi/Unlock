import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { Route, Router, useNavigate } from "react-router-dom";
import { listQotdComments, createQotdComment } from "../../api/qotdComments";

import { supabase } from "../../supabaseClient";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useStream } from "../../contexts/streamClientContext";

export default function Qotd() {
  const navigate = useNavigate();
  const { streamClient } = useStream();

  const [question] = useState(
    "Do you think mental health is something that should be talked about more today?",
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newC = await createQotdComment({ text: trimmed});
    setComments((prev) => { 
      //remove old copy of curr user comment on ui.
      //so take all except comment of curr user id from prev
      const updated = prev.filter(c => c.id !== user.id);
      return [newC, ...updated] 
    });
    setInput("");
  }

  const handleConfirmClick = () => {
    confirmAlert({
      title: "Are you ready to post?",
      message: "This move will overwrite any previous comments you made.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handlePost(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

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

        /* ── Layout ── */
        .qotd-page {
          display: flex;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: var(--bg);
          position: relative;
        }

        /* Ambient orbs */
        .qotd-page::before {
          content: '';
          position: fixed;
          top: -140px;
          right: -80px;
          width: 580px;
          height: 580px;
          background: radial-gradient(circle, rgba(194, 206, 255, 0.55) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        .qotd-bg-orb {
          position: fixed;
          bottom: -160px;
          left: 140px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(43, 75, 189, 0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Main scroll area ── */
        .qotd-main {
          flex: 1;
          overflow-y: auto;
          padding: 28px 32px 48px;
          position: relative;
          z-index: 1;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        .qotd-main::-webkit-scrollbar { width: 5px; }
        .qotd-main::-webkit-scrollbar-track { background: transparent; }
        .qotd-main::-webkit-scrollbar-thumb {
          background: rgba(43, 75, 189, 0.12);
          border-radius: 99px;
        }

        .qotd-content {
          width: 100%;
        }

        /* ── Back button ── */
        .qotd-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 16px 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(43, 75, 189, 0.15);
          background: rgba(194, 206, 255, 0.25);
          color: var(--blue);
          cursor: pointer;
          margin-bottom: 24px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s cubic-bezier(0.23,1,0.32,1);
          outline: none;
        }

        .qotd-back-btn:hover {
          background: rgba(194, 206, 255, 0.45);
          border-color: rgba(43, 75, 189, 0.28);
          transform: translateX(-2px);
        }

        .qotd-back-arrow {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.2s cubic-bezier(0.23,1,0.32,1);
        }

        .qotd-back-btn:hover .qotd-back-arrow {
          transform: translateX(-2px);
        }

        /* ── Page heading ── */
        .qotd-page-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.45);
          margin: 0 0 7px;
        }

        .qotd-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 36px;
          color: var(--navy);
          margin: 0 0 22px;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .qotd-page-title em {
          font-style: italic;
          color: var(--blue);
        }

        /* ── Question card ── */
        .qotd-question-card {
          width: 100%;
          border-radius: 22px;
          background: linear-gradient(145deg, #90abef  0%, #788ddf 50%, #90abef  100%);
          padding: 28px 30px;
          box-sizing: border-box;
          margin-bottom: 22px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 8px 32px rgba(20, 30, 100, 0.22),
            0 2px 8px rgba(20, 30, 100, 0.14),
            inset 0 1px 0 rgba(194, 206, 255, 0.1);
        }

        /* top glow */
        .qotd-question-card::before {
          content: '';
          position: absolute;
          top: -40%; left: 50%;
          transform: translateX(-50%);
          width: 70%; height: 80%;
          background: radial-gradient(ellipse, rgba(160,180,255,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        /* corner accent */
        .qotd-question-card::after {
          content: '';
          position: absolute;
          bottom: 16px; right: 20px;
          width: 40px; height: 40px;
          border-right: 1px solid rgba(194, 206, 255, 0.1);
          border-bottom: 1px solid rgba(194, 206, 255, 0.1);
          pointer-events: none;
        }

        .qotd-question-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #000000;
          margin: 0 0 12px;
          position: relative;
        }

        .qotd-question-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 24px;
          line-height: 1.45;
          color: #000000;
          margin: 0 0 22px;
          position: relative;
        }

        /* ── Comment input area (inside the card) ── */
        .qotd-input-wrap {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(194, 206, 255, 0.15);
          border-radius: 16px;
          padding: 16px 18px;
          position: relative;
        }

        .qotd-textarea {
          width: 100%;
          min-height: 90px;
          resize: none;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 300;
          color: #000000;
          line-height: 1.6;
          font-size: 20px;
          box-sizing: border-box;
          caret-color: var(--periwinkle);
        }

        .qotd-textarea::placeholder {
          color: rgba(253, 253, 255, 0.84);
          font-style: italic;
        }

        .qotd-input-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        /* ── Shared button style (Post / Reply) ── */
        .qotd-action-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #2b4bbd 0%, #1a2f85 100%);
          color: #e8ecff;
          cursor: pointer;
          box-shadow:
            0 4px 14px rgba(43, 75, 189, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition:
            transform 0.2s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.2s cubic-bezier(0.23,1,0.32,1);
          outline: none;
        }

        .qotd-action-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 22px rgba(43, 75, 189, 0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .qotd-action-btn:active {
          transform: translateY(0);
          box-shadow:
            0 2px 8px rgba(43, 75, 189, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .qotd-action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        /* ── Comments section ── */
        .qotd-comments-header {
          margin: 28px 0 16px;
        }

        .qotd-comments-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.45);
          margin: 0 0 6px;
        }

        .qotd-comments-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 26px;
          color: var(--navy);
          margin: 0;
          line-height: 1;
        }

        .qotd-comments-title em {
          font-style: italic;
          color: var(--blue);
        }

        .qotd-comments-rule {
          margin-top: 12px;
          height: 1px;
          background: linear-gradient(90deg, var(--border) 0%, transparent 80%);
          border: none;
          margin-bottom: 18px;
        }

        /* ── Comment list ── */
        .qotd-comments-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .qotd-comment-card {
          width: 100%;
          background: #fff;
          border-radius: 18px;
          padding: 20px 22px;
          box-sizing: border-box;
          border: 1px solid rgba(43, 75, 189, 0.08);
          box-shadow: 0 2px 12px rgba(43, 75, 189, 0.06);
          transition: box-shadow 0.2s, transform 0.2s cubic-bezier(0.23,1,0.32,1);
          animation: comment-in 0.3s ease forwards;
        }

        .qotd-comment-card:hover {
          box-shadow: 0 6px 24px rgba(43, 75, 189, 0.1);
          transform: translateY(-1px);
        }

        @keyframes comment-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .qotd-comment-author {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--navy);
          margin: 0 0 8px;
        }

        .qotd-comment-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(26, 34, 85, 0.8);
          margin: 0;
        }

        .qotd-comment-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
        }

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

        /* Empty / loading states */
        .qotd-state-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 20px;
          color: rgba(7, 16, 49, 0.4);
          margin: 0;
        }

        .qotd-loading {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 24px 0;
        }

        .qotd-loading-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(43, 75, 189, 0.3);
          animation: pulse-dot 1.2s ease-in-out infinite;
        }

        .qotd-loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .qotd-loading-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1);   }
        }
      `}</style>

      {/* Background orb */}
      <div className="qotd-bg-orb" />

      <div className="qotd-page">
        <Sidebar />

        <main className="qotd-main">
          <div className="qotd-content">
            {/* Back */}
            <button className="qotd-back-btn" onClick={() => navigate("/home")}>
              <span className="qotd-back-arrow">←</span>
              Back
            </button>

            {/* Page title */}
            <p className="qotd-page-eyebrow">Daily</p>
            <h1 className="qotd-page-title">
              Question <em>of the Day</em>
            </h1>

            {/* Question card */}
            <div className="qotd-question-card">
              <p className="qotd-question-label">Today's question</p>
              <p className="qotd-question-text">{question}</p>

              <div className="qotd-input-wrap">
                <textarea
                  className="qotd-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write Your Comment. Do note each user can only post one comment. If you write a new comment it will overwrite your previous comment!!"
                />
                <div className="qotd-input-footer">
                  <button
                    className="qotd-action-btn"
                    onClick={handleConfirmClick}
                    disabled={!input.trim()}
                  >
                    <em style={{ fontStyle: "normal", opacity: 0.75 }}>✦</em>
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Comments heading */}
            <div className="qotd-comments-header">
              <p className="qotd-comments-eyebrow">Responses</p>
              <h2 className="qotd-comments-title">
                What <em>others</em> think
              </h2>
              <hr className="qotd-comments-rule" />
            </div>

            {/* Comments */}
            {loading ? (
              <div className="qotd-loading">
                <div className="qotd-loading-dot" />
                <div className="qotd-loading-dot" />
                <div className="qotd-loading-dot" />
              </div>
            ) : comments.length === 0 ? (
              <p className="qotd-state-msg">No responses yet — be the first.</p>
            ) : (
              <div className="qotd-comments-list">
                {comments.map((c) => (
                  <div key={c.id} className="qotd-comment-card">
                    <p className="qotd-comment-author">{c.userName}</p>
                    <p className="qotd-comment-text">{c.comment}</p>
                    <div className="qotd-comment-footer">
                      {streamClient?.userID && streamClient.userID !== c.id && (
                        <button
                          className="qotd-reply-btn"
                          onClick={() =>
                            navigate("/chat?dm=" + c.id, {
                              state: { from: "qotd" },
                            })
                          }
                        >
                          ↩ Reply
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
