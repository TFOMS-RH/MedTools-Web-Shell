import { useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";

import { useHTNotify } from "../../../hooks/useHTNotify";
import { downloadBlob } from "../../../utils/downloadBlob";

import styles from "./styles.module.scss";

export const HTDocumentsAggregation = () => {
  const notify = useHTNotify();

  const [gstPeriod, setGstPeriod] = useState("");
  const [gstMoCode, setGstMoCode] = useState("");

  const [gptPeriod, setGptPeriod] = useState("");
  const [gptMoCode, setGptMoCode] = useState("");

  const [gfPeriod, setGfPeriod] = useState("");
  const [gfMoCode, setGfMoCode] = useState("");
  const [gfFileNumber, setGfFileNumber] = useState("1");

  const [pfPeriod, setPfPeriod] = useState("");
  const [pfMoCode, setPfMoCode] = useState("");

  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const downloadFile = async (
    formKey: string,
    url: string,
    fallbackName: string,
  ) => {
    setLoadingKey(formKey);
    try {
      const result = await downloadBlob({
        url,
        fallbackFileName: fallbackName,
      });

      if (result.success) {
        notify.success(`Файл ${result.fileName ?? fallbackName} скачан`);
      } else {
        notify.error(result.errorMessage ?? "Ошибка скачивания файла");
      }
    } finally {
      setLoadingKey(null);
    }
  };

  const handleExportGst = () => {
    if (!gstPeriod) return;
    const params = new URLSearchParams({ period: gstPeriod });
    if (gstMoCode.trim()) params.set("moCode", gstMoCode.trim());
    downloadFile(
      "gst",
      `/export/gst/aggregated?${params.toString()}`,
      `GST_${gstPeriod.replace("-", "")}.zip`,
    );
  };

  const handleExportGpt = () => {
    if (!gptPeriod) return;
    const params = new URLSearchParams({ period: gptPeriod });
    if (gptMoCode.trim()) params.set("moCode", gptMoCode.trim());
    downloadFile(
      "gpt",
      `/export/gpt/aggregated?${params.toString()}`,
      `GPT_${gptPeriod.replace("-", "")}.zip`,
    );
  };

  const handleExportGf = () => {
    if (!gfPeriod) return;
    const moCode = gfMoCode.trim() || "";
    if (!moCode) {
      notify.warning("Укажите код МО — он обязателен для экспорта GF");
      return;
    }

    const params = new URLSearchParams({
      period: gfPeriod,
      moCode,
      fileNumber: gfFileNumber || "1",
    });
    downloadFile(
      "gf",
      `/export/gf?${params.toString()}`,
      `GF${moCode}_${gfPeriod.replace("-", "")}.zip`,
    );
  };

  const handleExportPf = () => {
    if (!pfPeriod) return;
    const params = new URLSearchParams({ period: pfPeriod });
    if (pfMoCode.trim()) params.set("moCode", pfMoCode.trim());
    downloadFile(
      "pf",
      `/export/pf/aggregated?${params.toString()}`,
      `PF_${pfPeriod.replace("-", "")}.zip`,
    );
  };

  const handleNotImplemented = (name: string) => {
    notify.info(`${name}: функция в разработке`);
  };

  return (
    <section className={styles.aggregationRoot}>
      {/* ============================== */}
      {/* Заголовок */}
      {/* ============================== */}
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <LayersOutlinedIcon
            sx={{ fontSize: 22, color: "var(--text-default)" }}
          />
          <h3 className={styles.title}>Агрегация данных</h3>
        </div>
        <p className={styles.subtitle}>
          Формирование сводных файлов для ГИС ОМС
        </p>
      </header>

      {/* ============================== */}
      {/* Верхняя строка — агрегация */}
      {/* ============================== */}
      <div className={styles.gridRow}>
        {/* GST */}
        <div className={styles.formCard}>
          <h4 className={styles.formTitle}>GST (GSM→GST):</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              value={gstPeriod}
              onChange={(e) => setGstPeriod(e.currentTarget.value)}
            />
          </div>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все МО"
              value={gstMoCode}
              onChange={(e) => setGstMoCode(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportGst}
              disabled={!gstPeriod || loadingKey === "gst"}
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              {loadingKey === "gst" ? "…" : "Выгрузить"}
            </button>
          </div>
        </div>

        {/* GPT */}
        <div className={styles.formCard}>
          <h4 className={styles.formTitle}>GPT (GPM→GPT):</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              value={gptPeriod}
              onChange={(e) => setGptPeriod(e.currentTarget.value)}
            />
          </div>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все МО"
              value={gptMoCode}
              onChange={(e) => setGptMoCode(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportGpt}
              disabled={!gptPeriod || loadingKey === "gpt"}
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              {loadingKey === "gpt" ? "…" : "Выгрузить"}
            </button>
          </div>
        </div>

        {/* GF */}
        <div className={styles.formCard}>
          <h4 className={styles.formTitle}>GF:</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              value={gfPeriod}
              onChange={(e) => setGfPeriod(e.currentTarget.value)}
            />
          </div>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все МО"
              value={gfMoCode}
              onChange={(e) => setGfMoCode(e.currentTarget.value)}
            />
            <input
              className={`${styles.compactInput} ${styles.fileNumber}`}
              type="text"
              placeholder="Пакет"
              value={gfFileNumber}
              onChange={(e) => setGfFileNumber(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportGf}
              disabled={!gfPeriod || loadingKey === "gf"}
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              {loadingKey === "gf" ? "…" : "Выгрузить"}
            </button>
          </div>
        </div>

        {/* PF */}
        <div className={styles.formCard}>
          <h4 className={styles.formTitle}>PF:</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              value={pfPeriod}
              onChange={(e) => setPfPeriod(e.currentTarget.value)}
            />
          </div>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все МО"
              value={pfMoCode}
              onChange={(e) => setPfMoCode(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.exportBtn}
              onClick={handleExportPf}
              disabled={!pfPeriod || loadingKey === "pf"}
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              {loadingKey === "pf" ? "…" : "Выгрузить"}
            </button>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* Нижняя строка — заглушки DSPN/PROF */}
      {/* ============================== */}
      <div className={styles.gridRow}>
        <div className={`${styles.formCard} ${styles.stubCard}`}>
          <h4 className={styles.formTitle}>DSPN → СМО:</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              disabled
            />
          </div>
          <div className={styles.inlineField}>
            <button
              type="button"
              className={styles.exportBtn}
              onClick={() => handleNotImplemented("DSPN → СМО")}
              title="Функция в разработке"
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              Выгрузить для СМО
            </button>
          </div>
        </div>

        <div className={`${styles.formCard} ${styles.stubCard}`}>
          <h4 className={styles.formTitle}>PROF → СМО:</h4>
          <div className={styles.inlineField}>
            <input
              className={styles.compactInput}
              type="text"
              placeholder="Все периоды"
              disabled
            />
          </div>
          <div className={styles.inlineField}>
            <button
              type="button"
              className={styles.exportBtn}
              onClick={() => handleNotImplemented("PROF → СМО")}
              title="Функция в разработке"
            >
              <CloudDownloadIcon sx={{ fontSize: 16 }} />
              Выгрузить для СМО
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
