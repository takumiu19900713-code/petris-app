import { useEffect } from "react";
import type { SharePayload } from "../utils/share";
import { copyShareText, openLineShare } from "../utils/share";

interface Props {
  payload: SharePayload | null;
  onClose: () => void;
  onCopied: () => void;
}

export default function ShareSheet({ payload, onClose, onCopied }: Props) {
  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [payload, onClose]);

  if (!payload) return null;

  const handleLine = () => {
    openLineShare(payload.text);
    onClose();
  };

  const handleCopy = async () => {
    const ok = await copyShareText(payload.text);
    onClose();
    if (ok) onCopied();
  };

  return (
    <div className="sheet-layer" role="presentation">
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet-panel" role="dialog" aria-modal="true" aria-label={payload.title}>
        <div className="sheet-grabber" />
        <h4 className="sheet-title">{payload.title}</h4>
        <div className="sheet-preview">
          {payload.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="sheet-actions">
          <button className="sheet-action line" onClick={handleLine}>
            <span className="sheet-ico line-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="#fff"
                  d="M12 3C6.98 3 3 6.36 3 10.5c0 3.7 3.14 6.79 7.4 7.39.29.06.68.2.78.45.09.23.06.58.03.81l-.13.79c-.04.23-.18.9.79.49.97-.41 5.23-3.08 7.14-5.27C20.4 13.6 21 12.13 21 10.5 21 6.36 17.02 3 12 3Z"
                />
                <path
                  fill="#06C755"
                  d="M18.6 12.03h-1.32a.19.19 0 0 1-.19-.19V9.1c0-.1.08-.19.19-.19h1.32c.1 0 .19.08.19.19v.5c0 .1-.08.19-.19.19h-.7v.36h.7c.1 0 .19.08.19.19v.5c0 .1-.08.18-.19.18h-.7v.37h.7c.1 0 .19.08.19.19v.5c0 .1-.08.19-.19.19Zm-8.9 0a.19.19 0 0 1-.19-.19V9.1c0-.1.08-.19.19-.19h.5c.1 0 .19.08.19.19v2.24h1.07c.1 0 .19.08.19.19v.5c0 .1-.08.19-.19.19H9.7Zm-2.55 0a.19.19 0 0 1-.19-.19V9.1c0-.1.08-.19.19-.19h.5c.11 0 .19.08.19.19v2.74c0 .1-.08.19-.19.19h-.5Zm7.03 0a.2.2 0 0 1-.15-.07l-1.25-1.68v1.56c0 .1-.08.19-.19.19h-.5a.19.19 0 0 1-.18-.19V9.1c0-.09.07-.17.16-.19.02 0 .04-.01.06-.01a.2.2 0 0 1 .15.08l1.25 1.68V9.1c0-.1.08-.19.19-.19h.5c.1 0 .18.08.18.19v2.74c0 .09-.06.17-.15.19h-.07Z"
                />
              </svg>
            </span>
            LINEで送る
          </button>
          <button className="sheet-action" onClick={handleCopy}>
            <span className="sheet-ico copy-ico" aria-hidden="true">🔗</span>
            リンクをコピー
          </button>
        </div>
        <button className="sheet-cancel" onClick={onClose}>
          キャンセル
        </button>
      </div>
    </div>
  );
}
