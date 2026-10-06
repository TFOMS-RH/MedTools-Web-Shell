// ==========================================
// modules/healthTrack/ui/HTDocumentTypeBadge/HTDocumentTypeBadge.tsx
// ==========================================
import {
  HT_FILE_TYPE_COLORS,
  HT_FILE_TYPE_LABELS,
  type HTDocumentFileType,
} from "../../types/htDocuments";
import styles from "./styles.module.scss";

interface HTDocumentTypeBadgeProps {
  /** Тип файла: GST / GPT / GSM / GPM / GF / PF / DSPN / PROF. */
  fileType: HTDocumentFileType;
}

/**
 * Badge (плашка) типа файла документа.
 *
 * Цвет и текст берутся из маппингов HT_FILE_TYPE_COLORS / HT_FILE_TYPE_LABELS.
 * Чтобы поменять отображение — правим htDocuments.ts, а не здесь.
 */
export const HTDocumentTypeBadge = ({
  fileType,
}: HTDocumentTypeBadgeProps) => {
  const label = HT_FILE_TYPE_LABELS[fileType];
  const colors = HT_FILE_TYPE_COLORS[fileType];

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