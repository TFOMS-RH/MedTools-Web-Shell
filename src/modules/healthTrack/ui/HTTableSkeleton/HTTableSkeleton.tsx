// ==========================================
// modules/healthTrack/ui/HTTableSkeleton/HTTableSkeleton.tsx
// ==========================================
import Skeleton from "@mui/material/Skeleton";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTTableSkeletonProps {
  /** Количество строк-скелетонов. По умолчанию 5. */
  rows?: number;
}

/**
 * Скелетон таблицы документов.
 * Показывается вместо реальной таблицы во время загрузки данных.
 *
 * Имитирует 10 колонок: чекбокс, №, дата, имя, тип, МО, период, записей,
 * статус, действия.
 */
export const HTTableSkeleton = ({ rows = 5 }: HTTableSkeletonProps) => {
  // ==========================================
  // Разные ширины для разных колонок — чтобы выглядело натуральнее.
  // ==========================================
  const widthsByColumn = [
    "1.5rem",   // чекбокс
    "2rem",     // №
    "8rem",     // дата загрузки
    "16rem",    // имя файла
    "4rem",     // тип
    "5rem",     // код МО
    "5rem",     // период
    "4rem",     // записей
    "6rem",     // статус
    "4rem",     // действия
  ];

  return (
    <div className={styles.tableRoot}>
      {/* Верхняя инфо-строка */}
      <div className={styles.topBar}>
        <Skeleton
          variant="text"
          width="10rem"
          height={20}
          animation="wave"
        />
      </div>

      {/* Обёртка таблицы */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {[
                { name: "Чекбокс", width: "1.5rem" },
                { name: "№", width: "2rem" },
                { name: "Дата загрузки", width: "8rem" },
                { name: "Имя файла", width: "16rem" },
                { name: "Тип", width: "4rem" },
                { name: "Код МО", width: "5rem" },
                { name: "Период", width: "5rem" },
                { name: "Записей", width: "4rem" },
                { name: "Статус", width: "6rem" },
                { name: "Действия", width: "4rem" },
                ].map((col) => (
                <th key={col.name}>
                    <Skeleton variant="text" width={col.width} height={14} animation="wave" />
                </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {widthsByColumn.map((width, colIdx) => (
                  <td key={colIdx}>
                    <Skeleton
                      variant="text"
                      width={width}
                      height={16}
                      animation="wave"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};