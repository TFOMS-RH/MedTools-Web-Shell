// ==========================================
// modules/healthTrack/features/registerDn/HTRegisterDnFilters/HTRegisterDnFilters.tsx
// ==========================================
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { AppButton } from "../../../../../components/ui/AppButton/AppButton";

import styles from "./styles.module.scss";

// ==========================================
// Локальное состояние фильтров.
// ==========================================
export interface HTRegisterDnFiltersValue {
  searchQuery: string;
  hospitalCode: string;
  diagCode: string;
  period: string;
  status: "" | "active" | "closed";
}

// ==========================================
// Пропсы.
// ==========================================
interface HTRegisterDnFiltersProps {
  value: HTRegisterDnFiltersValue;
  onChange: (next: HTRegisterDnFiltersValue) => void;
  onSubmit: () => void;
  onReset: () => void;
  disabled?: boolean;
}

/**
 * Панель фильтров реестра ДН.
 * Компактные inline-поля с placeholder вместо label.
 */
export const HTRegisterDnFilters = ({
  value,
  onChange,
  onSubmit,
  onReset,
  disabled = false,
}: HTRegisterDnFiltersProps) => {
  const update = <K extends keyof HTRegisterDnFiltersValue>(
    field: K,
    fieldValue: HTRegisterDnFiltersValue[K],
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

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
        placeholder="Поиск: ФИО или ЕНП…"
        value={value.searchQuery}
        onChange={(e) => update("searchQuery", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Код МО */}
      <input
        className={styles.filterField}
        type="text"
        placeholder="Код МО"
        value={value.hospitalCode}
        onChange={(e) => update("hospitalCode", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Диагноз */}
      <input
        className={styles.filterField}
        type="text"
        placeholder="Диагноз (МКБ-10)"
        value={value.diagCode}
        onChange={(e) => update("diagCode", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Период */}
      <input
        className={styles.filterField}
        type="text"
        placeholder="Период (2026-09)"
        value={value.period}
        onChange={(e) => update("period", e.currentTarget.value)}
        disabled={disabled}
      />

      {/* Статус ДН */}
      <select
        className={styles.filterField}
        value={value.status}
        onChange={(e) =>
          update("status", e.currentTarget.value as "" | "active" | "closed")
        }
        disabled={disabled}
      >
        <option value="">Все статусы</option>
        <option value="active">На учёте</option>
        <option value="closed">Снят</option>
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