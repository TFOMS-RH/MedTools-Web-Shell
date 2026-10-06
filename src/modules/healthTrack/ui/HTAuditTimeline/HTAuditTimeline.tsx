// ==========================================
// modules/healthTrack/ui/HTAuditTimeline/HTAuditTimeline.tsx
// ==========================================
import {
  HT_AUDIT_ACTION_COLORS,
  HT_AUDIT_ACTION_COLORS_DEFAULT,
  HT_AUDIT_ACTION_LABELS,
  type HTDocumentAuditItem,
} from "../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTAuditTimelineProps {
  /** Записи аудита. */
  items: HTDocumentAuditItem[];

  /** Загрузка? (показываем skeleton) */
  isLoading: boolean;

  /** Ошибка? (показываем сообщение) */
  isError: boolean;
}

// ==========================================
// Форматирование даты "DD.MM.YYYY HH:mm".
// ==========================================
const formatDateTime = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

/**
 * Таймлайн действий по документу.
 *
 * Показывает список событий в обратном хронологическом порядке
 * (самые свежие — сверху).
 */
export const HTAuditTimeline = ({
  items,
  isLoading,
  isError,
}: HTAuditTimelineProps) => {
  // ==========================================
  // Загрузка.
  // ==========================================
  if (isLoading) {
    return (
      <div className={styles.message}>
        <span>Загрузка истории…</span>
      </div>
    );
  }

  // ==========================================
  // Ошибка.
  // ==========================================
  if (isError) {
    return (
      <div className={styles.errorMessage}>
        Не удалось загрузить историю документа
      </div>
    );
  }

  // ==========================================
  // Пустая история.
  // ==========================================
  if (items.length === 0) {
    return (
      <div className={styles.message}>
        <span>Истории пока нет</span>
        <span className={styles.messageHint}>
          Действия по этому документу будут отображаться здесь
        </span>
      </div>
    );
  }

  // ==========================================
  // Таймлайн.
  // ==========================================
  return (
    <div className={styles.timeline}>
      {items.map((item) => {
        const actionLabel =
          HT_AUDIT_ACTION_LABELS[item.actionType] ?? item.actionType;

        const actionColors =
          HT_AUDIT_ACTION_COLORS[item.actionType] ??
          HT_AUDIT_ACTION_COLORS_DEFAULT;

        const isError = item.result === "ERROR";

        return (
          <div key={item.id} className={styles.event}>
            {/* Точка / линия слева */}
            <div className={styles.marker}>
              <div
                className={`${styles.dot} ${
                  isError ? styles.dotError : ""
                }`}
              />
              <div className={styles.line} />
            </div>

            {/* Контент события */}
            <div className={styles.eventContent}>
              <div className={styles.eventHeader}>
                <span
                  className={styles.actionBadge}
                  style={{
                    backgroundColor: actionColors.bg,
                    color: actionColors.color,
                  }}
                >
                  {actionLabel}
                </span>

                <span className={styles.date}>
                  {formatDateTime(item.createdAt)}
                </span>
              </div>

              <div className={styles.userBlock}>
                <span className={styles.userName}>{item.userName}</span>
                {item.userRole && (
                  <span className={styles.userRole}>
                    {item.userRole}
                  </span>
                )}
              </div>

              {item.actionDetail && (
                <p className={styles.detail}>{item.actionDetail}</p>
              )}

              {isError && item.errorMessage && (
                <p className={styles.errorText}>{item.errorMessage}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};