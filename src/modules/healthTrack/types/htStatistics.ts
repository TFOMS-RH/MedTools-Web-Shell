// ==========================================
// modules/healthTrack/types/htStatistics.ts
// ==========================================

// ==========================================
// KPI-плитки.
// ==========================================
export interface HTStatisticsKpi {
  patientsTotal: number;
  patientsActive: number;
  patientsClosed: number;
  documentsTotal: number;
  documentsReady: number;
  recordsTotal: number;
}

// ==========================================
// Топ-10 МО.
// ==========================================
export interface HTStatisticsTopMo {
  moCode: string;
  count: number;
}

// ==========================================
// Топ-10 диагнозов.
// ==========================================
export interface HTStatisticsTopDiagnosis {
  diagCode: string;
  diagName: string | null;
  count: number;
}

// ==========================================
// Динамика по периодам.
// ==========================================
export interface HTStatisticsByPeriod {
  period: string; // "2026-01"
  count: number;
}

// ==========================================
// По возрастным группам.
// ==========================================
export interface HTStatisticsByAgeGroup {
  group: string; // "18-30" | "31-45" | ...
  count: number;
}

// ==========================================
// Полный ответ эндпоинта /api/statistics/overview.
// ==========================================
export interface HTStatisticsOverview {
  kpi: HTStatisticsKpi;
  topMos: HTStatisticsTopMo[];
  topDiagnoses: HTStatisticsTopDiagnosis[];
  byPeriod: HTStatisticsByPeriod[];
  byAgeGroup: HTStatisticsByAgeGroup[];
  periodFrom: string | null;
  periodTo: string | null;
}

// ==========================================
// Параметры запроса.
// ==========================================
export interface HTStatisticsQueryParams {
  periodFrom?: string; // "2026-01"
  periodTo?: string;   // "2026-12"
}

// ==========================================
// UI-ХЕЛПЕРЫ
// ==========================================

/**
 * Форматирование больших чисел: 285000 → "285 000".
 */
export const formatStatNumber = (n: number): string => {
  return n.toLocaleString("ru-RU");
};

/**
 * Сокращённое форматирование для больших чисел:
 * 1 250 → "1.3k", 285 000 → "285k".
 */
export const formatStatCompact = (n: number): string => {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
};

/**
 * Палитра для графиков (соответствует дизайн-системе).
 * Recharts принимает массив hex-цветов.
 */
export const HT_CHART_COLORS = {
  // Основные цвета для баров/линий.
  primary: "#181818",
  blue: "#1a4fbf",
  green: "#1a7f37",
  red: "#b91c1c",
  yellow: "#996600",
  violet: "#6633cc",
  pink: "#a41d68",
  teal: "#006699",
};

/**
 * Палитра для donut / pie-графиков.
 */
export const HT_CHART_PALETTE = [
  "#1a4fbf", // синий
  "#1a7f37", // зелёный
  "#996600", // жёлтый
  "#6633cc", // фиолетовый
  "#b91c1c", // красный
  "#006699", // teal
  "#a41d68", // розовый
];

/**
 * Цвета для возрастных групп (5 штук).
 */
export const HT_AGE_GROUP_COLORS: Record<string, string> = {
  "18-30": "#1a4fbf",
  "31-45": "#1a7f37",
  "46-60": "#996600",
  "61-75": "#b91c1c",
  "76+": "#6633cc",
};