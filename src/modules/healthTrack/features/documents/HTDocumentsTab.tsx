// ==========================================
// modules/healthTrack/features/documents/HTDocumentsTab.tsx
// ==========================================
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useCheckDocumentMutation,
  useCheckDocumentsBatchMutation,
  useDeleteDocumentMutation,
  useDocumentsQuery,
} from "../../hooks/useDocumentsQueries";
import { useHealthTrackAuthStore } from "../../stores/healthTrackAuthStore";
import { useHTNotify } from "../../hooks/useHTNotify";
import { useHasRole } from "../../hooks/useHasRole";

import { HTDocumentsHeader } from "./HTDocumentsHeader/HTDocumentsHeader";
import { HTDocumentsAggregation } from "./HTDocumentsAggregation/HTDocumentsAggregation";
import {
  HTDocumentsFilters,
  type HTDocumentsFiltersValue,
} from "./HTDocumentsFilters/HTDocumentsFilters";
import { HTDocumentsTable } from "./HTDocumentsTable/HTDocumentsTable";
import { HTDocumentDetailsDrawer } from "../../ui/HTDocumentDetailsDrawer/HTDocumentDetailsDrawer";
import { HTConfirmDialog } from "../../ui/HTConfirmDialog/HTConfirmDialog";

import type {
  HTDocumentFileType,
  HTDocumentListItem,
  HTDocumentStatus,
  HTDocumentsQueryParams,
} from "../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Дефолтное состояние фильтров.
// ==========================================
const DEFAULT_FILTERS: HTDocumentsFiltersValue = {
  searchQuery: "",
  fileType: "",
  hospitalCode: "",
  period: "",
  status: "",
};

// ==========================================
// Пропсы.
// ==========================================
interface HTDocumentsTabProps {
  /** ID документа для автооткрытия в drawer. */
  initialDocumentId?: number | null;

  /** Колбэк: HTDocumentsTab обработал initialDocumentId. */
  onInitialDocumentConsumed?: () => void;
}

/**
 * Раздел «Документы и экспорт».
 */
