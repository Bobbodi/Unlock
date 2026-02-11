import Sidebar from "../../components/Sidebar";
import ProfileImage from "../../components/ProfileImage";

import { PROFILEIMAGESIZE } from "../../utils/constants";
import { useState, useEffect } from "react";
import defaultPfp from "../../assets/images/default-pfp.jpg";
import AvatarModal from "./AvatarModel.tsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { getProfileInfo } from "../../api/userProfile";

export default function Profile() {
  const navigate = useNavigate();
  const [userPfp, setUserPfp] = useState(null);
  const [userName, setUserName] = useState("Ruby Chan");
  const [userGender, setUserGender] = useState("Female");
  const [userBirth, setUserBirth] = useState(new Date("1999-07-18T00:00:00"));
  const [loading, setLoading] = useState(false);
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

  const [question] = useState(
    "Do you think mental health is something that should be talked about more today?",
  );

  const [userComments, setUserComments] = useState([]);

  const [mounted, setMounted] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const goToInfo = () => {
    navigate("/info");
  };

  const load = async () => {
  setLoading(true);
  try {
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw userErr;

    const user = userRes?.user;
    if (!user) throw new Error("Not logged in");

    const datas = await getProfileInfo(user.id);

    setUserName(datas.data.userName);
    setUserAnimal(datas.data.animal);
    setUserGender(datas.data.gender);
    setUserBirth(new Date(datas.data.birth));
    setUserDistressMethod(datas.data.distressMethod);
    setUserPfp(datas.data.profilePic);
    setUserFunFact(datas.data.funFact);
    setUserCreatedAt(new Date(datas.data.created_at));
    setUserComments(datas.thoughts || []);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
      load();
    }, []);


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

        /* ── Feed list ── */
        .tf-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── Individual card ── */
        .tf-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(43, 75, 189, 0.08);
          padding: 18px 20px 16px;
          box-shadow: 0 2px 12px rgba(43, 75, 189, 0.06);
          transition: box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.23,1,0.32,1);
          animation: tf-in 0.3s ease both;
        }

        .tf-card:hover {
          box-shadow: 0 6px 24px rgba(43, 75, 189, 0.11);
          transform: translateY(-2px);
        }

        @keyframes tf-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* stagger */
        .tf-card:nth-child(1)  { animation-delay: 0.03s; }
        .tf-card:nth-child(2)  { animation-delay: 0.07s; }
        .tf-card:nth-child(3)  { animation-delay: 0.11s; }
        .tf-card:nth-child(4)  { animation-delay: 0.15s; }
        .tf-card:nth-child(5)  { animation-delay: 0.19s; }

        /* ── Card inner layout ── */
        .tf-card-body {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        /* Avatar column */
        .tf-avatar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .tf-avatar-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(135deg, #c2ceff, #7b93e8);
          flex-shrink: 0;
        }

        .tf-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          display: block;
          border: 2px solid #fff;
        }

        /* Anon avatar */
        .tf-avatar-anon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #dfe6ff, #c2ceff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 16px;
          color: rgba(43,75,189,0.45);
          border: 2px solid #fff;
          user-select: none;
        }

        /* Thread line */
        .tf-thread {
          width: 1.5px;
          flex: 1;
          min-height: 24px;
          margin-top: 5px;
          background: linear-gradient(180deg, rgba(43,75,189,0.12) 0%, transparent 100%);
          border-radius: 99px;
        }

        /* Content column */
        .tf-content-col {
          flex: 1;
          min-width: 0;
        }

        .tf-author {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--navy);
          margin: 0 0 6px;
          /* nudge to align with avatar center */
          padding-top: 3px;
        }

        .tf-author-anon {
          color: rgba(43,75,189,0.45);
          font-style: italic;
          text-transform: none;
          letter-spacing: 0.04em;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
        }

        .tf-text {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 17px;
          line-height: 1.65;
          color: rgba(26, 34, 85, 0.82);
          margin: 0;
          word-break: break-word;
        }

        /* Container for the top row of the comment card */
.tf-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

/* The "Question Asked" tag */
.tf-question-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--blue);
  background: var(--blue-dim);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Date positioning */
.tf-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: 'Outfit', sans-serif;
}

/* The style for the prompt question */
.tf-question-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 12px;
  font-style: italic;
}

/* Subtle line between question and user answer */
.tf-answer-divider {
  width: 30px;
  height: 2px;
  background: var(--periwinkle);
  margin-bottom: 12px;
  border-radius: 2px;
}

/* Refined answer text */
.tf-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: var(--text-primary);
  line-height: 1.5;
}

/* Fix for avatar div when using dangerouslySetInnerHTML */
.tf-avatar-img svg, .tf-avatar-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
}

        
      `}</style>

      <div className="profile-page">
        <Sidebar />

        <main className="profile-main">
          {/* Header */}
<div className={`profile-header ${mounted ? "visible" : ""}`}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <div className="profile-header-eyebrow">Your profile</div>
      <h1 className="profile-header-title">
        My Gallery
      </h1>
    </div>
    <button onClick={goToInfo} style={{
      padding: '8px 16px',
      borderRadius: '6px',
      border: '1px solid #2b4bbd',
      background: 'white',
      color: '#2b4bbd',
      cursor: 'pointer',
      fontSize: '1rem',
      fontFamily: 'Outfit, sans-serif',
    }}>
      Edit Profile
    </button>
  </div>
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
              <button className="profile-chip profile-chip--teal" onClick={() => setModalVisible(true)}>
                Change avatar
              </button>

              {modalVisible && (
                <AvatarModal
                  visible={modalVisible}
                  onClose={async () => {
                    setModalVisible(false);
                    await load();
                  }}
                />
              )}
              
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

          {/* User past comments */}

          {/* User past comments */}

  
<div className={`profile-comments-container ${mounted ? "visible" : ""}`} 
     style={{ padding: '0 56px 56px', opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}>
  
  <h2 style={{ 
    fontFamily: 'Cormorant Garamond, serif', 
    fontSize: '2rem', 
    color: 'var(--text-primary)',
    marginBottom: '24px' 
  }}> 
    Thoughts I've Shared
  </h2>
  {console.log(userComments)}
  {console.log(userComments.length)}
  {userComments.length === 0 ? (
    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No comments yet.</p>
  ) : (
    <div className="tf-list">
      {userComments.map((t, i) => (
  <div key={i} className="tf-card">
    <div className="tf-card-body">
      {/* Left: Avatar Column */}
      <div className="tf-avatar-col">
        <div className="tf-avatar-ring">
          {userPfp ? (
            <div
              className="tf-avatar-img"
              dangerouslySetInnerHTML={{ __html: userPfp }}
            />
          ) : (
            <div className="tf-avatar-anon">?</div>
          )}
        </div>
        <div className="tf-thread" />
      </div>

      {/* Right: Content Column */}
      <div className="tf-content-col">
        <div className="tf-card-top">
          <span className="tf-question-label">Question Asked</span>
          <span className="tf-date">
            {new Date(t.created_at).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <p className="tf-question-text">"{question}"</p>
        
        <div className="tf-answer-divider"></div>
        
        <p className="tf-text">{t.thoughts}</p>
      </div>
    </div>
  </div>
))}
    </div>
  )}
</div>

          </main> 
      </div>
    </>
  );
}
