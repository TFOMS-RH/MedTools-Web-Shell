// ==========================================
// modules/healthTrack/api/htDocumentsService.ts
// ==========================================
import apiHealthTrackClient from "../../../app/providers/apiHealthTrackClient";

import type {
  HTDocumentsPagedResult,
  HTDocumentsQueryParams,
  HTDocumentsSummary,
  HTDocumentDetails,
  HTDocumentAuditItem,
  HTCheckDocumentResultItem,
  HTCheckDocumentsBatchResult,
  HTCheckDocumentsBatchRequest,
} from "../types/htDocuments";

/**
 * API-сервис раздела «Документы».
 */
export const htDocumentsService = {
  /**
   * GET /api/documents
   * Постраничный список документов с фильтрами и сортировкой.
   */
  getDocuments: async (
    params: HTDocumentsQueryParams = {},
  ): Promise<HTDocumentsPagedResult> => {
    const response = await apiHealthTrackClient.get<HTDocumentsPagedResult>(
      "/documents",
      { params },
    );
    return response.data;
  },

  /**
   * GET /api/documents/summary
   * Сводные метрики по статусам и типам.
   */
  getSummary: async (): Promise<HTDocumentsSummary> => {
    const response = await apiHealthTrackClient.get<HTDocumentsSummary>(
      "/documents/summary",
    );
    return response.data;
  },

  /**
   * GET /api/documents/{id}
   * Детали одного документа.
   */
  getDocumentById: async (id: number): Promise<HTDocumentDetails> => {
    const response = await apiHealthTrackClient.get<HTDocumentDetails>(
      `/documents/${id}`,
    );
    return response.data;
  },

  getDocumentAudit: async (
    id: number,
  ): Promise<HTDocumentAuditItem[]> => {
    const response = await apiHealthTrackClient.get<HTDocumentAuditItem[]>(
      `/documents/${id}/audit`,
    );
    return response.data;
  },

  /**
   * POST /api/documents/{id}/check
   * Одиночная проверка документа.
   */
  checkDocument: async (
    documentId: number,
  ): Promise<HTCheckDocumentResultItem> => {
    const response = await apiHealthTrackClient.post<HTCheckDocumentResultItem>(
      `/documents/${documentId}/check`,
    );
    return response.data;
  },

  /**
   * POST /api/documents/check-batch
   * Массовая проверка выбранных документов.
   */
  checkDocumentsBatch: async (
    documentIds: number[],
  ): Promise<HTCheckDocumentsBatchResult> => {
    const payload: HTCheckDocumentsBatchRequest = { documentIds };
    const response =
      await apiHealthTrackClient.post<HTCheckDocumentsBatchResult>(
        "/documents/check-batch",
        payload,
      );
    return response.data;
  },

  /**
   * DELETE /api/documents/{id}
   * Удалить документ вместе со всеми связанными записями.
   *
   * Каскадное удаление на бэке: удаляются все GST/GPT/DSPN/... записи,
   * привязанные к этому документу.
   *
   * Проверка прав на бэке:
   *  - Admin — любой документ.
   *  - MO / SMO — только свои.
   *  - TFOMS — запрещено.
   */
  deleteDocument: async (id: number): Promise<void> => {
    await apiHealthTrackClient.delete(`/documents/${id}`);
  },
};