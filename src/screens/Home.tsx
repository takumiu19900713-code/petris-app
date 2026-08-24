import {
  pet,
  guarantee,
  guaranteeEndDateLabel,
  guaranteeRemainingDays,
  guaranteeProgressPct,
  schedules,
  insurance,
} from "../data/mockData";
import type { SharePayload } from "../utils/share";
import { buildShareUrl } from "../utils/deepLink";

interface Props {
  onQuickRecord: (msg: string) => void;
  onShare: (payload: SharePayload) => void;
  onShowInsurance: () => void;
}

export default function Home({ onQuickRecord, onShare, onShowInsurance }: Props) {
  const shareWelcome = () => {
    const url = buildShareUrl("home");
    onShare({
      title: `${pet.name}をLINEでシェア`,
      lines: [
        `🐾 ${pet.name}をお迎えしました！`,
        `${pet.breed}・${pet.sex}・${pet.welcomeDate}〜 / ペトリス手帳`,
      ],
      text: `🐾 ${pet.name}をお迎えしました！\n${pet.breed}・${pet.sex}\n${pet.welcomeDate}から一緒です。\n#ペトリス手帳 ${pet.techoId}\n${url}`,
    });
  };

  return (
    <>
      <section className="pet-card">
        <button
          className="share-trigger"
          onClick={shareWelcome}
          aria-label={`${pet.name}の情報をLINEでシェア`}
        >
          ↗
        </button>
        <div className="pet-top">
          <div className="pet-avatar">{pet.avatarEmoji}</div>
          <div>
            <h2 className="pet-name">{pet.name}</h2>
            <p className="pet-sub">
              {pet.breed} ・ {pet.sex} ・ {pet.color}
            </p>
          </div>
        </div>
        <div className="pet-meta">
          <div>
            <b>4ヶ月</b>
            <span>ねんれい</span>
          </div>
          <div>
            <b>
              {pet.weightKg}
              <small>kg</small>
            </b>
            <span>たいじゅう</span>
          </div>
          <div>
            <b>{pet.birthday}</b>
            <span>おたんじょうび</span>
          </div>
        </div>
        <div className="welcome-tag">
          <span className="dot"></span>
          {pet.welcomeDate} ペトリスからお迎え ・ 手帳ID {pet.techoId}
        </div>
      </section>

      <h3 className="sec-title">
        🛡️ 健康保証 <small>{guarantee.type}</small>
      </h3>
      <div className="card guarantee">
        <div className="g-stamp">
          保証
          <b>有効</b>
        </div>
        <div style={{ flex: 1 }}>
          <h4>お迎え後1年間の健康保証つき</h4>
          <p>
            のこり {guaranteeRemainingDays}日（{guaranteeEndDateLabel}まで）
          </p>
          <div className="g-bar">
            <i style={{ width: `${guaranteeProgressPct}%` }}></i>
          </div>
        </div>
      </div>

      <h3 className="sec-title">
        🐶 ペット保険 <small>{insurance.provider}</small>
      </h3>
      <div className="card insurance">
        <div className="insurance-top">
          <span className="insurance-status">
            {insurance.status === "enrolled" ? "加入中" : "未加入"}
          </span>
          <h4>{insurance.planName}</h4>
        </div>
        <p>
          月々{insurance.monthlyPremium.toLocaleString()}円 ・ 通院/入院/手術を
          {insurance.coverageRate}%補償
        </p>
        <div className="insurance-actions">
          <button className="insurance-open" onClick={onShowInsurance}>
            加入情報・補償内容を見る
          </button>
        </div>
      </div>

      <h3 className="sec-title">🔔 もうすぐの予定</h3>
      <div className="card">
        {schedules.map((s) => (
          <div className="todo" key={s.id}>
            <div className="ico">{s.icon}</div>
            <div>
              <h5>{s.title}</h5>
              <p>{s.place}</p>
            </div>
            <div className="when">{s.dateLabel}</div>
          </div>
        ))}
      </div>

      <h3 className="sec-title">✏️ きょうの記録</h3>
      <div className="quick">
        <button onClick={() => onQuickRecord("体重を記録しました（デモ）")}>
          <span>⚖️</span>体重
        </button>
        <button onClick={() => onQuickRecord("ごはんを記録しました（デモ）")}>
          <span>🍚</span>ごはん
        </button>
        <button onClick={() => onQuickRecord("お散歩を記録しました（デモ）")}>
          <span>🐕</span>散歩
        </button>
        <button onClick={() => onQuickRecord("うんちを記録しました（デモ）")}>
          <span>💩</span>トイレ
        </button>
      </div>
    </>
  );
}
