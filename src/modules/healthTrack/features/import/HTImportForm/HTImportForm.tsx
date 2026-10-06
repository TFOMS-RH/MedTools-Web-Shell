// ==========================================
// modules/healthTrack/features/import/HTImportForm/HTImportForm.tsx
// ==========================================
import { useCallback, useEffect, useMemo, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { AppButton } from "../../../../../components/ui/AppButton/AppButton";
import { AppInput } from "../../../../../components/ui/AppInput/AppInput";

import { HTFileDropzone } from "../../../ui/HTFileDropzone/HTFileDropzone";
import { HTImportResultCard } from "../../../ui/HTImportResultCard/HTImportResultCard";
import { HTDocumentTypeBadge } from "../../../ui/HTDocumentTypeBadge/HTDocumentTypeBadge";

import { useImportMutation } from "../../../hooks/useImportMutation";
import { useHTNotify } from "../../../hooks/useHTNotify";
import { useHealthTrackAuthStore } from "../../../stores/healthTrackAuthStore";

import { parseHTFileName } from "../../../utils/htFileNameParser";

import type { HTImportDisplayResult } from "../../../types/htImport";

import styles from "./styles.module.scss";

// ==========================================
// Пропсы.
// ==========================================
interface HTImportFormProps {
  /** Колбэк: перейти к документу в разделе «Документы». */
  onGoToDocument: (documentId: number) => void;
}

/**
 * Главная форма импорта.
 *
 * Логика:
 *  1. Пользователь выбирает файл (drag&drop или клик).
 *  2. Парсер распознаёт тип / период / МО из имени.
 *  3. Период и код МО предзаполняются.
 *  4. Пользователь подтверждает (или правит период).
 *  5. Кнопка «Загрузить» → мутация.
 *  6. Прогресс-бар во время загрузки.
 *  7. Карточка результата (успех / ошибка).
 */
export const HTImportForm = ({ onGoToDocument }: HTImportFormProps) => {
  // ==========================================
  // Стейт.
  // ==========================================
  const [file, setFile] = useState<File | null>(null);
  const [period, setPeriod] = useState("");
  const [hospitalCode, setHospitalCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<HTImportDisplayResult | null>(null);

  // ==========================================
  // Хуки.
  // ==========================================
  const importMutation = useImportMutation();
  const notify = useHTNotify();

  const user = useHealthTrackAuthStore((s) => s.user);
  const isAdmin = user?.roles.includes("Admin") ?? false;

  // ==========================================
  // Парсинг имени файла при выборе.
  // ==========================================
  const parseResult = useMemo(() => {
    if (!file) return null;
    return parseHTFileName(file.name);
  }, [file]);

  // ==========================================
  // Автозаполнение полей из парсера.
  // Срабатывает когда меняется file.
  // ==========================================
  useEffect(() => {
    if (!parseResult) return;

    if (parseResult.isValid) {
      // Предзаполняем период.
      if (parseResult.period) setPeriod(parseResult.period);

      // Предзаполняем код МО, если роль Admin.
      if (isAdmin && parseResult.hospitalCode) {
        setHospitalCode(parseResult.hospitalCode);
      }
    }
  }, [parseResult, isAdmin]);

  // ==========================================
  // Эффективный код МО:
  //  - Admin — что ввёл вручную.
  //  - MO / SMO — из профиля (жёстко).
  //  - Для файлов от ТФОМС — может быть пустым.
  // ==========================================
  const effectiveHospitalCode = useMemo(() => {
    if (isAdmin) return hospitalCode.trim() || null;
    return user?.hospitalCode ?? null;
  }, [isAdmin, hospitalCode, user?.hospitalCode]);

  // ==========================================
  // Валидация формы.
  // ==========================================
  const canSubmit = useMemo(() => {
    if (!file) return false;
    if (!parseResult?.isValid) return false;
    if (!period.trim()) return false;

    // Формат периода: ГГГГ-ММ
    if (!/^\d{4}-\d{2}$/.test(period.trim())) return false;

    // Для Admin нужен код МО (кроме случаев, когда тип TFOMS-only)
    // Пока требуем всегда — упростим позже.
    if (isAdmin && !hospitalCode.trim()) return false;

    return true;
  }, [file, parseResult, period, isAdmin, hospitalCode]);

  // ==========================================
  // Обработчики.
  // ==========================================

  // Выбор файла.
  const handleFileChange = useCallback((selected: File | null) => {
    setFile(selected);
    setResult(null); // сбрасываем прошлый результат
    setProgress(0);

    if (!selected) {
      // сброс полей, если файл убрали
      setPeriod("");
      if (isAdmin) setHospitalCode("");
    }
  }, [isAdmin]);

  // Ошибка валидации файла (из dropzone).
  const handleDropzoneError = useCallback(
    (message: string) => {
      notify.error(message);
    },
    [notify],
  );

  // Отправка формы.
  const handleSubmit = useCallback(() => {
    if (!file || !parseResult?.isValid) return;

    setResult({ status: "uploading" });
    setProgress(0);

    importMutation.mutate(
      {
        fileType: parseResult.fileType!,
        request: {
          file,
          period: period.trim(),
          hospitalCode: effectiveHospitalCode,
        },
        onProgress: setProgress,
      },
      {
        onSuccess: (r) => {
          setResult({
            status: "success",
            documentId: r.documentId,
            fileName: file.name,
            fileType: parseResult.fileType,
            recordsCount: r.recordsCount,
            updatedCount: r.updatedCount,
            warnings: r.warnings,
          });

          notify.success(
            `Импортировано ${r.recordsCount.toLocaleString("ru-RU")} записей`,
          );
        },
        onError: (err) => {
          setResult({
            status: "error",
            fileName: file.name,
            errorMessage: "Не удалось импортировать файл",
          });

          notify.errorFrom(err, "Ошибка импорта");
        },
      },
    );
  }, [
    file,
    parseResult,
    period,
    effectiveHospitalCode,
    importMutation,
    notify,
  ]);

  // Сброс формы — для кнопок «Загрузить ещё» / «Попробовать снова».
  const handleReset = useCallback(() => {
    setFile(null);
    setPeriod("");
    setHospitalCode("");
    setProgress(0);
    setResult(null);
  }, []);

  // ==========================================
  // Рендер.
  // ==========================================
  const isUploading = importMutation.isPending && result?.status === "uploading";

  return (
    <section className={styles.formRoot}>
      {/* ============================== */}
      {/* Заголовок секции */}
      {/* ============================== */}
      <header className={styles.header}>
        <h3 className={styles.title}>Импорт файла</h3>
        <p className={styles.subtitle}>
          Загрузите XML или ZIP-архив от МО, СМО или ТФОМС. Тип файла,
          период и код МО определяются автоматически по имени файла.
        </p>
      </header>

      {/* ============================== */}
      {/* Dropzone */}
      {/* ============================== */}
      <HTFileDropzone
        file={file}
        onFileChange={handleFileChange}
        onError={handleDropzoneError}
        disabled={isUploading}
      />

      {/* ============================== */}
      {/* Информация о распознанном файле */}
      {/* ============================== */}
      {file && parseResult && !parseResult.isValid && (
        <div className={styles.parseError}>
          <span>⚠</span>
          <span>{parseResult.errorMessage}</span>
        </div>
      )}

      {file && parseResult?.isValid && (
        <div className={styles.parsedInfo}>
          <div className={styles.parsedItem}>
            <span className={styles.parsedLabel}>Тип файла</span>
            <HTDocumentTypeBadge fileType={parseResult.fileType!} />
          </div>

          {parseResult.period && (
            <div className={styles.parsedItem}>
              <span className={styles.parsedLabel}>Период из имени</span>
              <span className={styles.parsedValue}>{parseResult.period}</span>
            </div>
          )}

          {parseResult.sender && (
            <div className={styles.parsedItem}>
              <span className={styles.parsedLabel}>Отправитель</span>
              <span className={styles.parsedValue}>
                {parseResult.sender === "MO"
                  ? "Медицинская организация"
                  : parseResult.sender === "SMO"
                    ? "Страховая организация"
                    : parseResult.sender === "TFOMS"
                      ? "ТФОМС"
                      : "Неизвестно"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ============================== */}
      {/* Поля ввода */}
      {/* ============================== */}
      {file && parseResult?.isValid && (
        <div className={styles.fieldsRow}>
          <AppInput
            label="Период (ГГГГ-ММ)"
            variant="md"
            placeholder="2026-09"
            value={period}
            onChange={(e) => setPeriod(e.currentTarget.value)}
            disabled={isUploading}
          />

          {isAdmin && (
            <AppInput
              label="Код МО"
              variant="md"
              placeholder="190006"
              value={hospitalCode}
              onChange={(e) => setHospitalCode(e.currentTarget.value)}
              disabled={isUploading}
            />
          )}
        </div>
      )}

      {/* ============================== */}
      {/* Прогресс-бар */}
      {/* ============================== */}
      {isUploading && (
        <div className={styles.progressBlock}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: "var(--radius-l)",
              backgroundColor: "var(--gray-200)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--text-default)",
              },
            }}
          />
          <span className={styles.progressLabel}>
            {progress < 100
              ? `Загрузка… ${progress}%`
              : "Обработка на сервере…"}
          </span>
        </div>
      )}

      {/* ============================== */}
      {/* Кнопка "Загрузить" */}
      {/* ============================== */}
      {file && parseResult?.isValid && !result && (
        <div className={styles.actions}>
          <AppButton
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={!canSubmit || isUploading}
          >
            <CloudUploadIcon sx={{ fontSize: 18, color: "var(--white)" }} />
            Загрузить
          </AppButton>
        </div>
      )}

      {/* ============================== */}
      {/* Карточка результата */}
      {/* ============================== */}
      {result && result.status !== "uploading" && (
        <HTImportResultCard
          result={result}
          onGoToDocument={onGoToDocument}
          onRetry={handleReset}
        />
      )}
    </section>
  );
};