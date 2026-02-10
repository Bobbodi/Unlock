import { useEffect, useState } from "react";
import ThoughtsFeed from "./ThoughtsFeed";
import CreateThought from "./CreateThought";
import { listThoughts, createThought } from "../api/thoughts";

export default function ThoughtsSection() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "friends"
  const [thoughts, setThoughts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function handleCreate({ content, visibility }) {
    const newPost = await createThought({ content, visibility });

    if (visibility === activeTab) {
      setThoughts((prev) => [newPost, ...prev]);
    }

    setOpenModal(false);
  }

  return (
    <div style={{ marginTop: 20, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button 
            className="button" 
            onClick={() => setActiveTab("all")} 
            style={tabStyle(activeTab === "all")}>
            All
          </button>
          <button
            className="button"
            onClick={() => setActiveTab("friends")}
            style={tabStyle(activeTab === "friends")}
          >
            Friends
          </button>
        </div>

        <button
          className="button"
          onClick={() => setOpenModal(true)}
          style={{
            padding: "10px 16px",
            borderRadius: 12,
            border: "none",
            background: "#3f64d8",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            
          }}
        >
          Share Your Thoughts +
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? <p>Loading...</p> : <ThoughtsFeed thoughts={thoughts} />}
      </div>

      {openModal && (
        <CreateThought
          defaultVisibility={activeTab}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}

function tabStyle(active) {
  return {
    padding: "10px 18px",
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 18,
    color: "#2b4bbd",
    background: active ? "#dfe8ff" : "transparent",
  };
}
