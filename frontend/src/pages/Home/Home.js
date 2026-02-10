import Sidebar from "../../components/Sidebar";
import QuestionOfDay from "../../components/QuestionOfDay";
import ThoughtsSection from "../../components/ThoughtsSection";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');
        :root {
          --bg: #f4f6ff;
          --blue: #2b4bbd;
          --navy: #1a2255;
          --periwinkle: #c2ceff;
          --border: rgba(43, 75, 189, 0.1);
        }
        .home-page {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: var(--bg);
          position: relative;
        }
        .home-page::before {
          content: '';
          position: fixed;
          top: -160px;
          right: -80px;
          width: 640px;
          height: 640px;
          background: radial-gradient(circle, rgba(194, 206, 255, 0.55) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }
        .home-bg-orb2 {
          position: fixed;
          bottom: -180px;
          left: 160px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(43, 75, 189, 0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .home-bg-orb3 {
          position: fixed;
          top: 40%;
          left: -100px;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(194, 206, 255, 0.3) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .home-main {
          flex: 1;
          overflow-y: auto;
          padding: 28px 32px 48px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .home-main::-webkit-scrollbar { width: 5px; }
        .home-main::-webkit-scrollbar-track { background: transparent; }
        .home-main::-webkit-scrollbar-thumb {
          background: rgba(43, 75, 189, 0.12);
          border-radius: 99px;
        }
        .home-content {
          width: 100%;
        }
        .home-section-header {
          margin: 28px 0 18px;
        }
        .home-section-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.45);
          margin: 0 0 7px;
        }
        .home-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 32px;
          color: var(--navy);
          margin: 0;
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .home-section-title em {
          font-style: italic;
          color: var(--blue);
        }
        .home-section-rule {
          margin-top: 14px;
          height: 1px;
          background: linear-gradient(90deg, var(--border) 0%, transparent 80%);
          border: none;
        }
      `}</style>
      <div className="home-bg-orb2" />
      <div className="home-bg-orb3" />
      <div className="home-page">
        <Sidebar />
        <main className="home-main">
          <div className="home-content">
            <QuestionOfDay />
            <div className="home-section-header">
              <p className="home-section-eyebrow">Community</p>
              <h2 className="home-section-title">Space to <em>Share</em></h2>
              <hr className="home-section-rule" />
            </div>
            <ThoughtsSection />
          </div>
        </main>
      </div>
    </>
  );
}