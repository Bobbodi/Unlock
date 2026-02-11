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

const Info = (props) => {
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
          profilePic: data.profilePic || `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980" fill="none" shape-rendering="auto"><metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Lorelei</dc:title><dc:creator>Lisa Wischofsky</dc:creator><dc:source xsi:type="dcterms:URI">https://www.figma.com/community/file/1198749693280469639</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>Remix of „Lorelei” (https://www.figma.com/community/file/1198749693280469639) by „Lisa Wischofsky”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="980" height="980" rx="0" ry="0" x="0" y="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><g transform="translate(10 -60)"><path d="M495 234c28 1 56 6 84 15a201 201 0 0 1 100 65c19 25 31 55 35 86a361 361 0 0 1 2 101l-5 34-4 20c-1 2-1 2-3 2-2-4-2-8-2-12-1-15 1-29 2-44 1-24 3-48 1-72l-6-45c-7-28-20-54-40-75-18-18-40-33-63-43-22-9-44-15-67-19-18-3-36-4-54-4a277 277 0 0 0-128 29c-13 9-25 20-35 32a276 276 0 0 0-55 139c-1 24 0 47 8 70l7 15 12 1 1 3c-3 2-7 2-11 3-10 2-20 6-29 12-7 5-14 11-18 19-5 10-3 22-1 33 5 19 17 37 33 49 11 9 25 14 39 16 10 2 20 0 30-1 5 4 8 12 11 17l18 27a136 136 0 0 0 66 50c22 9 45 14 68 19l41 8 17 5v4h-12a535 535 0 0 1-67-8 255 255 0 0 1-84-33c-11-7-21-16-29-27a214 214 0 0 1-16 123c-15 27-40 48-70 57-3 1-7 2-10 1-2 0-2-1-2-3 1-3 4-5 6-6 12-8 26-14 38-23 13-11 24-23 31-38 6-15 10-32 12-49 2-13 3-26 2-40l-4-38-18-36-19 4a88 88 0 0 1-75-38 93 93 0 0 1-20-58c0-9 3-18 8-25s12-13 19-17c5-4 12-6 18-8l-9-24c-5-22-5-45-2-67a292 292 0 0 1 63-149c9-10 18-19 29-26 7-4 14-5 20-9 43-19 90-25 137-22Z" fill="#000"/><path d="M475 243a276 276 0 0 1 121 23c23 10 45 25 63 43 20 21 33 47 40 75l6 45c2 24 0 48-1 72-1 15-3 29-2 44 0 4 0 8 2 12l-1 20c-2 5-2 10-2 16-2 24-2 49-6 74-1 12-3 25-8 36-3 9-8 17-15 24-12 13-27 24-43 33-19 11-39 16-58 24-5 2-10 4-13 8 8 1 15 0 23-2-5 12-6 24-6 36 0 5-1 11 1 16 3 5 8 9 13 12l35 13c22 8 43 18 65 27 2 4 5 7 6 12 6 11 7 23 3 35-5 13-15 24-27 31-16 11-36 19-55 24a494 494 0 0 1-235-7c-20-7-40-14-58-24-14-8-29-18-40-31-6-8-11-19-12-29a122 122 0 0 0 86-107c4-24 4-49 0-73 8 11 18 20 29 27l27 14a331 331 0 0 0 124 27h12v-4l-17-5-41-8c-23-5-46-10-68-19-13-6-27-13-39-21-10-9-19-18-27-29l-18-27c-3-5-6-13-11-17-10 1-20 3-30 1-14-2-28-7-39-16a94 94 0 0 1-33-49c-2-11-4-23 1-33 4-8 11-14 18-19 9-6 19-10 29-12 4-1 8-1 11-3l-1-3-12-1-7-15c-8-23-9-46-7-70a276 276 0 0 1 54-139c10-12 22-23 35-32a277 277 0 0 1 128-30Z" fill="#ffffff"/><path d="M260 571c4 0 7 0 11 2 5 1 11 4 14 8 2 3 2 7 0 10-5 6-12 10-16 16 6 4 14 6 21 9 4 1 8 3 11 6l1 3-8-2-24-7c-4-1-8-3-9-7-1-3 1-7 3-10l15-13c-4-7-15-8-19-15ZM703 577l2 3 2 16a483 483 0 0 1-2 89c-2 11-5 23-10 33a198 198 0 0 1-106 71c-1 14-3 31-2 47l5 5c8 6 18 9 27 12a451 451 0 0 1 68 28c7 4 13 9 18 15-5 1-10-1-16-2-22-9-43-19-65-27l-35-13c-5-3-10-7-13-12-2-5-1-11-1-16 0-12 1-24 6-36-8 2-15 3-23 2 3-4 8-6 13-8 19-8 39-13 58-24 16-9 31-20 43-33 7-7 12-15 15-24 5-11 7-24 8-36 4-25 4-50 6-74 0-6 0-11 2-16Z" fill="#000"/><path d="M479 474c8 3 15 6 19 13h-5c-13-2-25-8-38-9-11-2-22-2-33 0 1-4 6-6 10-7 15-4 32-3 47 3ZM675 476l1 1-18 2c-9 1-17 5-26 8l-6 3c0-3 3-5 5-7l15-8c9-4 19-3 29 1ZM680 485c6 1 12 3 16 8 3 3 5 9 2 13s-8 5-12 2c-3-3-3-6-3-9-8-5-16-4-25-1 2 2 5 3 6 6 4 5 4 11 2 17-5 8-15 14-25 13-7-2-12-8-13-15l-8 10-4 5c-3-3-2-6-1-10 5-12 15-21 26-28 11-8 25-13 39-11ZM446 488c24 2 47 11 66 26 4 3 9 8 10 13 1 3-1 6-4 6l-6-5c-3-4-8-6-12-9 1 8 0 15-5 20-3 5-8 7-13 7-8 1-16-2-22-8-9-10-8-26 1-36-10-2-19-3-28-2-6 1-12 4-16 8-2 2-1 4-2 6-1 4-5 7-9 6-4 0-8-3-9-7-1-5 1-11 5-14 5-5 13-7 19-9 9-1 17-3 25-2Z" fill="#000000"/><path d="M496 375c10 1 20 4 27 11 3 3 5 7 6 11-11-5-22-6-33-6-6 1-12 4-17 7-23 12-43 29-66 41l-20 14-11 11c-1-5 1-10 2-14 4-10 11-17 19-24l24-17c13-9 27-19 41-26 9-4 18-8 28-8ZM701 411c-6 3-11 3-17 4-5 1-10 3-14 6-9 7-17 15-24 24-9 10-17 18-29 24l-7 2c-2 1-4 0-6 2-4 5-4 13-9 17-2 0-2-2-2-3v-13c1-5 3-12 7-16s9-4 13-8l15-10 23-18c6-5 13-10 20-13 10-3 21-3 30 2Z" fill="#000000"/><path d="M603 613v1c-4 8-11 15-20 18-3 1-7 1-9-1v-4c7-5 16-9 24-12l5-2Z" fill="#000000"/><path d="M587 747c7-1 14 0 20 2-3 3-9 4-13 5l-43 11c-2 1-5 2-6 0-1-3 1-5 3-6 5-4 12-7 19-8l20-4Z" fill="#000000"/><path d="M631 178a213 213 0 0 1 54 22c3 2 3 5 4 8l-13-2c-10-1-20-3-30-2-22 1-43 6-62 16 16 0 31 0 47 4 29 6 56 18 77 39 17 16 30 36 36 59 5 19 6 39 1 59a127 127 0 0 1-73 84l-20 9-5-2c1-10 4-18 6-27l2-24c0-11-2-22-4-33l-9 20c-9 17-24 32-41 41-12 8-27 13-41 17-18 5-37 7-56 9h-19c-3 0-3-2-5-4l7-10c5-9 11-18 15-28l7-25c4-14 5-28 5-43a299 299 0 0 1-108 125c-12 8-26 13-39 18-6 2-11 4-17 1l2-13 4-30c-7 15-13 32-16 49-5 28-1 55 5 83l2 15c-8 2-16 1-24-2-26-10-49-32-59-59 0-4-4-4-6-6-10-5-18-14-23-23-9-14-15-31-17-48a204 204 0 0 1 30-136c11-20 25-37 41-53a146 146 0 0 1 75-38 432 432 0 0 0 57-16c27-10 51-24 77-36a229 229 0 0 1 133-18Z" fill="#000000"/></g><g transform="translate(10 -60)"></g></g></svg>`
        });
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

const handleCancel = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: existingData } = await supabase
      .from("info")
      .select("userName")
      .eq("user_id", user.id)
      .single();
    
    if (existingData) {
      navigate("/profile");
    } else {
      await supabase.auth.signOut();
      navigate("/login");
    }
  }
};

const handleSubmit = async () => {
  setSaving(true);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { alert("No user logged in!"); setSaving(false); return; }

  const { data: existingData } = await supabase
    .from("info")
    .select("userName")
    .eq("user_id", user.id)
    .single();

  const { error } = await supabase.from("info").upsert(
    { user_id: user.id, ...form },
    { onConflict: "user_id" }
  );

  setSaving(false);
  if (error) {
    console.error(error);
    alert("Error saving: " + error.message);
  } else {
    navigate(existingData ? "/profile" : "/home"); //check if editing or first time
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
            <button className="info-logout-btn" onClick={handleCancel}>
              Go back
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