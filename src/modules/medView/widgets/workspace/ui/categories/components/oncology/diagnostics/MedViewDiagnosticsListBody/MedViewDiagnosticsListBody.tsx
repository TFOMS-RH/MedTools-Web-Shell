import type { DiagnosticListItemDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetDiagnosticsResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatDate } from "../../../../../../../../../../shared/helpers/formatDate";
import styles from "./styles.module.scss";

interface DiagnosticsListBodyProps {
  diagnosticRecords: DiagnosticListItemDto[];
  isPending: boolean;
}

export const MedViewDiagnosticsListBody = ({
  diagnosticRecords,
  isPending,
}: DiagnosticsListBodyProps) => {
  return (
    <section className={styles.diagnosticsListBodyRoot}>
      {isPending
        ? Array.from({ length: 5 }).map((_, index) => (
            <div className={styles.listRow} key={index}>
              <div className={styles.listRowContent}>
                <div className={styles.lineOneGrid}>
                  <p className={styles.lineTitle}>
                    <Skeleton width={50} />
                  </p>
                </div>
                <div className={styles.lineTwoGrid}>
                  <CardField
                    label="Тип д.п."
                    value={<Skeleton />}
                    inline={true}
                  />
                  <CardField
                    label="Код д.п."
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
                <div className={styles.lineTwoGrid}>
                  <CardField
                    label="Код результата диагностики"
                    value={<Skeleton />}
                    inline={true}
                  />
                  <CardField
                    label="Результат диагностики"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
              </div>
            </div>
          ))
        : diagnosticRecords.map((diagnosticRecord, _index) => (
            <div
              className={styles.listRow}
              key={diagnosticRecord.diagnosticsUid}
            >
              <div className={styles.listRowContent}>
                <div className={styles.lineOneGrid}>
                  <p className={styles.lineTitle}>
                    {formatDate(diagnosticRecord.specimenCollectionDate)}
                  </p>
                </div>
                <div className={styles.lineTwoGrid}>
                  <CardField
                    label="Тип д.п."
                    value={formatNullableValue(diagnosticRecord.diagnosticType)}
                    inline={true}
                  />
                  <CardField
                    label="Код д.п."
                    value={formatNullableValue(diagnosticRecord.diagnosticCode)}
                    inline={true}
                  />
                </div>
                <div className={styles.lineTwoGrid}>
                  <CardField
                    label="Код результата диагностики"
                    value={formatNullableValue(
                      diagnosticRecord.diagnosticResultCode,
                    )}
                    inline={true}
                  />
                  <CardField
                    label="Результат диагностики"
                    value={
                      diagnosticRecord.isResultReceived === null
                        ? "—"
                        : diagnosticRecord.isResultReceived
                          ? "Положительный"
                          : "Отрицательный"
                    }
                    inline={true}
                  />
                </div>
              </div>
            </div>
          ))}
    </section>
  );
};
