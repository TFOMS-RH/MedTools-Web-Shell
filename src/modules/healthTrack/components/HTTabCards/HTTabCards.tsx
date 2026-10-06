// ==========================================
// modules/healthTrack/components/HTTabCards/HTTabCards.tsx
// ==========================================
import { useMemo } from "react";
import type { ReactNode } from "react";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import { useHasRole } from "../../hooks/useHasRole";
import type { HTRole } from "../../types/htAuth";

import styles from "./styles.module.scss";

// ==========================================
// Ключи табов — единый источник правды.
// Используется и здесь, и в HTMain для switch.
// ==========================================
export type HTTabKey =
  | "documents"
  | "import"
  | "registerDn"
  | "statistics";

// ==========================================
// Описание одного таба.
// ==========================================
interface HTTabDefinition {
  key: HTTabKey;
  title: string;
  description: string;
  icon: ReactNode;
  /** Кто видит этот таб. Пустой массив = видят все. */
  roles: HTRole[];
}

// ==========================================
// Каталог всех табов.
// ==========================================
const TABS: HTTabDefinition[] = [
  {
    key: "documents",
    title: "Документы и экспорт",
    description: "Просмотр, проверка и выгрузка файлов",
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: ["Admin", "MO", "TFOMS"],
  },
  {
    key: "import",
    title: "Импорт",
    description: "Загрузка XML/ZIP файлов от МО и СМО",
    icon: <UploadFileOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: ["Admin", "MO", "SMO"],
  },
  {
    key: "registerDn",
    title: "Регистр ДН",
    description: "Реестр граждан на диспансерном наблюдении",
    icon: <AssignmentOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: ["Admin", "MO", "TFOMS", "SMO"],
  },
  {
    key: "statistics",
    title: "Статистика",
    description: "Аналитика и отчёты по загруженным данным",
    icon: <BarChartOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: ["Admin", "TFOMS"],
  },
];

// ==========================================
// Пропсы компонента.
// ==========================================
interface HTTabCardsProps {
  activeTab: HTTabKey;
  onTabChange: (key: HTTabKey) => void;
}

/**
 * Ряд карточек-табов над контентом HTMain.
 *
 * Фильтрует карточки по ролям пользователя через useHasRole.
 * Активная подсвечивается тёмной обводкой.
 */
export const HTTabCards = ({ activeTab, onTabChange }: HTTabCardsProps) => {
  // Берём роли пользователя один раз — все useHasRole подписываются
  // на один и тот же селектор Zustand, так что overhead минимален.
  const isAdmin = useHasRole("Admin");
  const isMo = useHasRole("MO");
  const isTfoms = useHasRole("TFOMS");
  const isSmo = useHasRole("SMO");

  // Собираем доступные табы.
  // useMemo, чтобы не пересоздавать массив на каждый рендер.
  const visibleTabs = useMemo(() => {
    const roleFlags: Record<HTRole, boolean> = {
      Admin: isAdmin,
      MO: isMo,
      TFOMS: isTfoms,
      SMO: isSmo,
    };

    return TABS.filter((tab) => {
      // Пустой roles = показываем всем (у нас таких нет, но на будущее).
      if (tab.roles.length === 0) return true;
      // Иначе — хотя бы одна роль должна быть у пользователя.
      return tab.roles.some((role) => roleFlags[role]);
    });
  }, [isAdmin, isMo, isTfoms, isSmo]);

  return (
    <div className={styles.tabsRoot}>
      {visibleTabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <button
            key={tab.key}
            type="button"
            className={`${styles.tabCard} ${isActive ? styles.active : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            <div className={styles.tabIcon}>{tab.icon}</div>

            <div className={styles.tabText}>
              <h3>{tab.title}</h3>
              <p>{tab.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};