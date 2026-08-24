import { useEffect, useRef, useState } from "react";
import { store } from "./data/mockData";
import Home from "./screens/Home";
import Records from "./screens/Records";
import Certificates from "./screens/Certificates";
import Store from "./screens/Store";
import ShareSheet from "./components/ShareSheet";
import AboutSheet from "./components/AboutSheet";
import type { SharePayload } from "./utils/share";
import { buildShareUrl, readTabFromUrl, type TabId } from "./utils/deepLink";

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "うちの子" },
  { id: "records", icon: "📈", label: "きろく" },
  { id: "certificates", icon: "📜", label: "証明書" },
  { id: "store", icon: "🏬", label: "ペトリス" },
];

function App() {
  const [tab, setTab] = useState<TabId>(() => readTabFromUrl() ?? "home");
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [sharePayload, setSharePayload] = useState<SharePayload | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToastVisible(false), 1800);
  };

  const changeTab = (id: TabId) => {
    setTab(id);
    window.history.replaceState(null, "", buildShareUrl(id));
  };

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <div className="phone">
      <div className="demo-ribbon">DEMO — 画面イメージ・データはすべてサンプルです</div>

      <header className="app-head">
        <div className="logo">
          <span className="paw">🐾</span>ペトリス手帳
        </div>
        <div className="head-right">
          <div className="head-store">
            お迎え店舗
            <br />
            <b>{store.name}</b>
          </div>
          <button
            className="about-trigger"
            onClick={() => setAboutOpen(true)}
            aria-label="ペトリス手帳のコンセプトについて"
          >
            i
          </button>
        </div>
      </header>

      <main className={`screen${tab === "home" ? " active" : ""}`}>
        <Home onQuickRecord={showToast} onShare={setSharePayload} />
      </main>
      <main className={`screen${tab === "records" ? " active" : ""}`}>
        <Records />
      </main>
      <main className={`screen${tab === "certificates" ? " active" : ""}`}>
        <Certificates onOpen={showToast} onShare={setSharePayload} />
      </main>
      <main className={`screen${tab === "store" ? " active" : ""}`}>
        <Store onPremiumClick={showToast} onShare={setSharePayload} />
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? "on" : ""}
            onClick={() => changeTab(t.id)}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div className={`toast${toastVisible ? " show" : ""}`}>{toastMsg}</div>

      <ShareSheet
        payload={sharePayload}
        onClose={() => setSharePayload(null)}
        onCopied={() => showToast("リンクをコピーしました")}
      />
      <AboutSheet open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}

export default App;
