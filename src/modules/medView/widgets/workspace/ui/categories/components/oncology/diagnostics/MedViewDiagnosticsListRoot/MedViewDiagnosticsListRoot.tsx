import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useDiagnosticsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useDiagnosticsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { MedViewDiagnosticsListBody } from "../MedViewDiagnosticsListBody/MedViewDiagnosticsListBody";
import { MedViewDiagnosticsListHeader } from "../MedViewDiagnosticsListHeader/MedViewDiagnosticsListHeader";
import styles from "./styles.module.scss";

interface DiagnosticsListRootProps {
  oncologyCaseUid: number | null;
}

export const MedViewDiagnosticsListRoot = ({
  oncologyCaseUid,
}: DiagnosticsListRootProps) => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: diagnosticRecords,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useDiagnosticsQuery(oncologyCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: oncologyCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: diagnosticRecords?.length === 0 && isSuccess,
  });

  return (
    <section className={styles.diagnosticsListRoot}>
      <MedViewDiagnosticsListHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Онкологический случай не содержит диагностический блок"
          variant="empty"
        />
      ) : (
        <MedViewDiagnosticsListBody
          diagnosticRecords={diagnosticRecords ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
