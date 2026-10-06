// ==========================================
// modules/healthTrack/features/documents/HTDocumentsTable/HTDocumentsTable.tsx
// ==========================================
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { HTDocumentStatusBadge } from "../../../ui/HTDocumentStatusBadge/HTDocumentStatusBadge";
import { HTDocumentTypeBadge } from "../../../ui/HTDocumentTypeBadge/HTDocumentTypeBadge";
import { HTTableSkeleton } from "../../../ui/HTTableSkeleton/HTTableSkeleton";
import { HTEmptyState } from "../../../ui/HTEmptyState/HTEmptyState";
import {
  canCheckDocument,
  canDownloadResponse,
  type HTDocumentListItem,
} from "../../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTDocumentsTableProps {
  /** Строки таблицы. */
  items: HTDocumentListItem[];

  /** Общее количество записей (из pagedResult.totalCount). */
  totalCount: number;

  /** Текущая страница (1-based). */
  page: number;

  /** Размер страницы. */
  pageSize: number;

  /** Общее количество страниц. */
  totalPages: number;

  /** Множество выбранных ID. */
  selectedIds: Set<number>;

  /** Колбэк: переключить выбор строки. */
  onToggleRow: (id: number) => void;

  /** Колбэк: выбрать / снять все видимые. */
  onToggleAll: (checked: boolean) => void;

  /** Колбэк: изменить страницу. */
  onPageChange: (page: number) => void;

  /** Колбэк: изменить размер страницы. */
  onPageSizeChange: (size: number) => void;

  /** Колбэк: проверить один документ. */
  onCheckOne: (id: number) => void;

  /** Колбэк: скачать ответный файл. */
  onDownloadResponse: (doc: HTDocumentListItem) => void;

  onOpenDetails: (doc: HTDocumentListItem) => void;

  /** Колбэк: удалить документ. */
  onDelete: (doc: HTDocumentListItem) => void;

  

  /** Есть ли у пользователя право удалять документы (роль Admin/MO/SMO). */
  canDelete: boolean;

  /** Колбэк: сбросить фильтры (используется в пустом состоянии). */
  onResetFilters?: () => void;



  /** Загрузка? */
  isLoading: boolean;
}

// ==========================================
// Форматирование даты в "DD.MM.YYYY HH:mm".
// ==========================================
const formatDateTime = (iso: string | null): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

// ==========================================
// Форматирование числа с разделителями.
// ==========================================
const formatNumber = (n: number | null): string => {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("ru-RU");
};

/**
 * Таблица документов.
 *
 * Особенности:
 *  - Чекбоксы только на строках, доступных к проверке.
 *  - Действия — иконки с тултипами в последней колонке.
 *  - Пагинация снизу.
 */