export const HTDocumentsTab = ({
  initialDocumentId = null,
  onInitialDocumentConsumed,
}: HTDocumentsTabProps = {}) => {
  // ==========================================
  // Роли.
  // ==========================================
  const user = useHealthTrackAuthStore((s) => s.user);
  const isMo = user?.roles.includes("MO") ?? false;
  const isSmo = user?.roles.includes("SMO") ?? false;

  const canDelete = useHasRole("Admin", "MO", "SMO");

  // ==========================================
  // Уведомления.
  // ==========================================
  const notify = useHTNotify();

  // ==========================================
  // Состояние UI.
  // ==========================================
  const [filters, setFilters] =
    useState<HTDocumentsFiltersValue>(DEFAULT_FILTERS);

  const [appliedFilters, setAppliedFilters] =
    useState<HTDocumentsFiltersValue>(DEFAULT_FILTERS);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [openDocumentId, setOpenDocumentId] = useState<number | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<HTDocumentListItem | null>(null);

  // ==========================================
  // Автооткрытие drawer по initialDocumentId.
  // ==========================================
  useEffect(() => {
    if (initialDocumentId !== null) {
      setOpenDocumentId(initialDocumentId);
      onInitialDocumentConsumed?.();
    }
  }, [initialDocumentId, onInitialDocumentConsumed]);

  // ==========================================
  // Параметры запроса.
  // ==========================================
  const queryParams: HTDocumentsQueryParams = useMemo(() => {
    const effectiveHospitalCode =
      isMo || isSmo
        ? user?.hospitalCode ?? undefined
        : appliedFilters.hospitalCode.trim() || undefined;

    return {
      searchQuery: appliedFilters.searchQuery.trim() || undefined,
      fileType:
        (appliedFilters.fileType as HTDocumentFileType) || undefined,
      status: (appliedFilters.status as HTDocumentStatus) || undefined,
      hospitalCode: effectiveHospitalCode,
      period: appliedFilters.period || undefined,
      page,
      pageSize,
      sortBy: "uploadDate",
      sortDirection: "desc",
    };
  }, [appliedFilters, page, pageSize, isMo, isSmo, user?.hospitalCode]);

  // ==========================================
  // React Query — запросы и мутации.
  // ==========================================
  const {
    data: pagedResult,
    isLoading,
    refetch: refetchList,
  } = useDocumentsQuery(queryParams);

  const checkOneMutation = useCheckDocumentMutation();
  const checkBatchMutation = useCheckDocumentsBatchMutation();
  const deleteMutation = useDeleteDocumentMutation();

  // ==========================================
  // Хелперы.
  // ==========================================
  const items = pagedResult?.items ?? [];
  const totalCount = pagedResult?.totalCount ?? 0;
  const totalPages = pagedResult?.totalPages ?? 1;

  const availablePeriods = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.period));
    return Array.from(set).sort().reverse();
  }, [items]);

  // ==========================================
  // Обработчики.
  // ==========================================

  const handleRefresh = useCallback(() => {
    refetchList();
    notify.info("Данные обновлены");
  }, [refetchList, notify]);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setPage(1);
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handleToggleRow = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        items.forEach((item) => {
          const canCheck =
            item.status === "Uploaded" &&
            (item.fileType === "DSPN" || item.fileType === "PROF");
          if (!canCheck) return;

          if (checked) next.add(item.id);
          else next.delete(item.id);
        });
        return next;
      });
    },
    [items],
  );

  const handleCheckOne = useCallback(
    (id: number) => {
      checkOneMutation.mutate(id, {
        onSuccess: (result) => {
          if (result.isSuccess) {
            const records = result.recordsCount ?? 0;
            const rejected = result.rejectedCount ?? 0;

            if (rejected > 0) {
              notify.warning(
                `Документ проверен: ${records.toLocaleString("ru-RU")} записей, ` +
                  `отклонено ${rejected.toLocaleString("ru-RU")}`,
              );
            } else {
              notify.success(
                `Документ проверен: ${records.toLocaleString("ru-RU")} записей`,
              );
            }
          } else {
            const errText =
              result.errors && result.errors.length > 0
                ? result.errors.join("; ")
                : "Не удалось проверить документ";
            notify.warning(errText);
          }
        },
        onError: (err) => {
          notify.errorFrom(err, "Ошибка проверки документа");
        },
      });
    },
    [checkOneMutation, notify],
  );

  const handleCheckSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);

    checkBatchMutation.mutate(ids, {
      onSuccess: (result) => {
        const success = result.successCount;
        const failed = result.failedCount;

        if (failed === 0) {
          notify.success(`Проверено документов: ${success} из ${ids.length}`);
        } else if (success === 0) {
          notify.error(
            `Не удалось проверить ни одного документа (${failed} ошибок)`,
          );
        } else {
          notify.warning(`Проверено: ${success}, с ошибками: ${failed}`);
        }

        setSelectedIds(new Set());
      },
      onError: (err) => {
        notify.errorFrom(err, "Ошибка массовой проверки");
      },
    });
  }, [selectedIds, checkBatchMutation, notify]);

  const handleDownloadResponse = useCallback(
    async (doc: HTDocumentListItem) => {
      try {
        const endpoint =
          doc.fileType === "DSPN"
            ? `/export/dspn/${doc.id}/response`
            : `/export/prof/${doc.id}/response`;

        const baseUrl = import.meta.env.DEV
          ? "http://localhost:5000/api"
          : "/api";
        const token = useHealthTrackAuthStore.getState().accessToken;

        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "GET",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          notify.error(`Не удалось скачать файл (HTTP ${response.status})`);
          return;
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${doc.fileName}_response.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);

        notify.success(`Файл ${doc.fileName}_response.zip скачан`);
      } catch (err) {
        notify.errorFrom(err, "Ошибка скачивания файла");
      }
    },
    [notify],
  );

  // ==========================================
  // Drawer.
  // ==========================================
  const handleOpenDetails = useCallback((doc: HTDocumentListItem) => {
    setOpenDocumentId(doc.id);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setOpenDocumentId(null);
  }, []);

  // ==========================================
  // Удаление.
  // ==========================================
  const handleDeleteClick = useCallback((doc: HTDocumentListItem) => {
    setDeleteTarget(doc);
  }, []);

  const handleCancelDelete = useCallback(() => {
    if (deleteMutation.isPending) return;
    setDeleteTarget(null);
  }, [deleteMutation.isPending]);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return;

    const docId = deleteTarget.id;
    const docName = deleteTarget.fileName;

    deleteMutation.mutate(docId, {
      onSuccess: () => {
        notify.success(`Документ «${docName}» удалён`);
        setDeleteTarget(null);

        if (openDocumentId === docId) {
          setOpenDocumentId(null);
        }
      },
      onError: (err) => {
        notify.errorFrom(err, "Не удалось удалить документ");
      },
    });
  }, [deleteTarget, deleteMutation, notify, openDocumentId]);

  // ==========================================
  // Пагинация.
  // ==========================================
  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages) return;
      setPage(nextPage);
    },
    [totalPages],
  );

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  // ==========================================
  // Рендер.
  // ==========================================
  const isLoadingAny =
    isLoading ||
    checkOneMutation.isPending ||
    checkBatchMutation.isPending ||
    deleteMutation.isPending;

  return (
    <section className={styles.tabRoot}>
      <HTDocumentsHeader
        selectedCount={selectedIds.size}
        onRefresh={handleRefresh}
        onCheckSelected={handleCheckSelected}
        isLoading={isLoadingAny}
      />

      <HTDocumentsAggregation />

      <HTDocumentsFilters
        value={filters}
        onChange={setFilters}
        onSubmit={handleApplyFilters}
        onReset={handleResetFilters}
        availablePeriods={availablePeriods}
        disabled={isLoadingAny}
      />

      <HTDocumentsTable
        items={items}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        selectedIds={selectedIds}
        onToggleRow={handleToggleRow}
        onToggleAll={handleToggleAll}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onCheckOne={handleCheckOne}
        onDownloadResponse={handleDownloadResponse}
        onOpenDetails={handleOpenDetails}
        onDelete={handleDeleteClick}
        canDelete={canDelete}
        onResetFilters={handleResetFilters}
        isLoading={isLoadingAny}
      />

      <HTDocumentDetailsDrawer
        documentId={openDocumentId}
        onClose={handleCloseDetails}
        onCheck={handleCheckOne}
        onDownloadResponse={handleDownloadResponse}
        actionInProgress={isLoadingAny}
      />

      <HTConfirmDialog
        open={deleteTarget !== null}
        title="Удалить документ?"
        description={
          deleteTarget && (
            <>
              Документ <strong>{deleteTarget.fileName}</strong> будет удалён
              вместе со всеми связанными записями. Действие необратимо.
            </>
          )
        }
        confirmLabel="Удалить"
        cancelLabel="Отмена"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
};