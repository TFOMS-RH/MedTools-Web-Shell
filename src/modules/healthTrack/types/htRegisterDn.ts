// ==========================================
// modules/healthTrack/types/htRegisterDn.ts
// ==========================================

// ==========================================
// Строка таблицы реестра ДН.
// Совпадает с RegisterDnItemDto на бэке.
// ==========================================
export interface HTRegisterDnItem {
  enp: string;
  fullName: string;
  fam: string | null;
  im: string | null;
  ot: string | null;
  birthDate: string | null;
  gender: string | null;
  episodesCount: number;
  sources: string; // "DSPN" | "GF" | "DSPN,GF"
  lastDnInDate: string | null;
}

// ==========================================
// Ответ GET /api/register-dn (постраничный).
// ==========================================
export interface HTRegisterDnPagedResult {
  items: HTRegisterDnItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// ==========================================
// Параметры запроса списка.
// ==========================================
export interface HTRegisterDnQueryParams {
  searchQuery?: string;
  hospitalCode?: string;
  diagCode?: string;
  period?: string;
  status?: "active" | "closed";
  page?: number;
  pageSize?: number;
  sortBy?: "fullName" | "birthDate" | "lastDnInDate";
  sortDirection?: "asc" | "desc";
}

// ==========================================
// Детальная карточка пациента.
// Совпадает с RegisterDnDetailsDto на бэке.
// ==========================================
export interface HTRegisterDnDetails {
  enp: string;
  fam: string | null;
  im: string | null;
  ot: string | null;
  birthDate: string | null;
  gender: string | null;
  snils: string | null;
  smo: string | null;
  spolis: string | null;
  npolis: string | null;
  vpolis: number | null;
  adres: string | null;
  tel: string | null;
  sources: string;
  episodes: HTRegisterDnEpisode[];
  gfRecords: HTRegisterDnGfRecord[];
}

// ==========================================
// Один эпизод ДН (ZAP из DSPN).
// ==========================================
export interface HTRegisterDnEpisode {
  dspnRecordId: number;
  nZap: number;
  diagCode: string | null;
  diagName: string | null;
  diagDate: string | null;
  dateDnIn: string | null;
  dateDnOut: string | null;
  statusDnIn: number | null;
  reasonDnOut: string | null;
  reasonDnIn: number | null;
  dnPrvs: number | null;
  moP: string | null;
  iddokt: string | null;
  period: string | null;
  sourceDocumentId: number | null;
  sourceFileName: string | null;
  sourceFileType: string | null;
  plan: HTRegisterDnPlan | null;
  inf: HTRegisterDnInf | null;
}

// ==========================================
// PLAN — плановое посещение.
// ==========================================
export interface HTRegisterDnPlan {
  mcodPlan: string | null;
  moPodrId: string | null;
  medAreaCode: string | null;
  moAssign: number | null;
  dsCode: string | null;
  planDateStart: string | null;
  planDateEnd: string | null;
}

// ==========================================
// INF — информирование.
// ==========================================
export interface HTRegisterDnInf {
  infType: number | null;
  sposobInf: number | null;
  dataInf: string | null;
  infUpdated: boolean;
}

// ==========================================
// Запись GF.
// ==========================================
export interface HTRegisterDnGfRecord {
  gfRecordId: number;
  attachMcode: string | null;
  attachDate: string | null;
  groupRhCode: number | null;
  groupRhDs: string | null;
  groupRhProfile: string | null;
  groupRhName: string | null;
  sourceDocumentId: number | null;
  sourceFileName: string | null;
}

// ==========================================
// UI-ХЕЛПЕРЫ.
// ==========================================

/** Русские названия статусов ДН (StatusDnIn). */
export const HT_DN_STATUS_LABELS: Record<number, string> = {
  1: "Ранее установлен",
  2: "Впервые установлен",
};

/** Статус «на учёте» / «снят». */
export const getDnState = (
  episode: HTRegisterDnEpisode,
): "active" | "closed" => {
  return episode.dateDnOut ? "closed" : "active";
};

export const HT_DN_STATE_LABELS: Record<"active" | "closed", string> = {
  active: "На учёте",
  closed: "Снят",
};

/** Маппинг источников данных → русское название. */
export const HT_SOURCES_LABELS: Record<string, string> = {
  DSPN: "МО (DSPN)",
  GF: "ФФОМС (GF)",
  "DSPN,GF": "МО + ФФОМС",
};

/** Пол: "1" / "М" → "Мужской", "2" / "Ж" → "Женский". */
export const formatGender = (gender: string | null): string => {
  if (!gender) return "—";
  const g = gender.toUpperCase();
  if (g === "1" || g === "М" || g === "M") return "Мужской";
  if (g === "2" || g === "Ж" || g === "F") return "Женский";
  return gender;
};

/** ФИО полностью: "Иванов Иван Иванович". */
export const buildFullName = (
  fam: string | null,
  im: string | null,
  ot: string | null,
): string => {
  return [fam, im, ot].filter(Boolean).join(" ") || "—";
};