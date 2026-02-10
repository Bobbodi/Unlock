import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";

const FIELDS = [
  {
    key: "userName",
    label: "Username",
    hint: "How should we call you?",
    type: "input",
    inputType: "text",
    placeholder: "e.g. stargazer99",
    emoji: "✦",
  },
  {
    key: "gender",
    label: "Gender",
    hint: "Feel free to describe however you like",
    type: "input",
    inputType: "text",
    placeholder: "e.g. she/her, non-binary, prefer not to say…",
    emoji: "◈",
  },
  {
    key: "birth",
    label: "Birthday",
    hint: "When do we get to celebrate you?",
    type: "input",
    inputType: "date",
    placeholder: "",
    emoji: "◇",
  },
  {
    key: "funFact",
    label: "Fun Fact",
    hint: "Something surprising or delightful about you",
    type: "textarea",
    placeholder: "I once hiked a volcano in flip-flops…",
    emoji: "✺",
  },
  {
    key: "animal",
    label: "Your Spirit Animal",
    hint: "Which animal best represents you, and why?",
    type: "textarea",
    placeholder: "A crow — clever, adaptable, and slightly chaotic…",
    emoji: "❋",
  },
  {
    key: "distressMethod",
    label: "How You Unwind",
    hint: "What do you usually do to de-stress?",
    type: "textarea",
    placeholder: "Long walks, cooking, journaling, video games…",
    emoji: "◉",
  },
];

