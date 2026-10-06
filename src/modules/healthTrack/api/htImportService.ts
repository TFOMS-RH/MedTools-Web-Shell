// ==========================================
// modules/healthTrack/api/htImportService.ts
// ==========================================
import apiHealthTrackClient from "../../../app/providers/apiHealthTrackClient";
import {
  HT_IMPORT_ENDPOINTS,
  type HTImportFileType,
  type HTImportRequest,
  type HTImportResult,
} from "../types/htImport";

// ==========================================
// Колбэк прогресса загрузки.
// 0..100 — процент. undefined — если прогресс неизвестен.
// ==========================================
export type HTUploadProgressCallback = (percent: number) => void;

/**
 * API-сервис импорта файлов.
 *
 * Все 8 типов файлов работают через один обобщённый метод importFile().
 * Логика отправки идентична, отличается только URL.
 */
export const htImportService = {
  /**
   * Загрузить файл на бэк.
   *
   * @param fileType  Тип файла (GST, GPT, GSM, GPM, GF, PF, DSPN, PROF).
   * @param request   Объект с файлом, периодом и кодом МО.
   * @param onProgress Колбэк прогресса (0-100). Опционально.
   *
   * @returns HTImportResult — { documentId, recordsCount, warnings[] }
   */
  importFile: async (
    fileType: HTImportFileType,
    request: HTImportRequest,
    onProgress?: HTUploadProgressCallback,
  ): Promise<HTImportResult> => {
    // ==========================================
    // 1. Собираем FormData.
    //    Бэк ждёт multipart/form-data с полями:
    //      file         (IFormFile)
    //      period       (string, ГГГГ-ММ)
    //      hospitalCode (string | null)
    // ==========================================
    const formData = new FormData();
    formData.append("file", request.file);
    formData.append("period", request.period);
    if (request.hospitalCode) {
      formData.append("hospitalCode", request.hospitalCode);
    }

    // ==========================================
    // 2. Определяем URL по типу файла.
    // ==========================================
    const endpoint = HT_IMPORT_ENDPOINTS[fileType];
    if (!endpoint) {
      throw new Error(`Неизвестный тип файла для импорта: ${fileType}`);
    }

    // ==========================================
    // 3. Отправляем через axios.
    //    - Content-Type: multipart/form-data ставит сам axios,
    //      когда видит FormData.
    //    - timeout увеличен (для больших файлов).
    // ==========================================
    const response = await apiHealthTrackClient.post<HTImportResult>(
      endpoint,
      formData,
      {
        // Убираем дефолтный Content-Type: application/json,
        // чтобы axios сам поставил multipart с boundary.
        headers: {
          "Content-Type": undefined,
        },
        // Импорт может занимать много времени — увеличиваем таймаут.
        timeout: 5 * 60 * 1000, // 5 минут
        // Прогресс загрузки.
        onUploadProgress: (progressEvent) => {
          if (!onProgress || !progressEvent.total) return;
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(percent);
        },
      },
    );

    return response.data;
  },
};