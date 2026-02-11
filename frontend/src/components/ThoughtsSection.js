import { useEffect, useState } from "react";
import ThoughtsFeed from "./ThoughtsFeed";
import CreateThought from "./CreateThought";
import { listThoughts, createThought } from "../api/thoughts";

/**
 * ThoughtsSection
 * 
 * Display the "Space to Share" thoughts area with:
 * 1). Tabs for filtering thoughts by either all (publicly) or friends
 * 2). A button that opens a pop up for creating a new thought
 * 3). A feed that displays thoughts for the selected tab
 * 
 * @returns {JSX.elements}
 */
export default function ThoughtsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [thoughts, setThoughts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch thoughts whenever the active tab changes 
   * which keeps the feed in sync with the selected visibility filter
   */
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await listThoughts(activeTab);
        setThoughts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeTab]);

  /**
   * Handles the creation of new thought being posted either in all or friends
   * @param {{content: string, visibility: "all" | "friends"}} param0 
   */
  async function handleCreate({ content, visibility, isAnonymous }) {
    try {
      const newPost = await createThought({ content, visibility, isAnonymous });
      if (visibility === activeTab) setThoughts((prev) => [newPost, ...prev]);
      setOpenModal(false);
    } catch (e) {
      alert(e.message || JSON.stringify(e));
    }
  }  

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .thoughts-section {
          margin-top: 20px;
          width: 100%;
        }

        .thoughts-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        /* Tab group */
        .thoughts-tabs {
          display: flex;
          gap: 4px;
          background: rgba(43, 75, 189, 0.07);
          border-radius: 14px;
          padding: 4px;
        }

        .tab-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 8px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          color: #4a63b5;
          background: transparent;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
          position: relative;
          outline: none;
        }

        .tab-btn.active {
          background: #fff;
          color: #1a2255;
          box-shadow:
            0 2px 8px rgba(43, 75, 189, 0.14),
            0 1px 2px rgba(43, 75, 189, 0.08);
        }

        .tab-btn:not(.active):hover {
          background: rgba(43, 75, 189, 0.06);
          color: #2b4bbd;
        }

        /* Share button */
        .share-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 20px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #2b4bbd 0%, #1a2f85 100%);
          color: #e8ecff;
          cursor: pointer;
          box-shadow:
            0 4px 16px rgba(43, 75, 189, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition:
            transform 0.2s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.2s cubic-bezier(0.23, 1, 0.32, 1);
          outline: none;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 24px rgba(43, 75, 189, 0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .share-btn:active {
          transform: translateY(0);
          box-shadow:
            0 2px 8px rgba(43, 75, 189, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .share-btn-icon {
          font-size: 14px;
          line-height: 1;
          opacity: 0.85;
          font-style: normal;
        }

        /* Feed area */
        .thoughts-feed-area {
          margin-top: 16px;
        }

        /* Loading state */
        .thoughts-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 36px 0;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.4);
        }

        .loading-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(43, 75, 189, 0.35);
          animation: pulse-dot 1.2s ease-in-out infinite;
        }

        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        /* Fade-in for feed */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .thoughts-feed-area > * {
          animation: fade-up 0.3s ease forwards;
        }
      `}</style>

      <div className="thoughts-section">
        <div className="thoughts-toolbar">
          {/* Tab switcher */}
          <div className="thoughts-tabs">
            <button
              className={`tab-btn${activeTab === "all" ? " active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab-btn${activeTab === "friends" ? " active" : ""}`}
              onClick={() => setActiveTab("friends")}
            >
              Friends
            </button>
          </div>

          {/* Share CTA */}
          <button className="share-btn" onClick={() => setOpenModal(true)}>
            <em className="share-btn-icon">✦</em>
            Share a Thought
          </button>
        </div>

        <div className="thoughts-feed-area">
          {loading ? (
            <div className="thoughts-loading">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
            </div>
          ) : (
            <ThoughtsFeed thoughts={thoughts} />
          )}
        </div>

        {openModal && (
          <CreateThought
            defaultVisibility={activeTab}
            onClose={() => setOpenModal(false)}
            onSubmit={handleCreate}
          />
        )}
      </div>
    </>
  );
}