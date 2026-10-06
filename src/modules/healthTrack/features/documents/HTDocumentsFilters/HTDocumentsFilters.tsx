// ==========================================
// modules/healthTrack/features/documents/HTDocumentsFilters/HTDocumentsFilters.tsx
// ==========================================
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { AppButton } from "../../../../../components/ui/AppButton/AppButton";

import {
  HT_FILE_TYPE_LABELS,
  HT_STATUS_LABELS,
  type HTDocumentFileType,
  type HTDocumentStatus,
} from "../../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Локальное состояние фильтров.
// ==========================================
export interface HTDocumentsFiltersValue {
  searchQuery: string;
  fileType: HTDocumentFileType | "";
  hospitalCode: string;
  period: string;
  status: HTDocumentStatus | "";
}

// ==========================================
// Пропсы.
// ==========================================
interface HTDocumentsFiltersProps {
  value: HTDocumentsFiltersValue;
  onChange: (next: HTDocumentsFiltersValue) => void;
  onSubmit: () => void;
  onReset: () => void;
  availablePeriods: string[];
  disabled?: boolean;
}

// ==========================================
// Опции для select-ов.
// ==========================================
const FILE_TYPE_OPTIONS = [
  { label: "Все типы", value: "" },
  ...Object.entries(HT_FILE_TYPE_LABELS).map(([key, label]) => ({
    label,
    value: key,
  })),
];

const STATUS_OPTIONS = [
  { label: "Все статусы", value: "" },
  ...Object.entries(HT_STATUS_LABELS).map(([key, label]) => ({
    label,
    value: key,
  })),
];

/**
 * Панель фильтров раздела «Документы».
 * Компактные inline-поля с placeholder вместо label.
 */
export const HTDocumentsFilters = ({
  value,
  onChange,
  onSubmit,
  onReset,
  availablePeriods,
  disabled = false,
}: HTDocumentsFiltersProps) => {
  const update = <K extends keyof HTDocumentsFiltersValue>(
    field: K,
    fieldValue: HTDocumentsFiltersValue[K],
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const periodOptions = [
    { label: "Все периоды", value: "" },
    ...availablePeriods.map((p) => ({ label: p, value: p })),
  ];

  return (
    <form
      className={styles.filtersRoot}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* Поиск */}
      <input
        className={`${styles.filterField} ${styles.searchField}`}
        type="text"
        placeholder="Поиск: имя файла, код МО…"
        value={value.searchQuery}
        onChange={(e) => update("searchQuery", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Тип файла */}
      <select
        className={styles.filterField}
        value={value.fileType}
        onChange={(e) =>
          update("fileType", e.currentTarget.value as HTDocumentFileType | "")
        }
        disabled={disabled}
      >
        {FILE_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Код МО */}
      <input
        className={styles.filterField}
        type="text"
        placeholder="Код МО (например, 190006)"
        value={value.hospitalCode}
        onChange={(e) => update("hospitalCode", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Период */}
      <select
        className={styles.filterField}
        value={value.period}
        onChange={(e) => update("period", e.currentTarget.value)}
        disabled={disabled}
      >
        {periodOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Статус */}
      <select
        className={styles.filterField}
        value={value.status}
        onChange={(e) =>
          update("status", e.currentTarget.value as HTDocumentStatus | "")
        }
        disabled={disabled}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Кнопки */}
      <AppButton variant="primary" size="md" type="submit" disabled={disabled}>
        <SearchIcon sx={{ fontSize: 18, color: "var(--white)" }} />
        Найти
      </AppButton>

      <AppButton
        variant="secondary"
        size="md"
        type="button"
        onClick={onReset}
        disabled={disabled}
      >
        <RestartAltIcon sx={{ fontSize: 18 }} />
        Сбросить
      </AppButton>
    </form>
  );
};