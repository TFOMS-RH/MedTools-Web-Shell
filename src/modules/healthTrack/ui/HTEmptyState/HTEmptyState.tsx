// ==========================================
// modules/healthTrack/ui/HTEmptyState/HTEmptyState.tsx
// ==========================================
import type { ReactNode } from "react";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

import { AppButton } from "../../../../components/ui/AppButton/AppButton";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTEmptyStateProps {
  /** Иконка. По умолчанию — Inbox. */
  icon?: ReactNode;

  /** Заголовок. */
  title: string;

  /** Описание (опционально). */
  description?: string;

  /** Кнопка действия (опционально). */
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  };

  /** Компактный режим (для встраивания в таблицу). */
  compact?: boolean;
}

/**
 * Универсальное пустое состояние.
 *
 * Используется, когда список/таблица пусты:
 *   - документов нет
 *   - фильтры ничего не нашли
 *   - данных недостаточно
 *
 * Может иметь кнопку действия:
 *   - «Сбросить фильтры»
 *   - «Обновить»
 *   - «Загрузить файл»
 */
export const HTEmptyState = ({
  icon,
  title,
  description,
  action,
  compact = false,
}: HTEmptyStateProps) => {
  return (
    <div className={`${styles.emptyRoot} ${compact ? styles.compact : ""}`}>
      <div className={styles.iconWrapper}>
        {icon ?? <InboxOutlinedIcon sx={{ fontSize: compact ? 32 : 48 }} />}
      </div>

      <h3 className={styles.title}>{title}</h3>

      {description && <p className={styles.description}>{description}</p>}

      {action && (
        <div className={styles.actionWrapper}>
          <AppButton
            variant={action.variant ?? "secondary"}
            size="md"
            onClick={action.onClick}
          >
            {action.label}
          </AppButton>
        </div>
      )}
    </div>
  );
};