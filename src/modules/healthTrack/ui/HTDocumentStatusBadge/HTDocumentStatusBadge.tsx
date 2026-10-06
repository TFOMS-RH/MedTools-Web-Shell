// ==========================================
// modules/healthTrack/ui/HTDocumentStatusBadge/HTDocumentStatusBadge.tsx
// ==========================================
import {
  HT_STATUS_COLORS,
  HT_STATUS_LABELS,
  type HTDocumentStatus,
} from "../../types/htDocuments";
import styles from "./styles.module.scss";

interface HTDocumentStatusBadgeProps {
  /** Статус документа: Uploaded / Checking / Ready / Error / Queued. */
  status: HTDocumentStatus;
}

/**
 * Badge (плашка) статуса документа.
 *
 * Цвет и текст берутся из маппингов HT_STATUS_COLORS / HT_STATUS_LABELS.
 * Чтобы поменять отображение — правим htDocuments.ts, а не здесь.
 */
export const HTDocumentStatusBadge = ({
  status,
}: HTDocumentStatusBadgeProps) => {
  const label = HT_STATUS_LABELS[status];
  const colors = HT_STATUS_COLORS[status];

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: colors.bg,
        color: colors.color,
      }}
    >
      {label}
    </span>
  );
};