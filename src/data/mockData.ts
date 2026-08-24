import type {
  Owner,
  Pet,
  Store,
  Guarantee,
  HealthRecord,
  Certificate,
  Schedule,
  Coupon,
  WeightPoint,
} from "../types";

export const store: Store = {
  id: "store-niigata",
  name: "スーパーセンタームサシ新潟店",
  address: "新潟県新潟市",
  phone: "025-000-0000",
};

export const owner: Owner = {
  id: "owner-1",
  name: "うえの たくみ",
  email: "owner@example.com",
  phone: "090-0000-0000",
  plan: "free",
  familyMembers: [],
};

export const pet: Pet = {
  id: "pet-moco",
  techoId: "PT-26-04812",
  name: "モコ",
  species: "dog",
  breed: "トイプードル",
  sex: "女の子",
  color: "アプリコット",
  birthday: "4/15",
  microchipNo: "392-14-6672-****",
  welcomeDate: "2026年6月20日",
  storeId: store.id,
  staffName: "スタッフ佐々木",
  ownerId: owner.id,
  avatarEmoji: "🐩",
  weightKg: 2.1,
};

export const guarantee: Guarantee = {
  petId: pet.id,
  type: "ペトリス生体保証",
  startDate: "2026-06-20",
  endDate: "2027-06-19",
  status: "active",
};

export const guaranteeEndDateLabel = "2027年6月19日";
export const guaranteeRemainingDays = 287;
export const guaranteeProgressPct = 78;

export const schedules: Schedule[] = [
  {
    id: "sch-1",
    petId: pet.id,
    date: "2026-09-02",
    dateLabel: "9/2 (水)",
    icon: "💉",
    title: "混合ワクチン 3回目",
    place: "かかりつけ：さくら動物病院",
    notified: false,
  },
  {
    id: "sch-2",
    petId: pet.id,
    date: "2026-09-13",
    dateLabel: "9/13 (日)",
    icon: "✂️",
    title: "トリミング予約",
    place: "ペトリス提携サロン",
    notified: false,
  },
  {
    id: "sch-3",
    petId: pet.id,
    date: "",
    dateLabel: "来週",
    icon: "🍚",
    title: "フードの残りが少なくなる頃",
    place: "前回購入から28日",
    notified: false,
  },
];

export const weightHistory: WeightPoint[] = [
  { label: "7/5", kg: 1.55 },
  { label: "7/12", kg: 1.62 },
  { label: "7/19", kg: 1.7 },
  { label: "7/26", kg: 1.78 },
  { label: "8/2", kg: 1.88 },
  { label: "8/9", kg: 1.95 },
  { label: "8/16", kg: 2.0 },
  { label: "8/23", kg: 2.1 },
];

export const healthRecords: HealthRecord[] = [
  {
    id: "rec-1",
    petId: pet.id,
    date: "8/23",
    kind: "weight",
    value: 2.1,
    note: "体重 2.1kg ・ 食欲ふつう",
    tags: ["順調"],
  },
  {
    id: "rec-2",
    petId: pet.id,
    date: "8/19",
    kind: "vet",
    note: "さくら動物病院で健診",
    tags: ["通院"],
  },
  {
    id: "rec-3",
    petId: pet.id,
    date: "8/16",
    kind: "weight",
    value: 2.0,
    note: "体重 2.0kg",
    tags: ["順調"],
  },
  {
    id: "rec-4",
    petId: pet.id,
    date: "8/10",
    kind: "medicine",
    note: "フィラリア予防薬 投与",
    tags: ["お薬"],
  },
  {
    id: "rec-5",
    petId: pet.id,
    date: "8/9",
    kind: "weight",
    value: 1.95,
    note: "体重 1.95kg",
    tags: ["順調"],
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    petId: pet.id,
    kind: "pedigree",
    title: "血統書",
    detail: "JKC ・ 2026年7月8日 発行",
    icon: "🏅",
  },
  {
    id: "cert-2",
    petId: pet.id,
    kind: "healthCheck",
    title: "健康診断書",
    detail: "お迎え時 獣医師チェック済み",
    icon: "🩺",
  },
  {
    id: "cert-3",
    petId: pet.id,
    kind: "vaccine",
    title: "ワクチン接種証明",
    detail: "2回接種済み ・ 次回 9/2",
    icon: "💉",
  },
  {
    id: "cert-4",
    petId: pet.id,
    kind: "microchip",
    title: "マイクロチップ登録",
    detail: `No. ${pet.microchipNo}`,
    icon: "🔖",
  },
];

export const coupon: Coupon = {
  storeId: store.id,
  title: "アプリ会員限定・フードクーポン",
  discount: "10%OFF",
  expiresAt: "8/31まで",
};

export const premiumFeatures: string[] = [
  "獣医師にアプリでいつでも相談",
  "食欲・体重の変化をAIが見守り、異変をお知らせ",
  "フードの定期便（買い忘れゼロ・店舗受取もOK）",
  "家族みんなで手帳を共有",
];
