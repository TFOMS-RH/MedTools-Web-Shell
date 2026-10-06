// ==========================================
// modules/healthTrack/ui/HTDocumentDetailsDrawer/HTDocumentDetailsDrawer.tsx
// ==========================================
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DownloadIcon from "@mui/icons-material/Download";

import { AppButton } from "../../../../components/ui/AppButton/AppButton";
import { HTDocumentStatusBadge } from "../HTDocumentStatusBadge/HTDocumentStatusBadge";
import { HTDocumentTypeBadge } from "../HTDocumentTypeBadge/HTDocumentTypeBadge";
import { HTAuditTimeline } from "../HTAuditTimeline/HTAuditTimeline";

import {
  useDocumentAuditQuery,
  useDocumentDetailsQuery,
} from "../../hooks/useDocumentsQueries";

import {
  canCheckDocument,
  canDownloadResponse,
  type HTDocumentListItem,
} from "../../types/htDocuments";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTDocumentDetailsDrawerProps {
  documentId: number | null;
  onClose: () => void;
  onCheck: (id: number) => void;
  onDownloadResponse: (doc: HTDocumentListItem) => void;
  actionInProgress?: boolean;
}

// ==========================================
// Форматирование.
// ==========================================
const formatDateTime = (iso: string | null): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

const formatNumber = (n: number | null | undefined): string => {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("ru-RU");
};

/**
 * Drawer с деталями документа и историей действий.
 */
export const HTDocumentDetailsDrawer = ({
  documentId,
  onClose,
  onCheck,
  onDownloadResponse,
  actionInProgress = false,
}: HTDocumentDetailsDrawerProps) => {
  // ==========================================
  // Вкладки.
  // ==========================================
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");

  // Сброс вкладки при смене документа.
  useEffect(() => {
    setActiveTab("details");
  }, [documentId]);

  // ==========================================
  // Запросы.
  // ==========================================
  const {
    data: doc,
    isLoading,
    isError,
  } = useDocumentDetailsQuery(documentId);

  const {
    data: auditItems,
    isLoading: isAuditLoading,
    isError: isAuditError,
  } = useDocumentAuditQuery(documentId);

  const open = documentId !== null;

  // ==========================================
  // Действия.
  // ==========================================
  const isCheckable = doc ? canCheckDocument(doc) : false;
  const isDownloadable = doc ? canDownloadResponse(doc) : false;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: "32rem", md: "36rem" },
            maxWidth: "100%",
            borderLeft: "1px solid var(--border-default)",
            background: "var(--card-background)",
          },
        },
      }}
    >
      {/* ============================== */}
      {/* Header */}
      {/* ============================== */}
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h3 className={styles.title}>Документ</h3>
          {doc && (
            <p className={styles.fileName} title={doc.fileName}>
              {doc.fileName}
            </p>
          )}
        </div>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "var(--text-secondary)",
            "&:hover": { background: "var(--gray-100)" },
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </header>

      {/* ============================== */}
      {/* Вкладки */}
      {/* ============================== */}
      {doc && !isLoading && !isError && (
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          sx={{
            minHeight: 40,
            borderBottom: "1px solid var(--border-default)",
            px: "var(--space-8)",
            "& .MuiTab-root": {
              textTransform: "none",
              fontFamily: "var(--inter)",
              fontSize: "var(--fs-body2)",
              fontWeight: "var(--fw-semibold)",
              color: "var(--text-secondary)",
              minHeight: 40,
              "&.Mui-selected": {
                color: "var(--text-default)",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--text-default)",
            },
          }}
        >
          <Tab label="Детали" value="details" />
          <Tab
            label={
              auditItems && auditItems.length > 0
                ? `История (${auditItems.length})`
                : "История"
            }
            value="history"
          />
        </Tabs>
      )}

      <Divider />

      {/* ============================== */}
      {/* Контент */}
      {/* ============================== */}
      <section className={styles.content}>
        {isLoading && (
          <div className={styles.loadingBlock}>
            <CircularProgress size={32} sx={{ color: "var(--gray-1000)" }} />
            <span>Загрузка…</span>
          </div>
        )}

        {isError && !isLoading && (
          <div className={styles.errorBlock}>
            Не удалось загрузить детали документа
          </div>
        )}

        {doc && !isLoading && !isError && (
          <>
            {/* --- Вкладка "Детали" --- */}
            {activeTab === "details" && (
              <>
                <div className={styles.badgesRow}>
                  <HTDocumentTypeBadge fileType={doc.fileType} />
                  <HTDocumentStatusBadge status={doc.status} />
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Информация</h4>

                  <dl className={styles.dl}>
                    <div className={styles.dlRow}>
                      <dt>Период</dt>
                      <dd>{doc.period}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Код МО</dt>
                      <dd>{doc.hospitalCode ?? "—"}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Регион</dt>
                      <dd>{doc.regionCode ?? "—"}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Загрузил</dt>
                      <dd>{doc.uploadedBy ?? "—"}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Дата загрузки</dt>
                      <dd>{formatDateTime(doc.uploadDate)}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Проверил</dt>
                      <dd>{doc.checkedBy ?? "—"}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Дата проверки</dt>
                      <dd>{formatDateTime(doc.checkedAt)}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Попыток проверки</dt>
                      <dd>{doc.checkAttempts}</dd>
                    </div>

                    <div className={styles.dlRow}>
                      <dt>Валиден</dt>
                      <dd>
                        {doc.isValid ? (
                          <span className={styles.validYes}>Да</span>
                        ) : (
                          <span className={styles.validNo}>Нет</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Записи</h4>

                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Всего</span>
                      <span className={styles.statValue}>
                        {formatNumber(doc.recordsCount)}
                      </span>
                    </div>
                  </div>
                </div>

                {doc.validationErrors && (
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Ошибки валидации</h4>
                    <pre className={styles.validationErrors}>
                      {doc.validationErrors}
                    </pre>
                  </div>
                )}
              </>
            )}

            {/* --- Вкладка "История" --- */}
            {activeTab === "history" && (
              <HTAuditTimeline
                items={auditItems ?? []}
                isLoading={isAuditLoading}
                isError={isAuditError}
              />
            )}
          </>
        )}
      </section>

      {/* ============================== */}
      {/* Действия (только на вкладке "Детали") */}
      {/* ============================== */}
      {doc &&
        !isLoading &&
        !isError &&
        activeTab === "details" && (
          <footer className={styles.footer}>
            {isCheckable && (
              <AppButton
                variant="primary"
                size="md"
                onClick={() => onCheck(doc.id)}
                disabled={actionInProgress}
                toExpand
              >
                <CheckCircleOutlineOutlinedIcon
                  sx={{ fontSize: 18, color: "var(--white)" }}
                />
                Проверить
              </AppButton>
            )}

            {isDownloadable && (
              <AppButton
                variant={isCheckable ? "secondary" : "primary"}
                size="md"
                onClick={() => onDownloadResponse(doc)}
                disabled={actionInProgress}
                toExpand
              >
                <DownloadIcon
                  sx={{
                    fontSize: 18,
                    color: isCheckable ? "inherit" : "var(--white)",
                  }}
                />
                Скачать ответ
              </AppButton>
            )}

            {!isCheckable && !isDownloadable && (
              <p className={styles.noActions}>
                Действия недоступны для документов в этом статусе
              </p>
            )}
          </footer>
        )}
    </Drawer>
  );
};