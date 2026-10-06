// ==========================================
// modules/healthTrack/hooks/useHTNotify.ts
// ==========================================
import { useSnackbar } from "notistack";
import { useCallback, useMemo } from "react";

import { isHTProblemDetails } from "../types/htAuth";

// ==========================================
// Опции для отдельного уведомления.
// ==========================================
interface HTNotifyOptions {
  /** Автоскрытие в миллисекундах. По умолчанию — 4000. */
  autoHideDuration?: number;
}

// ==========================================
// Публичное API хука.
// ==========================================
interface HTNotifyApi {
  /** Показать успешное уведомление (зелёное). */
  success: (message: string, options?: HTNotifyOptions) => void;

  /** Показать ошибку (красное). */
  error: (message: string, options?: HTNotifyOptions) => void;

  /** Показать предупреждение (жёлтое). */
  warning: (message: string, options?: HTNotifyOptions) => void;

  /** Показать информационное уведомление (синее). */
  info: (message: string, options?: HTNotifyOptions) => void;

  /**
   * Показать ошибку, вытащив текст из ответа бэка.
   * Умеет работать с:
   *  - ProblemDetails (errors[] / title)
   *  - Error.message
   *  - неизвестными объектами (fallback)
   */
  errorFrom: (err: unknown, fallback?: string) => void;
}

/**
 * Хук для показа уведомлений в модуле HealthTrack.
 *
 * Примеры:
 *   const notify = useHTNotify();
 *   notify.success("Импорт завершён");
 *   notify.error("Что-то пошло не так");
 *   notify.errorFrom(err);
 */
export const useHTNotify = (): HTNotifyApi => {
  const { enqueueSnackbar } = useSnackbar();

  // ==========================================
  // errorFrom — вытаскиваем читаемый текст ошибки.
  // ==========================================
  const extractErrorMessage = useCallback(
    (err: unknown, fallback: string): string => {
      // 1. Axios-ошибка: { response: { data: ... } }
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err
      ) {
        const response = (err as { response?: { data?: unknown } }).response;
        const data = response?.data;

        // ProblemDetails с массивом errors.
        if (isHTProblemDetails(data)) {
          if (data.errors && data.errors.length > 0) {
            return data.errors.join("; ");
          }
          if (data.title) {
            return data.title;
          }
        }

        // ProblemDetails как строка (на всякий случай).
        if (typeof data === "string" && data.trim()) {
          return data;
        }
      }

      // 2. Обычный Error с message.
      if (err instanceof Error && err.message) {
        return err.message;
      }

      // 3. Объект с полем message.
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        return (err as { message: string }).message;
      }

      // 4. Fallback.
      return fallback;
    },
    [],
  );

  // ==========================================
  // Хелпер для повторного использования опций.
  // ==========================================
  const buildOptions = useCallback(
    (options?: HTNotifyOptions) => ({
      autoHideDuration: options?.autoHideDuration ?? 4000,
    }),
    [],
  );

  // ==========================================
  // Возвращаем API.
  // useMemo — чтобы возвращаемый объект был стабильным
  // и не вызывал лишние ререндеры у подписчиков.
  // ==========================================
  return useMemo<HTNotifyApi>(
    () => ({
      success: (message, options) => {
        enqueueSnackbar(message, {
          variant: "success",
          ...buildOptions(options),
        });
      },

      error: (message, options) => {
        enqueueSnackbar(message, {
          variant: "error",
          // Ошибки показываем дольше — 6 секунд, чтобы успеть прочитать.
          autoHideDuration: options?.autoHideDuration ?? 6000,
        });
      },

      warning: (message, options) => {
        enqueueSnackbar(message, {
          variant: "warning",
          ...buildOptions(options),
        });
      },

      info: (message, options) => {
        enqueueSnackbar(message, {
          variant: "info",
          ...buildOptions(options),
        });
      },

      errorFrom: (err, fallback = "Произошла ошибка") => {
        const message = extractErrorMessage(err, fallback);
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 6000,
        });
      },
    }),
    [enqueueSnackbar, buildOptions, extractErrorMessage],
  );
};