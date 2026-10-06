// ==========================================
// modules/healthTrack/utils/htFileNameParser.ts
// ==========================================
import type { HTDocumentFileType } from "../types/htDocuments";

// ==========================================
// Возможные отправители файла.
// ==========================================
export type HTSenderType = "MO" | "SMO" | "TFOMS" | "Unknown";

// ==========================================
// Результат разбора имени файла.
// ==========================================
export interface HTFileNameParseResult {
  /** Успешно ли распознано имя файла. */
  isValid: boolean;

  /** Тип файла (если распознан). */
  fileType?: HTDocumentFileType;

  /** Период в формате ГГГГ-ММ (если распознан). */
  period?: string;

  /** Код МО (6 цифр) или региона (2 цифры, для GST/GPT/GF/PF). */
  hospitalCode?: string;

  /** Код региона (обычно "19"). */
  regionCode?: string;

  /** Отправитель. */
  sender?: HTSenderType;

  /** Номер пакета (для GST/GPT/GSM/GPM). */
  fileNumber?: number;

  /** Сообщение об ошибке, если не удалось разобрать. */
  errorMessage?: string;
}

// ==========================================
// Внутренние хелперы.
// ==========================================

/**
 * "2609" → "2026-09"
 */
const convertYearMonth = (yyMM: string): string | null => {
  if (yyMM.length !== 4 || !/^\d{4}$/.test(yyMM)) return null;
  const year = `20${yyMM.slice(0, 2)}`;
  const month = yyMM.slice(2);
  return `${year}-${month}`;
};

/**
 * Возвращает результат ошибки.
 */
const invalid = (message: string): HTFileNameParseResult => ({
  isValid: false,
  errorMessage: message,
});

// ==========================================
// Парсеры для каждого типа.
// ==========================================

/**
 * GST19_2609_1 или GPT19_2609_1
 * Sender: TFOMS
 */
const parseGstGpt = (
  name: string,
  fileType: "GST" | "GPT",
): HTFileNameParseResult => {
  const match = /^(GST|GPT)(\d+)_(\d+)(?:_(\d+))?$/.exec(name);
  if (!match) {
    return invalid(`Ожидается формат: ${fileType}19_2609_1`);
  }

  const regionCode = match[2];
  const yearMonth = match[3];
  const fileNumber = match[4];

  const period = convertYearMonth(yearMonth);
  if (!period) {
    return invalid(`Неверный формат периода в имени файла: "${yearMonth}"`);
  }

  return {
    isValid: true,
    fileType,
    regionCode,
    hospitalCode: regionCode, // для GST/GPT hospitalCode = регион
    period,
    sender: "TFOMS",
    fileNumber: fileNumber ? Number(fileNumber) : undefined,
  };
};

/**
 * GSM190006_2609_1 или GPM190006_2609_1
 * Sender: MO
 */
const parseGsmGpm = (
  name: string,
  fileType: "GSM" | "GPM",
): HTFileNameParseResult => {
  const match = /^(GSM|GPM)(\d{6})_(\d+)(?:_(\d+))?$/.exec(name);
  if (!match) {
    return invalid(`Ожидается формат: ${fileType}190006_2609_1`);
  }

  const hospitalCode = match[2];
  const yearMonth = match[3];
  const fileNumber = match[4];

  const period = convertYearMonth(yearMonth);
  if (!period) {
    return invalid(`Неверный формат периода в имени файла: "${yearMonth}"`);
  }

  return {
    isValid: true,
    fileType,
    hospitalCode,
    period,
    sender: "MO",
    fileNumber: fileNumber ? Number(fileNumber) : undefined,
  };
};

/**
 * GF19_2609 или GF19_2609_1
 * Sender: TFOMS
 */
const parseGf = (name: string): HTFileNameParseResult => {
  const match = /^GF(\d+)_(\d+)(?:_(\d+))?$/.exec(name);
  if (!match) {
    return invalid("Ожидается формат: GF19_2609 или GF19_2609_1");
  }

  const regionCode = match[1];
  const yearMonth = match[2];
  const fileNumber = match[3];

  const period = convertYearMonth(yearMonth);
  if (!period) {
    return invalid(`Неверный формат периода в имени файла: "${yearMonth}"`);
  }

  return {
    isValid: true,
    fileType: "GF",
    regionCode,
    period,
    sender: "TFOMS",
    fileNumber: fileNumber ? Number(fileNumber) : undefined,
  };
};

/**
 * PF19_2609
 * Sender: TFOMS
 */
