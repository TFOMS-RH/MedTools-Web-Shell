// ==========================================
// modules/healthTrack/features/documents/HTDocumentsStats/HTDocumentsStats.tsx
// ==========================================
import UploadIcon from "@mui/icons-material/Upload";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import type {
  HTDocumentsSummary,
  HTDocumentStatus,
  HTDocumentFileType,
} from "../../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTDocumentsStatsProps {
  /** Метрики (из useDocumentsSummaryQuery). */
  summary: HTDocumentsSummary;

  /** Активный фильтр по статусу (null — не фильтруем). */
  activeStatus: HTDocumentStatus | null;

  /** Активный фильтр по типу (null — не фильтруем). */
  activeFileType: HTDocumentFileType | null;

  /** Клик по плитке статуса. Передаём null чтобы сбросить фильтр. */
  onStatusClick: (status: HTDocumentStatus | null) => void;

  /** Клик по плитке типа. Передаём null чтобы сбросить фильтр. */
  onFileTypeClick: (fileType: HTDocumentFileType | null) => void;
}

// ==========================================
// Описание плитки статуса.
// ==========================================
interface StatusTile {
  key: HTDocumentStatus;
  label: string;
  value: number;
  icon: React.ReactNode;
}

// ==========================================
// Описание плитки типа.
// fileTypes — массив значений enum'а, которые входят в эту группу.
// Для GST/GSM = ["GST", "GSM"]. Для DSPN = ["DSPN"].
// Клик по плитке отправляет... но у нас один activeFileType.
// Поэтому для сгруппированных плиток передаём "массив" — фильтр по нескольким.
// ==========================================
interface TypeTile {
  key: string;                        // для UI-ключа рендера
  label: string;                      // заголовок плитки
  value: number;                      // число из метрик
  fileTypes: HTDocumentFileType[];    // какие типы входят в эту плитку
}

/**
 * Секция метрик раздела «Документы и экспорт».
 *
 * Показывает две строки плиток:
 *  - статусы документов (5 плиток)
 *  - типы файлов (6 плиток)
 *
 * Каждая плитка кликабельна — фильтр по значению.
 */
export const HTDocumentsStats = ({
  summary,
  activeStatus,
  activeFileType,
  onStatusClick,
  onFileTypeClick,
}: HTDocumentsStatsProps) => {
  // ==========================================
  // Собираем плитки статусов.
  // ==========================================
  const statusTiles: StatusTile[] = [
    {
      key: "Uploaded",
      label: "Загружено",
      value: summary.byStatus.uploaded,
      icon: <UploadIcon sx={{ fontSize: 22 }} />,
    },
    {
      key: "Checking",
      label: "Проверяется",
      value: summary.byStatus.checking,
      icon: <AutorenewIcon sx={{ fontSize: 22 }} />,
    },
    {
      key: "Ready",
      label: "Готово",
      value: summary.byStatus.ready,
      icon: <CheckCircleIcon sx={{ fontSize: 22 }} />,
    },
    {
      key: "Error",
      label: "Ошибка",
      value: summary.byStatus.error,
      icon: <ErrorIcon sx={{ fontSize: 22 }} />,
    },
    {
      key: "Queued",
      label: "В очереди",
      value: summary.byStatus.queued,
      icon: <HourglassEmptyIcon sx={{ fontSize: 22 }} />,
    },
  ];

  // ==========================================
  // Собираем плитки типов.
  // ==========================================
  const typeTiles: TypeTile[] = [
    {
      key: "gstGsm",
      label: "GST / GSM",
      value: summary.byType.gstGsm,
      fileTypes: ["GST", "GSM"],
    },
    {
      key: "gptGpm",
      label: "GPT / GPM",
      value: summary.byType.gptGpm,
      fileTypes: ["GPT", "GPM"],
    },
    {
      key: "dspn",
      label: "DSPN",
      value: summary.byType.dspn,
      fileTypes: ["DSPN"],
    },
    {
      key: "prof",
      label: "PROF",
      value: summary.byType.prof,
      fileTypes: ["PROF"],
    },
    {
      key: "gf",
      label: "GF",
      value: summary.byType.gf,
      fileTypes: ["GF"],
    },
    {
      key: "pf",
      label: "PF",
      value: summary.byType.pf,
      fileTypes: ["PF"],
    },
  ];

  return (
    <div className={styles.statsRoot}>
      {/* ============================== */}
      {/* Строка 1: статусы */}
      {/* ============================== */}
      <div className={styles.tilesRow}>
        {statusTiles.map((tile) => {
          const isActive = activeStatus === tile.key;

          return (
            <button
              key={tile.key}
              type="button"
              className={`${styles.tile} ${isActive ? styles.active : ""}`}
              onClick={() => onStatusClick(isActive ? null : tile.key)}
              title={isActive ? "Сбросить фильтр" : `Показать: ${tile.label}`}
            >
              <div className={styles.tileHeader}>
                <span className={styles.tileLabel}>
                  {tile.label.toUpperCase()}
                </span>
                <span className={styles.tileIcon}>{tile.icon}</span>
              </div>
              <span className={styles.tileValue}>{tile.value}</span>
            </button>
          );
        })}
      </div>

      {/* ============================== */}
      {/* Строка 2: типы файлов */}
      {/* ============================== */}
      <div className={styles.tilesRow}>
        {typeTiles.map((tile) => {
          // Активна, если активный тип входит в эту плитку.
          const isActive = tile.fileTypes.includes(activeFileType as never);

          return (
            <button
              key={tile.key}
              type="button"
              className={`${styles.tile} ${styles.tileSmall} ${isActive ? styles.active : ""}`}
              onClick={() => onFileTypeClick(isActive ? null : tile.fileTypes[0])}
              title={isActive ? "Сбросить фильтр" : `Показать: ${tile.label}`}
            >
              <span className={styles.tileLabel}>{tile.label}</span>
              <span className={styles.tileValue}>{tile.value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};