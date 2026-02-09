export default function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <div style={topGroupStyle}>
        <button style={iconBtnStyle}>👤</button>
        <button style={iconBtnStyle}>🏠</button>
        <button style={iconBtnStyle}>💬</button>
      </div>

      <button style={iconBtnStyle}>⏻</button>
    </div>
  );
}

const sidebarStyle = {
  width: 80,
  height: "100vh",
  background: "#90ABEF",
  padding: "20px 0",              // smaller so bottom isn’t clipped
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",        // important: padding included in height
};

const topGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 22,
  alignItems: "center",
};

const iconBtnStyle = {
  width: 56,
  height: 56,
  borderRadius: 16,
  border: "none",
  background: "rgba(255,255,255,0.9)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  fontSize: 22,
};
