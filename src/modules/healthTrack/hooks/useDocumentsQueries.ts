// ==========================================
// modules/healthTrack/hooks/useDocumentsQueries.ts
// ==========================================
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { htDocumentsService } from "../api/htDocumentsService";

import type {
  HTCheckDocumentResultItem,
  HTCheckDocumentsBatchResult,
  HTDocumentDetails,
  HTDocumentAuditItem, 
  HTDocumentsPagedResult,
  HTDocumentsQueryParams,
  HTDocumentsSummary,
} from "../types/htDocuments";

// ==========================================
// Ключи кэша.
// ==========================================
export const HT_DOCUMENTS_QUERY_KEYS = {
  all: ["ht", "documents"] as const,

  list: (params: HTDocumentsQueryParams) =>
    ["ht", "documents", "list", params] as const,

  details: (id: number) =>
    ["ht", "documents", "details", id] as const,

  // 🆕
  audit: (id: number) =>
    ["ht", "documents", "audit", id] as const,

  summary: () => ["ht", "documents", "summary"] as const,
};

// ==========================================
// QUERY: список документов.
// ==========================================
export const useDocumentsQuery = (params: HTDocumentsQueryParams) => {
  return useQuery<HTDocumentsPagedResult, Error>({
    queryKey: HT_DOCUMENTS_QUERY_KEYS.list(params),
    queryFn: () => htDocumentsService.getDocuments(params),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  });
};

// ==========================================
// QUERY: сводные метрики.
// ==========================================
export const useDocumentsSummaryQuery = () => {
  return useQuery<HTDocumentsSummary, Error>({
    queryKey: HT_DOCUMENTS_QUERY_KEYS.summary(),
    queryFn: () => htDocumentsService.getSummary(),
    staleTime: 30_000,
  });
};

// ==========================================
// QUERY: детали одного документа.
// ==========================================
export const useDocumentDetailsQuery = (id: number | null) => {
  return useQuery<HTDocumentDetails, Error>({
    queryKey: HT_DOCUMENTS_QUERY_KEYS.details(id ?? 0),
    queryFn: () => htDocumentsService.getDocumentById(id!),
    enabled: id !== null,
    staleTime: 60_000,
  });
};

export const useDocumentAuditQuery = (id: number | null) => {
  return useQuery<HTDocumentAuditItem[], Error>({
    queryKey: HT_DOCUMENTS_QUERY_KEYS.audit(id ?? 0),
    queryFn: () => htDocumentsService.getDocumentAudit(id!),
    enabled: id !== null,
    staleTime: 30_000,
  });
};

// ==========================================
// MUTATION: одиночная проверка.
// ==========================================
export const useCheckDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<HTCheckDocumentResultItem, Error, number>({
    mutationFn: (documentId: number) =>
      htDocumentsService.checkDocument(documentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HT_DOCUMENTS_QUERY_KEYS.all,
      });
    },
  });
};

// ==========================================
// MUTATION: массовая проверка.
// ==========================================
export const useCheckDocumentsBatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<HTCheckDocumentsBatchResult, Error, number[]>({
    mutationFn: (documentIds: number[]) =>
      htDocumentsService.checkDocumentsBatch(documentIds),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HT_DOCUMENTS_QUERY_KEYS.all,
      });
    },
  });
};

// ==========================================
// 🆕 MUTATION: удаление документа.
// ==========================================
/**
 * Удалить документ вместе со всеми связанными записями.
 *
 * Каскадное удаление на бэке.
 *
 * После успеха — инвалидирует весь кэш документов.
 *
 * Проверка прав:
 *   - Admin — любой документ.
 *   - MO / SMO — только свои.
 *   - TFOMS — запрещено.
 */
export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (documentId: number) =>
      htDocumentsService.deleteDocument(documentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HT_DOCUMENTS_QUERY_KEYS.all,
      });
    },
  });
};