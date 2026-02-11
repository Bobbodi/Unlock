import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useStream } from "../contexts/streamClientContext";
import defaultPfp from "../assets/images/default-pfp.jpg";
import homeIcon from "../assets/images/home-icon-center.png";
import chatIcon from "../assets/images/chat-icon.jpg";
import { SIDEBAR_IMAGE_SIZE } from "../utils/constants";

import { useState } from "react";
import "./ProfileImage.css";

function labelStyle(active) {
  return {
    color: "#384b95",
    fontFamily: "'Tenor Sans', sans-serif",
    fontSize: 14,
    textAlign: "center",
    marginTop: -20,
    marginBottom: 0,
    fontWeight: active ? 700 : 400,
  };
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userPfp, setUserPfp] = useState(defaultPfp);

  return (
    <div style={sidebarStyle}>
      <div style={topGroupStyle}>
        <button
          style={navBtnStyle(location.pathname === "/profile")}
          onClick={() => navigate("/profile")}
          aria-label="Profile"
        >
          <img
            src={userPfp}
            alt="Profile"
            style={{
              width: SIDEBAR_IMAGE_SIZE,
              height: SIDEBAR_IMAGE_SIZE,
              objectFit: "cover",
              borderRadius: 16,
              objectPosition: "center",
            }}
          />
        </button>
        <p style={labelStyle(location.pathname === "/profile")}>Profile</p>

        <button
          style={navBtnStyle(location.pathname === "/home")}
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          <img
            src={homeIcon}
            alt="Home"
            style={{
              width: SIDEBAR_IMAGE_SIZE,
              height: SIDEBAR_IMAGE_SIZE,
              objectFit: "cover",
              borderRadius: 16,
              objectPosition: "center",
            }}
          />
        </button>
        <p style={labelStyle(location.pathname === "/home")}>Home</p>

        <button
          style={navBtnStyle(location.pathname === "/chat")}
          onClick={() => navigate("/chat")}
          aria-label="Chat"
        >
          <img
            src={chatIcon}
            alt="Chat"
            style={{
              width: SIDEBAR_IMAGE_SIZE,
              height: SIDEBAR_IMAGE_SIZE,
              objectFit: "cover",
              borderRadius: 16,
              objectPosition: "center",
            }}
          />
        </button>
        <p style={labelStyle(location.pathname === "/chat")}>Chat</p>
      </div>

      <div>
        <button
          style={navBtnStyle(false)}
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/login");
          }}
          aria-label="Logout"
        >
          ⏻
        </button>
        <p
          style={{
            color: "#384b95",
            fontSize: 14,
            fontFamily: "'Tenor Sans', sans-serif",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          Logout
        </p>
      </div>
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
  minWidth: 80,
  boxShadow: "2px 0 15px rgba(20, 30, 100, 0.35)",
  zIndex: 5,
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
    outline: active ? "2px solid #384b95" : "none",
  };
}
