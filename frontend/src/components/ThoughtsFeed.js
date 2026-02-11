import { useNavigate } from "react-router-dom";

export default function ThoughtsFeed({ thoughts }) {
  const navigate = useNavigate();

  if (!thoughts || thoughts.length === 0) {
    return (
      <p className="tf-empty">No thoughts yet — be the first to share.</p>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap');

        :root {
          --blue: #2b4bbd;
          --navy: #1a2255;
          --periwinkle: #c2ceff;
        }

        /* ── Empty state ── */
        .tf-empty {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 17px;
          color: rgba(43, 75, 189, 0.4);
          margin: 8px 0 0;
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

        /* 1. Add overflow: hidden to the ring */
.tf-avatar-ring {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #c2ceff, #7b93e8);
  flex-shrink: 0;
  overflow: hidden; /* This clips the image to the circle */
  display: flex;    /* Helps center the injected content */
  align-items: center;
  justify-content: center;
}

/* 2. Force the injected SVG or HTML to behave */
.tf-avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  overflow: hidden;
}

/* 3. Specifically target the SVG tag inside tf-avatar-img */
.tf-avatar-img svg {
  width: 100% !important;
  height: 100% !important;
  display: block;
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
          color: rgba(43,75,189,0.8);
          font-style: italic;
          text-transform: none;
          letter-spacing: 0.04em;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
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

        /* ── Card footer ── */
        .tf-card-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 14px;
          /* indent to align with content */
          padding-left: 54px;
        }

        /* Reply button */
        .tf-reply-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 9px;
          border: 1px solid rgba(43, 75, 189, 0.18);
          background: transparent;
          color: var(--blue);
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
          outline: none;
        }

        .tf-reply-btn:hover {
          background: rgba(194, 206, 255, 0.3);
          border-color: rgba(43, 75, 189, 0.32);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="tf-list">
        {thoughts.map((t, i) => {
          const isAnon = t.isAnonymous;
          return (
            <div key={t.id} className="tf-card" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="tf-card-body">

                {/* Avatar + thread */}
                <div className="tf-avatar-col">
                  <div className="tf-avatar-ring">
                    {isAnon
                      ? <div className="tf-avatar-anon">?</div>
                      : 
                        <div
                          className="tf-avatar-img"
                          dangerouslySetInnerHTML={{ __html: t.userPfp }}
                        />

                    }
                  </div>
                  <div className="tf-thread" />
                </div>

                {/* Content */}
                <div className="tf-content-col">
                  {isAnon
                    ? <p className="tf-author tf-author-anon">Anonymous</p>
                    : <p className="tf-author">{t.authorName}</p>
                  }
                  <p className="tf-text">{t.content}</p>
                </div>

              </div>

              {/* Footer: reply button aligned under content */}
              <div className="tf-card-footer">
                <button
                  className="tf-reply-btn"
                  onClick={() => navigate("/chat?dm=" + t.user_id)}
                >
                  ↩ Reply
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}