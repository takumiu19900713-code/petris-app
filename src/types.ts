export type Species = "dog" | "cat";
export type Plan = "free" | "premium";

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  familyMembers: string[];
}

export interface Pet {
  id: string;
  techoId: string;
  name: string;
  species: Species;
  breed: string;
  sex: string;
  color: string;
  birthday: string;
  microchipNo: string;
  welcomeDate: string;
  storeId: string;
  staffName: string;
  ownerId: string;
  avatarEmoji: string;
  weightKg: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Guarantee {
  petId: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired";
}

export type HealthRecordKind =
  | "weight"
  | "meal"
  | "walk"
  | "toilet"
  | "vet"
  | "medicine"
  | "memo";

export interface HealthRecord {
  id: string;
  petId: string;
  date: string;
  kind: HealthRecordKind;
  value?: number;
  note: string;
  tags: string[];
}

export type CertificateKind =
  | "pedigree"
  | "healthCheck"
  | "vaccine"
  | "microchip";

export interface Certificate {
  id: string;
  petId: string;
  kind: CertificateKind;
  title: string;
  detail: string;
  icon: string;
}

export interface Schedule {
  id: string;
  petId: string;
  date: string;
  dateLabel: string;
  icon: string;
  title: string;
  place: string;
  notified: boolean;
}

export interface Coupon {
  storeId: string;
  title: string;
  discount: string;
  expiresAt: string;
}

export interface WeightPoint {
  label: string;
  kg: number;
}
