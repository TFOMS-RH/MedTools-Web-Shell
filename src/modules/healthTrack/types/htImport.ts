// ==========================================
// modules/healthTrack/types/htImport.ts
// ==========================================
import type { HTDocumentFileType } from "./htDocuments";

// ==========================================
// Типы файлов, которые можно импортировать.
// Полностью совпадает с HTDocumentFileType — это те же 8 типов.
// Алиас оставляем для семантики: "здесь про импорт".
// ==========================================
export type HTImportFileType = HTDocumentFileType;

// ==========================================
// Результат успешного импорта.
// Совпадает с ImportResultDto на бэке.
// ==========================================
export interface HTImportResult {
  /** ID созданного документа. */
  documentId: number;

  /** Количество записей, импортированных в БД. */
  recordsCount: number;

  /** 
   * Количество обновлённых записей.
   * Заполняется только для DSPN от СМО (обновление INF-блока).
   * Для остальных = 0 или отсутствует.
   */
  updatedCount?: number;

  /** 
   * Предупреждения (не фатальные).
   * Пример: "ENP=12345...: диагноз X не найден в справочнике DS_DN".
   */
  warnings: string[];
}

// ==========================================
// Что мы отправляем на бэк.
// Файл + два параметра. Все поля — обязательные/опциональные,
// см. форму ниже.
// ==========================================
export interface HTImportRequest {
  /** Файл (XML или ZIP). */
  file: File;

  /** Период в формате ГГГГ-ММ. */
  period: string;

  /**
   * Код МО. Для роли MO/SMO — берётся из профиля автоматически
   * (родитель подставит). Для роли Admin — вводит пользователь.
   * Для файлов от ТФОМС (GST/GPT/GF/PF) — может быть null.
   */
  hospitalCode: string | null;
}

// ==========================================
// Статус импорта в UI.
// Используем для отображения прогресса/результата.
// ==========================================
export type HTImportStatus =
  | "idle"        // форма открыта, ничего не происходит
  | "uploading"   // файл отправляется
  | "success"     // успешно импортирован
  | "error";      // произошла ошибка (валидация или сервер)

// ==========================================
// Информация о результате для отображения.
// ==========================================
export interface HTImportDisplayResult {
  status: HTImportStatus;
  documentId?: number;
  fileName?: string;
  fileType?: HTImportFileType;
  recordsCount?: number;
  updatedCount?: number;
  warnings?: string[];
  errorMessage?: string;
}

// ==========================================
// Маппинг: тип файла → URL эндпоинта импорта.
// Все роуты — на бэке, начинаются с /api/import/.
// ==========================================
export const HT_IMPORT_ENDPOINTS: Record<HTImportFileType, string> = {
  GST:  "/import/gst",
  GPT:  "/import/gpt",
  GSM:  "/import/gsm",
  GPM:  "/import/gpm",
  GF:   "/import/gf",
  PF:   "/import/pf",
  DSPN: "/import/dspn",
  PROF: "/import/prof",
};

// ==========================================
// Русские названия для UI (для select-а и подсказок).
// ==========================================
export const HT_IMPORT_TYPE_LABELS: Record<HTImportFileType, string> = {
  GST:  "GST — сводный список ЗЛ на ДН",
  GPT:  "GPT — сводный план-график ДН",
  GSM:  "GSM — сведения о ЗЛ на ДН (от МО)",
  GPM:  "GPM — план-график ДН (от МО)",
  GF:   "GF — результаты сверки ГИС ОМС",
  PF:   "PF — списки на диспансеризацию",
  DSPN: "DSPN — сведения о ЗЛ на ДН (от МО/СМО)",
  PROF: "PROF — сведения о диспансеризации (от МО/СМО)",
};

// ==========================================
// Допустимые расширения файлов.
// ==========================================
export const HT_IMPORT_ALLOWED_EXTENSIONS = [".xml", ".zip"];

/** Максимальный размер файла для загрузки (в байтах) = 100 MB. */
export const HT_IMPORT_MAX_FILE_SIZE = 100 * 1024 * 1024;

/** Формат файлов для input accept="..." */
export const HT_IMPORT_ACCEPT_ATTR = ".xml,.zip,application/xml,application/zip";