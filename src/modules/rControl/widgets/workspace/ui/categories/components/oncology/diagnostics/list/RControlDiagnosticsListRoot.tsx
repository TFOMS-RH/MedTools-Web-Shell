import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { useDiagnosticsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useDiagnosticsQuery";
import { RControlDiagnosticsListBody } from "./RControlDiagnosticsListBody";
import { RControlDiagnosticsListHeader } from "./RControlDiagnosticsListHeader";
import styles from "./styles.module.scss";

interface RControlDiagnosticsListRootProps {
  oncologyCaseUid: number | null;
}

export const RControlDiagnosticsListRoot = ({
  oncologyCaseUid,
}: RControlDiagnosticsListRootProps) => {
  const { targetDb } = useFiltersStore();
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
      <RControlDiagnosticsListHeader />
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
        <RControlDiagnosticsListBody
          diagnosticRecords={diagnosticRecords ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
