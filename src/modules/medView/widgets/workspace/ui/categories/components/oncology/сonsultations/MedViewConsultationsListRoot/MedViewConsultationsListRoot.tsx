import { useConsultationsQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/oncology/useConsultationsQuery";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewConsultationsListHeader } from "../MedViewConsultationsListHeader/MedViewConsultationsListHeader";
import { MedViewConsultationsListBody } from "../MedViewConsultationsListBody/MedViewConsultationsListBody";
import styles from "./styles.module.scss";

export const MedViewConsultationsListRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewStore();
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: consultations,
    isPending,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useConsultationsQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isEmpty: consultations?.length === 0 && isSuccess,
    isError: isError,
    isSuccess: isSuccess,
  });

  return (
    <section className={styles.consultationsListRoot}>
      <MedViewConsultationsListHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Данный медицинский случай не содержит информации о консилиумах"
          variant="empty"
        />
      ) : (
        <MedViewConsultationsListBody
          consultations={consultations ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
