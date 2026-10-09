import type { ReactNode } from "react";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import type { HTRole } from "../../types/htAuth";

import styles from "./styles.module.scss";

export type HTTabKey = "documents" | "import" | "registerDn" | "statistics";

interface HTTabDefinition {
  key: HTTabKey;
  title: string;
  description: string;
  icon: ReactNode;
  roles: HTRole[];
}

const TABS: HTTabDefinition[] = [
  {
    key: "documents",
    title: "Документы и экспорт",
    description: "Просмотр, проверка и выгрузка файлов",
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: [],
  },
  {
    key: "import",
    title: "Импорт",
    description: "Загрузка XML/ZIP файлов от МО и СМО",
    icon: <UploadFileOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: [],
  },
  {
    key: "registerDn",
    title: "Регистр ДН",
    description: "Реестр граждан на диспансерном наблюдении",
    icon: <AssignmentOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: [],
  },
  {
    key: "statistics",
    title: "Статистика",
    description: "Аналитика и отчёты по загруженным данным",
    icon: <BarChartOutlinedIcon sx={{ fontSize: 28 }} />,
    roles: [],
  },
];

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
  return (
    <div className={styles.tabsRoot}>
      {TABS.map((tab) => {
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
