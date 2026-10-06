// ==========================================
// modules/healthTrack/hooks/useImportMutation.ts
// ==========================================
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { htImportService } from "../api/htImportService";

import {
  type HTImportFileType,
  type HTImportRequest,
  type HTImportResult,
} from "../types/htImport";

// ==========================================
// Ключи кэша документов — переиспользуем из useDocumentsQueries.
// Импортируем чтобы инвалидация попала точно в те же ключи.
// ==========================================
import { HT_DOCUMENTS_QUERY_KEYS } from "./useDocumentsQueries";

// ==========================================
// Переменные, которые принимает мутация.
// ==========================================
export interface HTImportMutationVars {
  fileType: HTImportFileType;
  request: HTImportRequest;
  /** Колбэк прогресса загрузки (0-100). */
  onProgress?: (percent: number) => void;
}

/**
 * Мутация импорта файла.
 *
 * После успеха:
 *  - инвалидирует список документов (новая строка появится в таблице);
 *  - инвалидирует сводные метрики (числа на плитках обновятся).
 *
 * Пример использования:
 *   const mutation = useImportMutation();
 *
 *   mutation.mutate(
 *     { fileType: "GST", request: { file, period, hospitalCode }, onProgress: setProgress },
 *     {
 *       onSuccess: (result) => notify.success(`Импортировано ${result.recordsCount} записей`),
 *       onError: (err) => notify.errorFrom(err),
 *     }
 *   );
 */
export const useImportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<HTImportResult, Error, HTImportMutationVars>({
    mutationFn: ({ fileType, request, onProgress }) =>
      htImportService.importFile(fileType, request, onProgress),

    onSuccess: () => {
      // Инвалидируем всё дерево документов (список + метрики).
      // После успешного импорта они устарели.
      queryClient.invalidateQueries({
        queryKey: HT_DOCUMENTS_QUERY_KEYS.all,
      });
    },
  });
};