import React, { useState } from "react";
import {
  adventurer,
  avataaars,
  lorelei,
  micah,
  openPeeps,
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AvatarModal({ visible, onClose }: Props) {
  const [seed, setSeed] = useState("your name");
  const [svg, setSvg] = useState("");
  const [styleStrName, setStyleStrName] = useState("lorelei");

  const transform = (style: string) => {
    switch (style) {
      case "adventurer":
        return adventurer;
      case "micah":
        return micah;
      case "openPeeps":
        return openPeeps;
      case "avataaars":
        return avataaars;
      default:
        return lorelei;
    }
  };

  const generateAvatar = () => {
    const avatar = createAvatar(transform(styleStrName) as any, { seed } as any).toString();
    setSvg(avatar);
  };

  if (!visible) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>Change Avatar</h3>

        <label style={{ display: "block", marginBottom: 8 }}>Style</label>
        <select
          value={styleStrName}
          onChange={(e) => setStyleStrName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        >
          <option value="lorelei">Lorelei</option>
          <option value="adventurer">Adventurer</option>
          <option value="micah">Micah</option>
          <option value="openPeeps">Open Peeps</option>
          <option value="avataaars">Avataaars</option>
        </select>

        <label style={{ display: "block", marginBottom: 8 }}>Seed</label>
        <input
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="Enter name"
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={generateAvatar} style={buttonStyle}>
            Generate Avatar
          </button>
          <button onClick={onClose} style={secondaryButtonStyle}>
            Close
          </button>
        </div>

        {svg && (
          <div style={{ marginTop: 8 }}>
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{ width: 160, height: 160 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: "90%",
  maxWidth: 540,
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 14px",
  background: "#2b4bbd",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  background: "#eee",
  color: "#222",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
