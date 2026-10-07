import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useContraindicationsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useContraindicationsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { MedViewContraindicationsListBody } from "../MedViewContraindicationsListBody/MedViewContraindicationsListBody";
import { MedViewContraindicationsListHeader } from "../MedViewContraindicationsListHeader/MedViewContraindicationsListHeader";
import styles from "./styles.module.scss";

interface ContraindicationsListRootProps {
  oncologyCaseUid: number | null;
}

export const MedViewContraindicationsListRoot = ({
  oncologyCaseUid,
}: ContraindicationsListRootProps) => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: contraindications,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useContraindicationsQuery(oncologyCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: oncologyCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: contraindications?.length === 0 && isSuccess,
  });

  return (
    <section className={styles.contraindicationsListRoot}>
      <MedViewContraindicationsListHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Онкологический случай не содержит информации о противопоказаниях"
          variant="empty"
        />
      ) : (
        <MedViewContraindicationsListBody
          contraindications={contraindications ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
