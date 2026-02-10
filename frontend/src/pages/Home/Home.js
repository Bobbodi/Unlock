import Sidebar from "../../components/Sidebar";
import QuestionOfDay from "../../components/QuestionOfDay";
import ThoughtsSection from "../../components/ThoughtsSection";

export default function Home() {

  return (
    <>
    <style>{`
        :root {
          --bg: #f0f3ff;
        }

        .profile-page {
          display: flex;
          height: 100vh;
          background: var(--bg);
          overflow: hidden;
        }

        .profile-main {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
          position: relative;
        }

      /* Ambient background glow */
        .profile-main::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(43,75,189,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .profile-main::after {
          content: '';
          position: fixed;
          bottom: -200px;
          left: 200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(194,206,255,0.4) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
    `}</style>
    <div className="profile-page" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <main className="profile-main" style={{ flex: 1, overflowY: "auto", padding: 24 }}>
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
    </>
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
