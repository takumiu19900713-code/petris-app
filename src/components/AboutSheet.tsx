import { useEffect } from "react";
import {
  conceptTagline,
  conceptLead,
  conceptPurpose,
  ownerBenefits,
  storeBenefits,
} from "../data/concept";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AboutSheet({ open, onClose }: Props) {
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
        <p className="about-eyebrow">CONCEPT</p>
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

        <button className="sheet-cancel" onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  );
}
