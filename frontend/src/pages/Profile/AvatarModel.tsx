import React, { useState } from "react";
import { saveNewProfilePic } from "../../api/userProfile";
import { supabase } from "../../supabaseClient";
import { adventurer, avataaars, lorelei, micah, openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const STYLES = [
  { value: "lorelei",     label: "Lorelei"     },
  { value: "adventurer",  label: "Adventurer"  },
  { value: "micah",       label: "Micah"       },
  { value: "openPeeps",   label: "Open Peeps"  },
  { value: "avataaars",   label: "Avataaars"   },
];

export default function AvatarModal({ visible, onClose }: Props) {
  const [seed, setSeed]               = useState("");
  const [svg, setSvg]                 = useState("");
  const [styleStrName, setStyleStrName] = useState("lorelei");
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);

  const transform = (style: string) => {
    switch (style) {
      case "adventurer": return adventurer;
      case "micah":      return micah;
      case "openPeeps":  return openPeeps;
      case "avataaars":  return avataaars;
      default:           return lorelei;
    }
  };

  const generateAvatar = () => {
    const avatar = createAvatar(transform(styleStrName) as any, { seed } as any).toString();
    setSvg(avatar);
    setSaved(false);
  };

  const saveAvatarInDb = async () => {
    if (!svg) return;
    setSaving(true);
    try {
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      const user = userRes?.user;
      if (!user) throw new Error("Not logged in");
      await saveNewProfilePic(svg, user.id);
      setSaved(true);

      setTimeout(() => {
      onClose(); // This is the prop you passed from Profile.js
    }, 1000);
    
    } finally {
      setSaving(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

        .av-backdrop {
          position: fixed;
          inset: 0;
          
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 1000;
          animation: av-fade 0.2s ease forwards;
        }

        @keyframes av-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .av-modal {
          width: 100%;
          max-width: 480px;
          background: #fff;
          border-radius: 24px;
          padding: 32px 34px 28px;
          box-shadow:
            0 24px 64px rgba(20, 30, 100, 0.2),
            0 4px 16px rgba(20, 30, 100, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.9);
          position: relative;
          overflow: hidden;
          animation: av-up 0.3s cubic-bezier(0.23,1,0.32,1) forwards;
        }

        /* Top accent stripe */
        .av-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2b4bbd, #8fa3e8, #2b4bbd);
          border-radius: 24px 24px 0 0;
        }

        @keyframes av-up {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* Header */
        .av-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .av-eyebrow {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(43, 75, 189, 0.45);
          margin: 0 0 5px;
        }

        .av-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 26px;
          color: #1a2255;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .av-title em {
          font-style: italic;
          color: #2b4bbd;
        }

        .av-close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(43, 75, 189, 0.15);
          background: transparent;
          color: rgba(43, 75, 189, 0.45);
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          outline: none;
          font-family: 'Tenor Sans', sans-serif;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }

        .av-close:hover {
          background: rgba(43,75,189,0.07);
          color: #1a2255;
          border-color: rgba(43,75,189,0.3);
        }

        /* Body layout: controls left, preview right */
        .av-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: start;
        }

        /* Field label */
        .av-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(43,75,189,0.55);
          display: block;
          margin-bottom: 6px;
        }

        /* Style chip group */
        .av-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .av-chip {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1.5px solid rgba(43,75,189,0.15);
          background: transparent;
          color: rgba(43,75,189,0.6);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          outline: none;
        }

        .av-chip:hover {
          background: rgba(194,206,255,0.25);
          border-color: rgba(43,75,189,0.3);
          color: #1a2255;
        }

        .av-chip.active {
          background: rgba(43,75,189,0.08);
          border-color: rgba(43,75,189,0.45);
          color: #1a2255;
        }

        /* Seed input */
        .av-input {
          width: 100%;
          padding: 11px 13px;
          border-radius: 12px;
          border: 1.5px solid rgba(43,75,189,0.15);
          background: rgba(43,75,189,0.025);
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 300;
          color: #1a2255;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          caret-color: #2b4bbd;
          margin-bottom: 18px;
        }

        .av-input::placeholder {
          color: rgba(43,75,189,0.28);
          font-style: italic;
        }

        .av-input:focus {
          border-color: rgba(43,75,189,0.42);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(43,75,189,0.07);
        }

        /* Avatar preview */
        .av-preview {
          width: 120px;
          height: 120px;
          border-radius: 18px;
          border: 1.5px solid rgba(43,75,189,0.12);
          background: rgba(194,206,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .av-preview-empty {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 12px;
          color: rgba(43,75,189,0.3);
          text-align: center;
          padding: 8px;
          line-height: 1.4;
        }

        .av-preview svg {
          width: 100%;
          height: 100%;
        }

        /* Footer */
        .av-footer {
          display: flex;
          gap: 8px;
          margin-top: 22px;
        }

        /* Generate — secondary */
        .av-gen-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          flex: 1;
          padding: 11px 16px;
          border-radius: 11px;
          border: 1.5px solid rgba(43,75,189,0.22);
          background: rgba(194,206,255,0.2);
          color: #2b4bbd;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, transform 0.18s;
          outline: none;
        }

        .av-gen-btn:hover {
          background: rgba(194,206,255,0.38);
          border-color: rgba(43,75,189,0.38);
          transform: translateY(-1px);
        }

        /* Save — primary */
        .av-save-btn {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 16px;
          border-radius: 11px;
          border: none;
          background: linear-gradient(135deg, #2b4bbd 0%, #1a2f85 100%);
          color: #e8ecff;
          cursor: pointer;
          box-shadow:
            0 4px 14px rgba(43,75,189,0.35),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition:
            transform 0.2s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.2s cubic-bezier(0.23,1,0.32,1),
            opacity 0.2s;
          outline: none;
        }

        .av-save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 8px 22px rgba(43,75,189,0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .av-save-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .av-saved-badge {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(43,75,189,0.55);
          text-align: center;
          margin-top: 10px;
          animation: av-fade 0.3s ease;
        }
      `}</style>

      <div className="av-backdrop" onClick={onClose}>
        <div className="av-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="av-header">
            <div>
              <p className="av-eyebrow">Personalise</p>
              <h3 className="av-title">Choose your <em>Avatar</em></h3>
            </div>
            <button className="av-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          {/* Body */}
          <div className="av-body">
            <div>
              {/* Style chips */}
              <span className="av-label">Style</span>
              <div className="av-chips">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    className={`av-chip${styleStrName === s.value ? " active" : ""}`}
                    onClick={() => { setStyleStrName(s.value); setSaved(false); generateAvatar(); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Seed */}
              <span className="av-label">Seed</span>
              <input
                className="av-input"
                value={seed}
                onChange={(e) => { setSeed(e.target.value); setSaved(false); }}
                placeholder="Your name, a word, anything…"
              />
            </div>

            {/* Preview */}
            <div className="av-preview">
              {svg
                ? <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: "100%", height: "100%" }} />
                : <span className="av-preview-empty">Preview appears here</span>
              }
            </div>
          </div>

          {/* Footer */}
          <div className="av-footer">
            
            <button
              className="av-save-btn"
              onClick={saveAvatarInDb}
              disabled={!svg || saving}
            >
              {saving ? "Saving…" : saved ? "✓ Saved" : "Save avatar"}
            </button>
          </div>

          {saved && (
            <p className="av-saved-badge">Avatar saved successfully</p>
          )}

        </div>
      </div>
    </>
  );
}