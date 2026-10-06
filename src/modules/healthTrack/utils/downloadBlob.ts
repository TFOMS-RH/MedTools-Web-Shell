// ==========================================
// modules/healthTrack/utils/downloadBlob.ts
// ==========================================
import { useHealthTrackAuthStore } from "../stores/healthTrackAuthStore";

// ==========================================
// Результат скачивания.
// ==========================================
export interface DownloadBlobResult {
  /** Успешно ли скачали файл. */
  success: boolean;

  /** Имя файла (если удалось определить). */
  fileName?: string;

  /** Сообщение об ошибке (если success = false). */
  errorMessage?: string;
}

// ==========================================
// Опции.
// ==========================================
interface DownloadBlobOptions {
  /** URL для скачивания (относительный, без /api). */
  url: string;

  /** Имя файла по умолчанию, если в заголовке его нет. */
  fallbackFileName: string;

  /**
   * Парсер тела ошибки.
   * По умолчанию пытается распарсить ProblemDetails (JSON с errors/title).
   */
  errorParser?: (rawText: string) => string | undefined;
}

// ==========================================
// Базовый URL API.
// ==========================================
const getBaseUrl = (): string => {
  return import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "/api";
};

// ==========================================
// Парсер ошибок по умолчанию.
// Пытается извлечь текст из ProblemDetails.
// ==========================================
const defaultErrorParser = (rawText: string): string | undefined => {
  if (!rawText) return undefined;

  try {
    const parsed = JSON.parse(rawText);

    // ProblemDetails: { errors: [...] }
    if (Array.isArray(parsed?.errors) && parsed.errors.length > 0) {
      return parsed.errors.join("; ");
    }

    // ProblemDetails: { title: "..." }
    if (typeof parsed?.title === "string") {
      return parsed.title;
    }

    // Просто строка
    if (typeof parsed === "string") {
      return parsed;
    }
  } catch {
    // Не JSON — возвращаем как есть
    return rawText;
  }

  return undefined;
};

// ==========================================
// Главный хелпер.
// ==========================================
/**
 * Скачать файл по URL и сохранить его в браузере.
 *
 * Использование:
 *   const result = await downloadBlob({
 *     url: `/export/dspn/${docId}/response`,
 *     fallbackFileName: "response.zip",
 *   });
 *
 *   if (result.success) {
 *     notify.success(`Файл ${result.fileName} скачан`);
 *   } else {
 *     notify.error(result.errorMessage);
 *   }
 *
 * @returns Результат операции. Исключения не бросаются — вся обработка внутри.
 */
export const downloadBlob = async (
  options: DownloadBlobOptions,
): Promise<DownloadBlobResult> => {
  const { url, fallbackFileName, errorParser = defaultErrorParser } = options;

  try {
    const baseUrl = getBaseUrl();
    const token = useHealthTrackAuthStore.getState().accessToken;

    // ==========================================
    // 1. Запрос.
    // ==========================================
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    // ==========================================
    // 2. Обработка ошибок HTTP.
    // ==========================================
    if (!response.ok) {
      let errorMessage = `Ошибка ${response.status}`;
      try {
        const rawText = await response.text();
        const parsed = errorParser(rawText);
        if (parsed) errorMessage = parsed;
      } catch {
        // Не удалось прочитать тело — оставляем "Ошибка N".
      }

      return {
        success: false,
        errorMessage,
      };
    }

    // ==========================================
    // 3. Получаем blob.
    // ==========================================
    const blob = await response.blob();

    // ==========================================
    // 4. Определяем имя файла.
    // ==========================================
    let fileName = fallbackFileName;

    const disposition = response.headers.get("Content-Disposition");
    if (disposition) {
      const match = /filename\*?=(?:UTF-8'')?["']?([^"';]+)/i.exec(
        disposition,
      );
      if (match && match[1]) {
        try {
          fileName = decodeURIComponent(match[1]);
        } catch {
          // Некорректная кодировка — оставляем fallback
        }
      }
    }

    // ==========================================
    // 5. Сохраняем blob как файл.
    // ==========================================
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    return {
      success: true,
      fileName,
    };
  } catch (err) {
    // Сетевые ошибки и другие неожиданные.
    const message =
      err instanceof Error ? err.message : "Ошибка скачивания файла";
    return {
      success: false,
      errorMessage: message,
    };
  }
};