const parsePf = (name: string): HTFileNameParseResult => {
  const match = /^PF(\d+)_(\d+)$/.exec(name);
  if (!match) {
    return invalid("Ожидается формат: PF19_2609");
  }

  const regionCode = match[1];
  const yearMonth = match[2];

  const period = convertYearMonth(yearMonth);
  if (!period) {
    return invalid(`Неверный формат периода в имени файла: "${yearMonth}"`);
  }

  return {
    isValid: true,
    fileType: "PF",
    regionCode,
    period,
    sender: "TFOMS",
  };
};

/**
 * DSPN_M190070T19_26091 (от МО) или DSPN_S19001T19_26091 (от СМО)
 * PROF_M190070T19_26081 (от МО) или PROF_S19001T19_26081 (от СМО)
 *
 * Формат: <PREFIX>_<SenderLetter><SenderCode>T<RegionCode>_<PeriodPart>
 *   SenderLetter: M (МО) или S (СМО) или T (ТФОМС)
 *   SenderCode: 4-6 цифр
 *   RegionCode: 2 цифры
 *   PeriodPart: YYMMN (год-месяц-номер месяца)
 */
const parseDspnProf = (
  name: string,
  fileType: "DSPN" | "PROF",
): HTFileNameParseResult => {
  const match = /^(DSPN|PROF)_([MST])(\d{4,6})T(\d{2})_(\d+)$/.exec(name);
  if (!match) {
    return invalid(
      `Ожидается формат: ${fileType}_M190070T19_26091`,
    );
  }

  const senderLetter = match[2];
  const senderCode = match[3];
  const regionCode = match[4];
  const periodPart = match[5];

  const sender: HTSenderType =
    senderLetter === "M"
      ? "MO"
      : senderLetter === "S"
        ? "SMO"
        : senderLetter === "T"
          ? "TFOMS"
          : "Unknown";

  // Период в имени — YYMMN (5-6 знаков). Первые 4 — YYMM, остальное — номер месяца.
  const yearMonthPart = periodPart.slice(0, 4);
  const period = convertYearMonth(yearMonthPart);

  if (!period) {
    return invalid(`Неверный формат периода в имени файла: "${periodPart}"`);
  }

  return {
    isValid: true,
    fileType,
    hospitalCode: senderCode,
    regionCode,
    period,
    sender,
  };
};

// ==========================================
// Главная функция.
// ==========================================

/**
 * Разобрать имя файла (без расширения) и определить:
 *   - тип файла
 *   - период
 *   - код МО
 *   - отправителя
 *   - номер пакета (если есть)
 *
 * Поддерживаемые форматы:
 *   GST19_2609_1          → GST, 2026-09
 *   GPT19_2609_1          → GPT, 2026-09
 *   GSM190006_2609_1      → GSM, 2026-09, MO=190006
 *   GPM190006_2609_1      → GPM, 2026-09, MO=190006
 *   GF19_2609             → GF,  2026-09
 *   PF19_2609             → PF,  2026-09
 *   DSPN_M190070T19_26091 → DSPN, 2026-09, MO=190070
 *   PROF_M190070T19_26081 → PROF, 2026-09, MO=190070
 *
 * Возвращает объект с `isValid`. Если false — смотри `errorMessage`.
 */
export const parseHTFileName = (
  fileNameWithExt: string,
): HTFileNameParseResult => {
  if (!fileNameWithExt || !fileNameWithExt.trim()) {
    return invalid("Имя файла пустое");
  }

  // Убираем расширение (.xml, .zip).
  const name = fileNameWithExt.replace(/\.(xml|zip)$/i, "").trim();

  // Определяем тип по префиксу.
  const prefixMatch = /^(GST|GPT|GSM|GPM|GF|PF|DSPN|PROF)/.exec(name);
  if (!prefixMatch) {
    return invalid(
      `Не удалось определить тип файла: "${name}". ` +
        `Поддерживаются: GST, GPT, GSM, GPM, GF, PF, DSPN, PROF.`,
    );
  }

  const prefix = prefixMatch[1];

  switch (prefix) {
    case "GST":
      return parseGstGpt(name, "GST");
    case "GPT":
      return parseGstGpt(name, "GPT");
    case "GSM":
      return parseGsmGpm(name, "GSM");
    case "GPM":
      return parseGsmGpm(name, "GPM");
    case "GF":
      return parseGf(name);
    case "PF":
      return parsePf(name);
    case "DSPN":
      return parseDspnProf(name, "DSPN");
    case "PROF":
      return parseDspnProf(name, "PROF");
    default:
      return invalid(`Тип файла "${prefix}" пока не поддерживается`);
  }
};