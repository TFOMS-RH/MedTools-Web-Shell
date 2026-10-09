import apiClient from "../../../shared/api/client/apiClient";

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

export const htDocumentsService = {
  getDocuments: async (
    params: HTDocumentsQueryParams = {},
  ): Promise<HTDocumentsPagedResult> => {
    const response = await apiClient.get<HTDocumentsPagedResult>(
      "health-track/documents",
      { params },
    );
    return response.data;
  },

  getSummary: async (): Promise<HTDocumentsSummary> => {
    const response = await apiClient.get<HTDocumentsSummary>(
      "health-track/documents/summary",
    );
    return response.data;
  },

  getDocumentById: async (id: number): Promise<HTDocumentDetails> => {
    const response = await apiClient.get<HTDocumentDetails>(
      `health-track/documents/${id}`,
    );
    return response.data;
  },

  getDocumentAudit: async (id: number): Promise<HTDocumentAuditItem[]> => {
    const response = await apiClient.get<HTDocumentAuditItem[]>(
      `health-track/documents/${id}/audit`,
    );
    return response.data;
  },

  checkDocument: async (
    documentId: number,
  ): Promise<HTCheckDocumentResultItem> => {
    const response = await apiClient.post<HTCheckDocumentResultItem>(
      `health-track/documents/${documentId}/check`,
    );
    return response.data;
  },

  checkDocumentsBatch: async (
    documentIds: number[],
  ): Promise<HTCheckDocumentsBatchResult> => {
    const payload: HTCheckDocumentsBatchRequest = { documentIds };
    const response = await apiClient.post<HTCheckDocumentsBatchResult>(
      "health-track/documents/check-batch",
      payload,
    );
    return response.data;
  },

  deleteDocument: async (id: number): Promise<void> => {
    await apiClient.delete(`health-track/documents/${id}`);
  },
};