export const HTDocumentsTable = ({
  items,
  totalCount,
  page,
  pageSize,
  totalPages,
  selectedIds,
  onToggleRow,
  onToggleAll,
  onPageChange,
  onPageSizeChange,
  onCheckOne,
  onDownloadResponse,
  onOpenDetails,
  onDelete,          
  canDelete, 
  onResetFilters,   // ← добавить
  isLoading,
}: HTDocumentsTableProps) => {
  // ==========================================
  // Определяем, все ли доступные строки выбраны.
  // "Доступные" = у которых можно проверить (has checkbox).
  // ==========================================
  const checkableItems = items.filter(canCheckDocument);
  const allCheckableSelected =
    checkableItems.length > 0 &&
    checkableItems.every((item) => selectedIds.has(item.id));

  const someCheckableSelected = checkableItems.some((item) =>
    selectedIds.has(item.id),
  );

  // ==========================================
  // Пагинация — набор номеров страниц для отображения.
  // Показываем: первая, последняя, текущая ± 1, "…" между ними.
  // Для простоты — показываем все, если <= 7 страниц.
  // ==========================================
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);
    return pages;
  };

  // ==========================================
  // Пока данные грузятся и список пуст — показываем скелетон.
  // Если список уже есть (например, при пагинации) — рендерим таблицу.
  // ==========================================
  if (isLoading && items.length === 0) {
    return <HTTableSkeleton rows={Math.min(pageSize, 10)} />;
  }

  return (
    <div className={styles.tableRoot}>
      {/* ============================== */}
      {/* Инфо-строка над таблицей */}
      {/* ============================== */}
      <div className={styles.topBar}>
        <span className={styles.totalLabel}>
          Найдено записей: <strong>{totalCount}</strong>
        </span>
      </div>

      {/* ============================== */}
      {/* Таблица */}
      {/* ============================== */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={styles.checkboxCell}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  size="small"
                  checked={allCheckableSelected}
                  indeterminate={someCheckableSelected && !allCheckableSelected}
                  onChange={(e) => onToggleAll(e.currentTarget.checked)}
                  disabled={checkableItems.length === 0 || isLoading}
                  sx={{ padding: 0 }}
                />
              </th>
              <th className={styles.numberCell}>№</th>
              <th>Дата загрузки</th>
              <th>Имя файла</th>
              <th>Тип</th>
              <th>Код МО</th>
              <th>Период</th>
              <th className={styles.numberCell}>Записей</th>
              <th>Статус</th>
              <th className={styles.actionsCell}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className={styles.emptyCell}>
                    <HTEmptyState
                      compact
                      title="Документы не найдены"
                      description="Попробуйте изменить фильтры или сбросить их."
                      action={
                        onResetFilters
                          ? {
                              label: "Сбросить фильтры",
                              onClick: onResetFilters,
                            }
                          : undefined
                      }
                    />
                  </td>
                </tr>
              ) : (
              items.map((doc, index) => {
                const isCheckable = canCheckDocument(doc);
                const isSelected = selectedIds.has(doc.id);
                const canDownload = canDownloadResponse(doc);

                return (
                  <tr
                    key={doc.id}
                    className={`${isSelected ? styles.selectedRow : ""} ${styles.clickableRow}`}
                    onClick={() => onOpenDetails(doc)}
                    title="Открыть детали документа"
                  >
                    {/* Чекбокс */}
                    <td
                      className={styles.checkboxCell}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isCheckable ? (
                        <Checkbox
                          size="small"
                          checked={isSelected}
                          onChange={() => onToggleRow(doc.id)}
                          sx={{ padding: 0 }}
                        />
                      ) : (
                        <span className={styles.noCheckbox} />
                      )}
                    </td>

                    {/* № */}
                    <td className={styles.numberCell}>
                      {(page - 1) * pageSize + index + 1}
                    </td>

                    {/* Дата загрузки */}
                    <td>{formatDateTime(doc.uploadDate)}</td>

                    {/* Имя файла */}
                    <td>
                      <span className={styles.fileName}>{doc.fileName}</span>
                    </td>

                    {/* Тип */}
                    <td>
                      <HTDocumentTypeBadge fileType={doc.fileType} />
                    </td>

                    {/* Код МО */}
                    <td>{doc.hospitalCode ?? "—"}</td>

                    {/* Период */}
                    <td>{doc.period}</td>

                    {/* Записей */}
                    <td className={styles.numberCell}>
                      {formatNumber(doc.recordsCount)}
                    </td>

                    {/* Статус */}
                    <td>
                      <HTDocumentStatusBadge status={doc.status} />
                    </td>

                    {/* Действия */}
                    <td
                      className={styles.actionsCell}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.actionsInner}>
                        {isCheckable && (
                          <Tooltip title="Проверить документ">
                            <IconButton
                              size="small"
                              onClick={() => onCheckOne(doc.id)}
                              disabled={isLoading}
                              sx={{
                                color: "var(--text-secondary)",
                                "&:hover": { color: "#1a7f37" },
                              }}
                            >
                              <CheckCircleOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                        {canDownload && (
                          <Tooltip title="Скачать ответный файл">
                            <IconButton
                              size="small"
                              onClick={() => onDownloadResponse(doc)}
                              disabled={isLoading}
                              sx={{
                                color: "var(--text-secondary)",
                                "&:hover": { color: "#1a4fbf" },
                              }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                        {/* 🆕 Удаление — если есть право и статус позволяет */}
                        {canDelete && doc.status !== "Checking" && (
                          <Tooltip title="Удалить документ">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(doc)}
                              disabled={isLoading}
                              sx={{
                                color: "var(--text-secondary)",
                                "&:hover": { color: "#b91c1c" },
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                        {/* Заглушка "—" — если нет ни одного действия */}
                        {!isCheckable &&
                          !canDownload &&
                          (!canDelete || doc.status === "Checking") && (
                            <span className={styles.noActions}>—</span>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ============================== */}
      {/* Пагинация снизу */}
      {/* ============================== */}
      <div className={styles.paginationRow}>
        <div className={styles.pageSizeBlock}>
          <span>Показывать по:</span>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.currentTarget.value))}
            disabled={isLoading}
          >
            {[25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pageNumbers}>
          <IconButton
            size="small"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          {getPageNumbers().map((num, i) =>
            num === "ellipsis" ? (
              <span key={`e-${i}`} className={styles.ellipsis}>
                …
              </span>
            ) : (
              <button
                key={num}
                type="button"
                className={`${styles.pageButton} ${
                  num === page ? styles.pageButtonActive : ""
                }`}
                onClick={() => onPageChange(num)}
                disabled={isLoading}
              >
                {num}
              </button>
            ),
          )}

          <IconButton
            size="small"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};