import Sidebar from "../../components/Sidebar";
import ProfileImage from "../../components/ProfileImage";
import ProfileSummary from "../../components/ProfileSummary";
import { PROFILEIMAGESIZE } from "../../utils/constants";
import { useState, useEffect } from "react";
import defaultPfp from "../../assets/images/default-pfp.jpg";

export default function Profile() {
  const [userPfp, setUserPfp] = useState(defaultPfp);
  const [userName, setUserName] = useState("Ruby Chan");
  const [userGender, setUserGender] = useState("Female");
  const [userBirth, setUserBirth] = useState(new Date("1999-07-18T00:00:00"));
  const [userFunFact, setUserFunFact] = useState(
    "Can solve a Rubik's cube in under a minute"
  );
  const [userAnimal, setUserAnimal] = useState("Red panda");
  const [userDistressMethod, setUserDistressMethod] = useState(
    "Listening to lo-fi music and journaling"
  );
  const [userCreatedAt, setUserCreatedAt] = useState(
    new Date("2025-01-12T14:30:00")
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --bg: #f0f3ff;
          --surface: #ffffff;
          --surface-raised: #e8edff;
          --border: rgba(43,75,189,0.1);
          --border-accent: rgba(43,75,189,0.3);
          --blue: #2b4bbd;
          --blue-dim: rgba(43,75,189,0.08);
          --blue-glow: rgba(43,75,189,0.2);
          --periwinkle: #c2ceff;
          --periwinkle-dim: rgba(194,206,255,0.4);
          --text-primary: #0f1b4d;
          --text-secondary: #3d4f82;
          --text-muted: #8a97c0;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .profile-page {
          display: flex;
          height: 100vh;
          background: var(--bg);
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
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

        /* Header */
        .profile-header {
          padding: 48px 56px 0;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .profile-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-header-eyebrow {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--blue);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .profile-header-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--blue);
        }

        .profile-header-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3.6rem;
          font-weight: 300;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .profile-header-title em {
          font-style: italic;
          color: var(--blue);
        }

        .profile-header-divider {
          margin-top: 28px;
          height: 1px;
          background: linear-gradient(to right, rgba(43,75,189,0.3), rgba(43,75,189,0.08) 60%, transparent);
        }

        /* Hero section */
        .profile-hero {
          padding: 48px 56px;
          width: 50%;
          align-self: center;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 56px;
          align-items: start;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }

        .profile-hero.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Avatar column */
        .profile-avatar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .profile-avatar-frame {
          position: relative;
          padding: 5px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            var(--blue),
            var(--periwinkle),
            var(--blue),
            var(--periwinkle),
            var(--blue)
          );
          box-shadow:
            0 0 0 1px var(--surface),
            0 20px 60px rgba(43,75,189,0.2),
            0 0 80px var(--blue-glow);
          border-radius: 50%;
        }

        .profile-avatar-inner {
          background: var(--surface);
          border-radius: 50%;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-avatar-inner img,
        .profile-avatar-inner > * {
          border-radius: 50%;
          display: block;
        }

        .profile-online-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--blue);
          letter-spacing: 0.05em;
        }

        .profile-online-dot {
          width: 7px;
          height: 7px;
          background: var(--blue);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--blue);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        /* Info column */
        .profile-info-col {
          display: flex;
          flex-direction: column;
          align-items: flex-center;
          gap: 8px;
          padding-top: 8px;
        }

        .profile-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .profile-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .profile-chip {
          font-size: 0.73rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid;
        }

        .profile-chip--teal {
          color: var(--blue);
          border-color: var(--border-accent);
          background: var(--blue-dim);
        }

        .profile-chip--gold {
          color: #3a5cd6;
          border-color: rgba(194,206,255,0.6);
          background: var(--periwinkle-dim);
        }

        .profile-chip--muted {
          color: var(--text-secondary);
          border-color: var(--border);
          background: rgba(43,75,189,0.04);
        }

        /* Stats row */
        .profile-stats {
          display: flex;
          gap: 0;
          margin-top: 20px;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          background: var(--surface);
        }

        .profile-stat {
            display: flex;
            flex-direction: column;
            gap: 6px;

            flex: 1;
            padding: 16px 20px;
            border-right: 1px solid var(--border);
            transition: background 0.2s ease;
        }

        .profile-stat:last-child {
          border-right: none;
        }

        .profile-stat:hover {
          background: var(--surface-raised);
        }

        .profile-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 4px;
        }

        .profile-stat-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* Sections grid */
        .profile-sections {
          padding: 0 56px 56px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }

        .profile-sections.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-section-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 22px 24px;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          cursor: default;
        }

        .profile-section-card:hover {
          border-color: rgba(43,75,189,0.25);
          background: var(--surface-raised);
          transform: translateY(-2px);
        }

        .profile-section-icon {
          font-size: 1.3rem;
          margin-bottom: 12px;
          display: block;
        }

        .profile-section-label {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 8px;
        }

        .profile-section-value {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-weight: 300;
        }

        
      `}</style>

      <div className="profile-page">
        <Sidebar />

        <main className="profile-main">
          {/* Header */}
          <div className={`profile-header ${mounted ? "visible" : ""}`}>
            <div className="profile-header-eyebrow">Your profile</div>
            <h1 className="profile-header-title">
              My Gallery
            </h1>
            <div className="profile-header-divider" />
          </div>

          {/* Hero */}
          <div className={`profile-hero ${mounted ? "visible" : ""}`}>
            <div className="profile-avatar-col">
              <div className="profile-avatar-frame">
                <div className="profile-avatar-inner">
                  <ProfileImage userPfp={userPfp} size={PROFILEIMAGESIZE} />
                </div>
              </div>
            
            </div>

            <div className="profile-info-col">
              <div className="profile-name">{userName}</div>

              <div className="profile-meta-row">
                <span className="profile-chip profile-chip--teal">{userGender}</span>
                <span className="profile-chip profile-chip--teal">
                  Born {userBirth.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="profile-chip profile-chip--teal">
                  {Math.floor((new Date() - userBirth) / (365.25 * 24 * 60 * 60 * 1000))} years old
                </span>
              </div>

              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="profile-stat-value">
                    {Math.floor((new Date() - userCreatedAt) / (24 * 60 * 60 * 1000))}
                  </div>
                  <div className="profile-stat-label">Days joined</div>
                </div>

                <div className="profile-stat">
                  <div className="profile-stat-value">
                    {" "}
                    <strong>
                        {userCreatedAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        })}
                    </strong>
                  </div>
                  <div className="profile-stat-label">Since</div>
                </div>

                
              </div>
            </div>
          </div>

          {/* Section cards */}
          <div className={`profile-sections ${mounted ? "visible" : ""}`}>
            <div className="profile-section-card">
              <span className="profile-section-icon">🐾</span>
              <div className="profile-section-label">Spirit Animal</div>
              <p className="profile-section-value">{userAnimal}</p>
            </div>

            <div className="profile-section-card">
              <span className="profile-section-icon">✨</span>
              <div className="profile-section-label">Fun Fact</div>
              <p className="profile-section-value">{userFunFact}</p>
            </div>

            <div className="profile-section-card">
              <span className="profile-section-icon">🧘</span>
              <div className="profile-section-label">When Stressed</div>
              <p className="profile-section-value">{userDistressMethod}</p>
            </div>
          </div>

        
        </main>
      </div>
    </>
  );
}