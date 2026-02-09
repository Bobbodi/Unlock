import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={sidebarStyle}>
      <div style={topGroupStyle}>
        <button
          style={navBtnStyle(location.pathname === "/profile")}
          onClick={() => navigate("/profile")}
          aria-label="Profile"
        >
          👤
        </button>

        <button
          style={navBtnStyle(location.pathname === "/home")}
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          🏠
        </button>

        <button
          style={navBtnStyle(location.pathname === "/chat")}
          onClick={() => navigate("/chat")}
          aria-label="Chat"
        >
          💬
        </button>
      </div>

      <button
        style={navBtnStyle(false)}
        onClick={() => navigate("/login")}
        aria-label="Logout"
      >
        ⏻
      </button>
    </div>
  );
}

const sidebarStyle = {
  width: 80,
  height: "100vh",
  background: "#90ABEF",
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
};

const topGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 22,
  alignItems: "center",
};

const baseBtn = {
  width: 56,
  height: 56,
  borderRadius: 16,
  border: "none",
  background: "rgba(255,255,255,0.9)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  fontSize: 22,
  transition: "transform 120ms ease, filter 120ms ease, outline 120ms ease",
};

function navBtnStyle(active) {
  return {
    ...baseBtn,
    outline: active ? "3px solid rgba(0,0,0,0.18)" : "none",
  };
}
