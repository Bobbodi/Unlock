import Sidebar from "../../components/Sidebar";
import QuestionOfDay from "../../components/QuestionOfDay";
import ThoughtsSection from "../../components/ThoughtsSection";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <QuestionOfDay />
        <div style={{ marginTop: 18, marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 750 }}>
            Space to Share 💫
          </h2>
          <div
            style={{
              height: 2,
              background: "rgba(0,0,0,0.08)",
              marginTop: 12,
            }}
          />
        </div>
        <ThoughtsSection />
      </main>
    </div>
  );
}


const layoutStyle = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

const sidebarWrapStyle = {
  width: 240,
  flexShrink: 0,
};

const mainStyle = {
  flex: 1,
  overflowY: "auto",
  padding: 24, 
};

const contentStyle = {
  width: "100%",      
  maxWidth: 1500,     
  margin: 0,          
};
