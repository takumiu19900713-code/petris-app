import { useEffect } from "react";
import {
  conceptTagline,
  conceptLead,
  conceptPurpose,
  ownerBenefits,
  storeBenefits,
  premiumPriceLine,
  draftNote,
} from "../data/concept";

interface Props {
  open: boolean;
  onClose: () => void;
  onShareApp: () => void;
}

export default function AboutSheet({ open, onClose, onShareApp }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sheet-layer" role="presentation">
      <div className="sheet-backdrop" onClick={onClose} />
      <div
        className="sheet-panel about-panel"
        role="dialog"
        aria-modal="true"
        aria-label="ペトリス手帳について"
      >
        <div className="sheet-grabber" />
        <div className="about-eyebrow-row">
          <p className="about-eyebrow">CONCEPT</p>
          <span className="about-draft-badge">たたき台 ver.1</span>
        </div>
        <h4 className="about-tagline">
          {conceptTagline.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h4>
        <p className="about-lead">{conceptLead}</p>

        <h5 className="about-h5">🎯 このアプリの目的</h5>
        <ul className="about-list">
          {conceptPurpose.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="about-benefit-grid">
          <div className="about-benefit-card">
            <h6>🐾 飼い主のメリット</h6>
            <ul className="about-list compact">
              {ownerBenefits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="about-benefit-card store">
            <h6>🏪 お店のメリット</h6>
            <ul className="about-list compact">
              {storeBenefits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="about-premium-note">
          🌟 {premiumPriceLine}で、さらに手厚いプレミアム手帳になります。
        </p>
        <p className="about-draft-note">{draftNote}</p>

        <button className="sheet-action line about-share" onClick={onShareApp}>
          <span className="sheet-ico line-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="#fff"
                d="M12 3C6.98 3 3 6.36 3 10.5c0 3.7 3.14 6.79 7.4 7.39.29.06.68.2.78.45.09.23.06.58.03.81l-.13.79c-.04.23-.18.9.79.49.97-.41 5.23-3.08 7.14-5.27C20.4 13.6 21 12.13 21 10.5 21 6.36 17.02 3 12 3Z"
              />
            </svg>
          </span>
          この内容をLINEで紹介する
        </button>
        <button className="sheet-cancel" onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  );
}
