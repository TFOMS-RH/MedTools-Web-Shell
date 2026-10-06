// ==========================================
// modules/healthTrack/pages/HTMain/HTMain.tsx
// ==========================================
import { useCallback, useState } from "react";

import {
  HTTabCards,
  type HTTabKey,
} from "../../components/HTTabCards/HTTabCards";

import { HTDocumentsTab } from "../../features/documents/HTDocumentsTab";
import { HTImportTab } from "../../features/import/HTImportTab";
import { HTRegisterDnTab } from "../../features/registerDn/HTRegisterDnTab";
import { HTStatisticsTab } from "../../features/statistics/HTStatisticsTab";

import styles from "./styles.module.scss";

/**
 * Главная модуля HealthTrack.
 *
 * Управляет активным табом и «отложенным» ID документа.
 * Если пользователь импортировал документ и нажал «Перейти к документу»,
 * мы запоминаем ID и переключаемся на таб «Документы», который открывает drawer.
 */
export const HTMain = () => {
  const [activeTab, setActiveTab] = useState<HTTabKey>("documents");

  // ID документа для открытия в drawer. Устанавливается после импорта.
  // После того как HTDocumentsTab откроет drawer, он его сбросит.
  const [pendingDocumentId, setPendingDocumentId] = useState<number | null>(
    null,
  );

  // ==========================================
  // Переключение таба.
  // ==========================================
  const handleTabChange = useCallback((key: HTTabKey) => {
    setActiveTab(key);
    // При ручном переключении таба — сбрасываем «ожидающий» документ.
    // Иначе можно случайно открыть drawer в неудачный момент.
    setPendingDocumentId(null);
  }, []);

  // ==========================================
  // Переход к документу после импорта.
  // ==========================================
  const handleGoToDocument = useCallback((documentId: number) => {
    setPendingDocumentId(documentId);
    setActiveTab("documents");
  }, []);

  // ==========================================
  // Сброс pendingDocumentId после открытия drawer.
  // ==========================================
  const handleConsumedPendingDocument = useCallback(() => {
    setPendingDocumentId(null);
  }, []);

  // ==========================================
  // Рендер контента активного таба.
  // ==========================================
  const renderTabContent = () => {
    switch (activeTab) {
      case "documents":
        return (
          <HTDocumentsTab
            initialDocumentId={pendingDocumentId}
            onInitialDocumentConsumed={handleConsumedPendingDocument}
          />
        );
      case "import":
        return <HTImportTab onGoToDocument={handleGoToDocument} />;
      case "registerDn":
        return <HTRegisterDnTab />;
      case "statistics":
        return <HTStatisticsTab />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.mainRoot}>
      <header className={styles.mainHeader}>
        <h1>HealthTrack</h1>
        <p className={styles.subtitle}>
          Управление информированием и регистрами граждан
        </p>
      </header>

      <HTTabCards activeTab={activeTab} onTabChange={handleTabChange} />

      <section className={styles.tabContent}>{renderTabContent()}</section>
    </section>
  );
};