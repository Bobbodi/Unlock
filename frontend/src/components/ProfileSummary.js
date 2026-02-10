import React, { useEffect, useState } from "react";

const ProfileSummary = ({
  userName = "Alexandra Chen",
  userGender = "She / Her",
  userBirth = new Date("1995-03-14"),
  userFunFact = "Once ate an entire wheel of brie in one sitting and would absolutely do it again.",
  userAnimal = "Octopus — clever, adaptable, and always hiding in plain sight.",
  userDistressMethod = "Long walks with podcasts, followed by aggressively reorganizing a drawer.",
  userCreatedAt = new Date("2023-09-01"),
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const age = Math.floor(
    (new Date() - userBirth) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const sections = [
    { emoji: "🐾", label: "Spirit Animal", value: userAnimal },
    { emoji: "✨", label: "Fun Fact", value: userFunFact },
    { emoji: "🧘", label: "When Stressed", value: userDistressMethod },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ps-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #faf8f5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .ps-card {
          background: #fff;
          max-width: 480px;
          width: 100%;
          border: 1px solid #e8e2d9;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 40px rgba(0,0,0,0.06);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .ps-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ps-header {
          padding: 40px 40px 32px;
          border-bottom: 1px solid #f0ebe3;
          position: relative;
          background: linear-gradient(to bottom right, #fff, #fdfaf6);
        }

        .ps-accent-line {
          width: 36px;
          height: 3px;
          background: #c9a96e;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .ps-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #1a1714;
          margin: 0 0 8px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .ps-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .ps-meta-pill {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8b7d6b;
          background: #f5f0e8;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .ps-meta-dot {
          width: 3px;
          height: 3px;
          background: #c9b99a;
          border-radius: 50%;
        }

        .ps-body {
          padding: 0;
        }

        .ps-section {
          padding: 22px 40px;
          border-bottom: 1px solid #f5f1eb;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          cursor: default;
        }

        .ps-section.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .ps-section:hover {
          background: #fdfaf6;
        }

        .ps-section:last-child {
          border-bottom: none;
        }

        .ps-section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .ps-section-emoji {
          font-size: 0.9rem;
          line-height: 1;
        }

        .ps-section-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .ps-section-value {
          font-size: 0.97rem;
          color: #3d3530;
          line-height: 1.65;
          margin: 0;
          font-weight: 300;
        }

        .ps-footer {
          padding: 16px 40px;
          background: #f7f3ee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #ede7dc;
        }

        .ps-joined {
          font-size: 0.78rem;
          color: #a8998a;
          letter-spacing: 0.04em;
        }

        .ps-joined span {
          font-style: italic;
          font-family: 'Playfair Display', serif;
          color: #8b7d6b;
        }

        .ps-age-badge {
          font-size: 0.75rem;
          font-weight: 500;
          color: #8b7d6b;
          background: #ede7dc;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        .ps-corner-detail {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          border-bottom-left-radius: 60px;
          background: linear-gradient(135deg, #f5f0e8, #ede7dc);
          opacity: 0.7;
        }
      `}</style>

      <div className="ps-wrapper">
        <div className={`ps-card ${visible ? "visible" : ""}`}>
          <div className="ps-header">
            <div className="ps-corner-detail" />
            <div className="ps-accent-line" />
            <h2 className="ps-name">{userName}</h2>
            <div className="ps-meta">
              <span className="ps-meta-pill">{userGender}</span>
              <div className="ps-meta-dot" />
              <span className="ps-meta-pill">Born {formatDate(userBirth)}</span>
            </div>
          </div>

          <div className="ps-body">
            {sections.map((s, i) => (
              <div
                key={s.label}
                className={`ps-section ${visible ? "visible" : ""}`}
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
              >
                <div className="ps-section-header">
                  <span className="ps-section-emoji">{s.emoji}</span>
                  <span className="ps-section-label">{s.label}</span>
                </div>
                <p className="ps-section-value">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="ps-footer">
            <p className="ps-joined">
              Member since <span>{formatDate(userCreatedAt)}</span>
            </p>
            <span className="ps-age-badge">{age} years old</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSummary;