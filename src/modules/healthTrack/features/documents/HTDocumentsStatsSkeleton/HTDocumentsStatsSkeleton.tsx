// ==========================================
// modules/healthTrack/features/documents/HTDocumentsStatsSkeleton/HTDocumentsStatsSkeleton.tsx
// ==========================================
import Skeleton from "@mui/material/Skeleton";

import styles from "./styles.module.scss";

/**
 * Скелетон секции метрик.
 * Показывается, пока summary не загружены.
 *
 * Имитирует две строки плиток: 5 статусов + 6 типов.
 */
export const HTDocumentsStatsSkeleton = () => {
  return (
    <div className={styles.statsRoot}>
      {/* Строка статусов */}
      <div className={styles.tilesRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.tile}>
            <div className={styles.tileHeader}>
              <Skeleton
                variant="text"
                width="6rem"
                height={12}
                animation="wave"
              />
              <Skeleton
                variant="circular"
                width={22}
                height={22}
                animation="wave"
              />
            </div>
            <Skeleton
              variant="text"
              width="2.5rem"
              height={28}
              animation="wave"
            />
          </div>
        ))}
      </div>

      {/* Строка типов */}
      <div className={styles.tilesRow}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.tile} ${styles.tileSmall}`}>
            <Skeleton
              variant="text"
              width="4rem"
              height={12}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width="2rem"
              height={22}
              animation="wave"
            />
          </div>
        ))}
      </div>
    </div>
  );
};