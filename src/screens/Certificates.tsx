import { useEffect, useRef, useState } from "react";
import { pet, certificates } from "../data/mockData";
import type { SharePayload } from "../utils/share";
import { buildShareUrl, readParamFromUrl } from "../utils/deepLink";

interface Props {
  onOpen: (msg: string) => void;
  onShare: (payload: SharePayload) => void;
}

export default function Certificates({ onOpen, onShare }: Props) {
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [printCertId, setPrintCertId] = useState<string | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sharedCertId = readParamFromUrl("cert");
    if (!sharedCertId) return;
    setHighlightId(sharedCertId);
    highlightRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    const t = window.setTimeout(() => setHighlightId(null), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const reset = () => setPrintCertId(null);
    window.addEventListener("afterprint", reset);
    return () => window.removeEventListener("afterprint", reset);
  }, []);

  const shareCert = (id: string, title: string, detail: string) => {
    const url = buildShareUrl("certificates", { cert: id });
    onShare({
      title: `${title}をLINEで送る`,
      lines: [`📜 ${pet.name}の${title}`, `${detail}`],
      text: `📜 ${pet.name}の${title}\n${detail}\nペトリス手帳で確認できます。\n${url}`,
    });
  };

  const printOne = (id: string) => {
    setPrintCertId(id);
    window.setTimeout(() => window.print(), 50);
  };

  const printAll = () => {
    setPrintCertId(null);
    window.setTimeout(() => window.print(), 50);
  };

  const printTarget = certificates.find((c) => c.id === printCertId);

  return (
    <>
      <div className="print-only-head">
        <h3>
          {printTarget ? `${pet.name}の${printTarget.title}` : `${pet.name}の証明書一式`}
        </h3>
        <p>ペトリス手帳 ・ 手帳ID {pet.techoId}</p>
      </div>

      <h3 className={`sec-title${printCertId ? " print-hide" : ""}`}>
        📷 お迎え記念写真
      </h3>
      <div className={`card photo-card${printCertId ? " print-hide" : ""}`}>
        <div className="photo-frame">
          <span>{pet.avatarEmoji}</span>
        </div>
        <p className="photo-caption">
          {pet.welcomeDate} お迎え ・ {pet.name}（サンプル画像）
        </p>
      </div>

      <h3 className="sec-title">
        📜 {pet.name}の大切な書類 <small>すべてここに</small>
      </h3>
      <button className="print-btn" onClick={printAll}>
        🖨️ まとめて印刷する
      </button>
      <div className="card">
        {certificates.map((c) => (
          <div
            className={`cert${highlightId === c.id ? " cert-highlight" : ""}${
              printCertId && printCertId !== c.id ? " print-hide" : ""
            }`}
            key={c.id}
            ref={highlightId === c.id ? highlightRef : undefined}
          >
            <div className="c-ico">{c.icon}</div>
            <div>
              <h5>{c.title}</h5>
              <p>{c.detail}</p>
            </div>
            <div className="cert-actions">
              <button
                className="cert-share"
                onClick={() => shareCert(c.id, c.title, c.detail)}
                aria-label={`${c.title}をLINEで送る`}
              >
                ↗
              </button>
              <button
                className="cert-print"
                onClick={() => printOne(c.id)}
                aria-label={`${c.title}だけを印刷する`}
              >
                🖨️
              </button>
              <button
                className="open"
                onClick={() => onOpen(`${c.title}を表示します（デモ）`)}
              >
                ひらく
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="cert-note">
        ※
        紙の書類をなくしても大丈夫。ペットホテルや動物病院で、この画面をそのまま提示できます。LINEで事前に送っておくこともできます。各証明書の🖨️から1枚ずつ印刷することもできます。
      </p>
    </>
  );
}