const Info = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "", gender: "", birth: "",
    funFact: "", animal: "", distressMethod: "",
  });
  const [saving, setSaving] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("info").select("*").eq("user_id", user.id).single();
        if (data) setForm({
          userName: data.userName || "",
          gender: data.gender || "",
          birth: data.birth || "",
          funFact: data.funFact || "",
          animal: data.animal || "",
          distressMethod: data.distressMethod || "",
        });
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert("No user logged in!"); setSaving(false); return; }

    const { error } = await supabase.from("info").upsert(
      { user_id: user.id, ...form },
      { onConflict: "user_id" }
    );

    setSaving(false);
    if (error) {
      console.error(error);
      alert("Error saving: " + error.message);
    } else {
      navigate("/home");
    }
  };

  const filledCount = Object.values(form).filter(Boolean).length;
  const progress = Math.round((filledCount / FIELDS.length) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tenor+Sans&display=swap');

        :root {
          --bg: #f4f6ff;
          --blue: #2b4bbd;
          --navy: #1a2255;
          --periwinkle: #c2ceff;
          --border: rgba(43, 75, 189, 0.12);
          --border-focus: rgba(43, 75, 189, 0.45);
        }

        * { box-sizing: border-box; }

        .info-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 48px 16px 64px;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient orbs */
        .info-page::before {
          content: '';
          position: fixed;
          top: -120px; right: -60px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(194,206,255,0.6) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .info-page::after {
          content: '';
          position: fixed;
          bottom: -160px; left: 80px;
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(43,75,189,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* Card */
        .info-card {
          width: 100%;
          max-width: 620px;
          background: #fff;
          border-radius: 28px;
          padding: 44px 48px 40px;
          box-shadow:
            0 16px 48px rgba(20, 30, 100, 0.1),
            0 2px 8px rgba(20, 30, 100, 0.06);
          position: relative;
          z-index: 1;
          animation: card-in 0.4s cubic-bezier(0.23,1,0.32,1) forwards;
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top accent stripe */
        .info-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2b4bbd, #8fa3e8, #2b4bbd);
          border-radius: 28px 28px 0 0;
        }

        /* Header */
        .info-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(43,75,189,0.45);
          margin: 0 0 8px;
        }

        .info-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 34px;
          color: var(--navy);
          margin: 0 0 6px;
          line-height: 1.05;
          letter-spacing: -0.01em;
        }

        .info-title em {
          font-style: italic;
          color: var(--blue);
        }

        .info-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 15px;
          color: rgba(43,75,189,0.45);
          margin: 0 0 28px;
        }

        /* Progress bar */
        .info-progress-wrap {
          margin-bottom: 32px;
        }

        .info-progress-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 7px;
        }

        .info-progress-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(43,75,189,0.4);
        }

        .info-progress-pct {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          color: rgba(43,75,189,0.6);
        }

        .info-progress-track {
          height: 4px;
          background: rgba(43,75,189,0.08);
          border-radius: 99px;
          overflow: hidden;
        }

        .info-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2b4bbd, #8fa3e8);
          border-radius: 99px;
          transition: width 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        /* Fields */
        .info-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-field {
          display: flex;
          flex-direction: column;
          gap: 0;
          animation: field-in 0.35s ease both;
        }

        @keyframes field-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .info-field:nth-child(1) { animation-delay: 0.05s; }
        .info-field:nth-child(2) { animation-delay: 0.10s; }
        .info-field:nth-child(3) { animation-delay: 0.15s; }
        .info-field:nth-child(4) { animation-delay: 0.20s; }
        .info-field:nth-child(5) { animation-delay: 0.25s; }
        .info-field:nth-child(6) { animation-delay: 0.30s; }

        .info-field-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 5px;
        }

        .info-field-emoji {
          font-size: 11px;
          color: rgba(43,75,189,0.4);
          line-height: 1;
        }

        .info-field-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--navy);
        }

        .info-field-hint {
          font-family: 'Cormorant Garamond', serif;
          
          font-size: 14px;
          color: rgba(0, 15, 70, 0.99);
          margin-left: auto;
        }

        /* Inputs & textareas */
        .info-input,
        .info-textarea {
          width: 100%;
          padding: 12px 15px;
          border-radius: 13px;
          border: 1.5px solid var(--border);
          background: rgba(43,75,189,0.02);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 300;
          color: var(--navy);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          caret-color: var(--blue);
        }

        .info-input::placeholder,
        .info-textarea::placeholder {
          color: rgba(43,75,189,0.25);
          font-style: italic;
        }

        .info-input:focus,
        .info-textarea:focus {
          border-color: var(--border-focus);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(43,75,189,0.07);
        }

        /* Date input special treatment */
        .info-input[type="date"] {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(26,34,85,0.7);
        }

        .info-textarea {
          min-height: 88px;
          resize: none;
          line-height: 1.6;
        }

        /* Divider */
        .info-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
          margin: 10px 0 4px;
          border: none;
        }

        /* Footer actions */
        .info-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
        }

        /* Logout — ghost */
        .info-logout-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 9px 16px;
          border-radius: 10px;
          border: 1px solid rgba(43,75,189,0.15);
          background: transparent;
          color: rgba(43,75,189,0.5);
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          outline: none;
        }

        .info-logout-btn:hover {
          background: rgba(194,206,255,0.2);
          color: var(--blue);
          border-color: rgba(43,75,189,0.28);
        }

        /* Submit — primary */
        .info-submit-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #2b4bbd 0%, #1a2f85 100%);
          color: #e8ecff;
          cursor: pointer;
          box-shadow:
            0 4px 16px rgba(43,75,189,0.35),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition:
            transform 0.2s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.2s cubic-bezier(0.23,1,0.32,1),
            opacity 0.2s;
          outline: none;
        }

        .info-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 8px 24px rgba(43,75,189,0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .info-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .info-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .info-card { padding: 32px 24px 28px; }
          .info-title { font-size: 28px; }
          .info-field-hint { display: none; }
        }
      `}</style>

      <div className="info-page">
        <div className="info-card">
          {/* Header */}
          <p className="info-eyebrow">Getting started</p>
          <h1 className="info-title">Tell us about <em>yourself</em></h1>
          <p className="info-subtitle">A few details to personalise your experience</p>

          {/* Progress */}
          <div className="info-progress-wrap">
            <div className="info-progress-meta">
              <span className="info-progress-label">Profile completion</span>
              <span className="info-progress-pct">{progress}%</span>
            </div>
            <div className="info-progress-track">
              <div className="info-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Fields */}
          <div className="info-fields">
            {FIELDS.map(({ key, label, hint, type, inputType, placeholder, emoji }) => (
              <div className="info-field" key={key}>
                <div className="info-field-header">
                  <span className="info-field-emoji">{emoji}</span>
                  <span className="info-field-label">{label}</span>
                  <span className="info-field-hint">{hint}</span>
                </div>
                {type === "input" ? (
                  <input
                    className="info-input"
                    type={inputType}
                    value={form[key]}
                    onChange={handleChange(key)}
                    placeholder={placeholder}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                  />
                ) : (
                  <textarea
                    className="info-textarea"
                    value={form[key]}
                    onChange={handleChange(key)}
                    placeholder={placeholder}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                  />
                )}
              </div>
            ))}
          </div>

          <hr className="info-divider" />

          {/* Footer */}
          <div className="info-footer">
            <button className="info-logout-btn" onClick={handleLogout}>
              Sign out
            </button>
            <button
              className="info-submit-btn"
              onClick={handleSubmit}
              disabled={saving || !form.userName.trim()}
            >
              <em style={{ fontStyle: "normal", opacity: 1 }}>✦</em>
              {saving ? "Saving…" : "Save & continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;