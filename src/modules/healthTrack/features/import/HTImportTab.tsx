// ==========================================
// modules/healthTrack/features/import/HTImportTab.tsx
// ==========================================
import { HTImportForm } from "./HTImportForm/HTImportForm";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTImportTabProps {
  /**
   * Колбэк: перейти к документу в разделе «Документы».
   * Вызывается из карточки результата после успешного импорта.
   */
  onGoToDocument: (documentId: number) => void;
}

/**
 * Раздел «Импорт» на главной странице HealthTrack.
 * Обёртка над HTImportForm. Прокидывает onGoToDocument вверх — в HTMain.
 */
export const HTImportTab = ({ onGoToDocument }: HTImportTabProps) => {
  return (
    <section className={styles.tabRoot}>
      <HTImportForm onGoToDocument={onGoToDocument} />
    </section>
  );
};