import { store, pet, coupon, premiumFeatures } from "../data/mockData";
import type { SharePayload } from "../utils/share";
import { buildShareUrl } from "../utils/deepLink";

interface Props {
  onPremiumClick: (msg: string) => void;
  onShare: (payload: SharePayload) => void;
}

export default function Store({ onPremiumClick, onShare }: Props) {
  const shareCoupon = () => {
    const url = buildShareUrl("store");
    onShare({
      title: "クーポンを友達にシェア",
      lines: [
        `🛍️ ${store.name}の${coupon.discount}クーポン`,
        `${coupon.title} ・ ${coupon.expiresAt}`,
      ],
      text: `🛍️ ${store.name}で使える${coupon.discount}クーポンをシェアするよ！\n${coupon.title}\n${coupon.expiresAt}\n#ペトリス手帳\n${url}`,
    });
  };

  return (
    <>
      <h3 className="sec-title">🏬 いつものペトリス</h3>
      <div className="store-hero">
        <div className="s-ico">🏪</div>
        <div>
          <h4>{store.name}</h4>
          <p>
            {pet.name}をお迎えした店舗 ・ 担当：{pet.staffName}
          </p>
        </div>
      </div>

      <div className="coupon">
        <div className="off">
          {coupon.discount.replace("OFF", "")}
          <br />
          OFF
        </div>
        <div className="coupon-body">
          <h5>{coupon.title}</h5>
          <p>
            お迎え時と同じフードのご購入に使えます ・ {coupon.expiresAt}
          </p>
          <button className="coupon-invite" onClick={shareCoupon}>
            ↗ 友達にLINEで教える
          </button>
        </div>
      </div>

      <section className="premium">
        <span className="p-tag">PREMIUM</span>
        <h4>もっと安心の、プレミアム手帳</h4>
        <ul>
          {premiumFeatures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="price">
          <b>月額 780円</b>（初月無料）
        </p>
        <button onClick={() => onPremiumClick("プレミアムのご案内（デモ）")}>
          くわしく見る
        </button>
      </section>
    </>
  );
}
