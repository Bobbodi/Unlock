import { useNavigate } from "react-router-dom";

export default function QuestionOfDay() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap');

        .qotd-card {
          position: relative;
          border-radius: 20px;
          background: linear-gradient(145deg, #1a2255 0%, #2b3a8a 50%, #1e2d6b 100%);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow:
            0 8px 32px rgba(20, 30, 100, 0.45),
            0 2px 8px rgba(20, 30, 100, 0.3),
            inset 0 1px 0 rgba(194, 206, 255, 0.12);
        }

        /* Subtle noise texture overlay */
        .qotd-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.04;
          border-radius: inherit;
          z-index: 1;
          pointer-events: none;
        }

        /* Radial light source */
        .qotd-card::after {
          content: "";
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 80%;
          background: radial-gradient(
            ellipse,
            rgba(160, 180, 255, 0.18) 0%,
            transparent 70%
          );
          z-index: 1;
          pointer-events: none;
        }

        .qotd-card:hover {
          transform: translateY(-5px) scale(1.005);
          box-shadow:
            0 20px 60px rgba(20, 30, 100, 0.55),
            0 8px 20px rgba(20, 30, 100, 0.35),
            inset 0 1px 0 rgba(194, 206, 255, 0.18);
        }

        .qotd-card:hover .qotd-shimmer {
          opacity: 1;
          transform: translateX(100%) skewX(-15deg);
        }

        /* Decorative top rule */
        .qotd-rule {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(194, 206, 255, 0.6), transparent);
          margin: 0 auto 18px;
          position: relative;
          z-index: 2;
        }

        .qotd-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(194, 206, 255, 0.55);
          margin: 0 0 10px;
          position: relative;
          z-index: 2;
        }

        .qotd-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 42px;
          line-height: 1.05;
          color: #e8ecff;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 2;
        }

        .qotd-title em {
          font-style: italic;
          color: #c2ceff;
        }

        .qotd-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(194, 206, 255, 0.6);
          position: relative;
          z-index: 2;
          transition: color 0.25s ease, gap 0.25s ease;
        }

        .qotd-card:hover .qotd-cta {
          color: rgba(194, 206, 255, 0.9);
          gap: 12px;
        }

        .qotd-cta-line {
          width: 22px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .qotd-card:hover .qotd-cta-line {
          width: 36px;
        }

        /* Shimmer sweep on hover */
        .qotd-shimmer {
          position: absolute;
          top: 0;
          left: -80%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transform: translateX(0%) skewX(-15deg);
          transition: opacity 0.05s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          z-index: 3;
          pointer-events: none;
        }

        /* Corner accent */
        .qotd-corner {
          position: absolute;
          bottom: 20px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-right: 1px solid rgba(194, 206, 255, 0.12);
          border-bottom: 1px solid rgba(194, 206, 255, 0.12);
          z-index: 2;
          pointer-events: none;
        }
      `}</style>

      <div
        className="qotd-card"
        onClick={() => navigate("/qotd")}
        style={{
          width: "100%",
          padding: "32px 36px 28px",
          minHeight: 150,
          boxSizing: "border-box",
          marginBottom: 18,
          textAlign: "center",
        }}
      >
        <div className="qotd-shimmer" />
        <div className="qotd-corner" />

        <p className="qotd-eyebrow">Daily</p>
        <div className="qotd-rule" />
        <h2 className="qotd-title">
          Question <em>of the</em> Day
        </h2>
        <div className="qotd-cta">
          <span className="qotd-cta-line" />
          Explore
          <span className="qotd-cta-line" />
        </div>
      </div>
    </>
  );
}