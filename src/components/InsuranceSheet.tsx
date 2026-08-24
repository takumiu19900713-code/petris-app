import { useEffect } from "react";
import { pet, insurance } from "../data/mockData";
import type { SharePayload } from "../utils/share";
import { buildShareUrl } from "../utils/deepLink";

interface Props {
  open: boolean;
  onClose: () => void;
  onShare: (payload: SharePayload) => void;
  onContact: (msg: string) => void;
}

export default function InsuranceSheet({
  open,
  onClose,
  onShare,
  onContact,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const shareCert = () => {
    const url = buildShareUrl("home", { insurance: "1" });
    onShare({
      title: "保険証券をLINEで送る",
      lines: [
        `🐶 ${pet.name}の${insurance.planName}`,
        `${insurance.provider} ・ 証券番号 ${insurance.policyNo}`,
      ],
      text: `🐶 ${pet.name}の加入プラン：${insurance.planName}\n${insurance.provider} ・ 証券番号 ${insurance.policyNo}\n${insurance.coverageRate}%補償 ・ 次回更新 ${insurance.nextRenewal}\nペトリス手帳で確認できます。\n${url}`,
    });
    onClose();
  };

  return (
    <div className="sheet-layer" role="presentation">
      <div className="sheet-backdrop" onClick={onClose} />
      <div
        className="sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-label="ペット保険について"
      >
        <div className="sheet-grabber" />
        <div className="ins-sheet-head">
          <span className="ins-badge">
            {insurance.status === "enrolled" ? "加入中" : "未加入"}
          </span>
          <span className="ins-provider">{insurance.provider}</span>
        </div>
        <h4 className="sheet-title ins-plan-name">{insurance.planName}</h4>

        <div className="sheet-preview ins-detail-grid">
          <div>
            <span className="ins-label">証券番号</span>
            <span className="ins-value">{insurance.policyNo}</span>
          </div>
          <div>
            <span className="ins-label">月額保険料</span>
            <span className="ins-value">
              {insurance.monthlyPremium.toLocaleString()}円
            </span>
          </div>
          <div>
            <span className="ins-label">補償割合</span>
            <span className="ins-value">{insurance.coverageRate}%</span>
          </div>
          <div>
            <span className="ins-label">次回更新日</span>
            <span className="ins-value">{insurance.nextRenewal}</span>
          </div>
        </div>

        <h5 className="about-h5">🩺 補償される内容</h5>
        <ul className="about-list">
          {insurance.coverageSummary.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="sheet-actions">
          <button className="sheet-action line" onClick={shareCert}>
            <span className="sheet-ico line-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="#fff"
                  d="M12 3C6.98 3 3 6.36 3 10.5c0 3.7 3.14 6.79 7.4 7.39.29.06.68.2.78.45.09.23.06.58.03.81l-.13.79c-.04.23-.18.9.79.49.97-.41 5.23-3.08 7.14-5.27C20.4 13.6 21 12.13 21 10.5 21 6.36 17.02 3 12 3Z"
                />
              </svg>
            </span>
            証券をLINEで送る
          </button>
          <button
            className="sheet-action"
            onClick={() => {
              onContact("保険会社への相談窓口をご案内します（デモ）");
              onClose();
            }}
          >
            <span className="sheet-ico copy-ico" aria-hidden="true">💬</span>
            相談する
          </button>
        </div>
        <button className="sheet-cancel" onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  );
}
