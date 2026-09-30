import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { usePrescriptionsQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/prescriptions/usePrescriptionsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewPrescriptionsCards } from "../MedViewPrescriptionsCards/MedViewPrescriptionsCards";

export const MedViewPrescriptionsSection = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: prescriptions,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = usePrescriptionsQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: prescriptions?.length === 0 && isSuccess,
  });

  return (
    <>
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о назначениях"
          variant="empty"
        />
      ) : (
        <MedViewPrescriptionsCards
          prescriptions={prescriptions ?? []}
          isPending={isPending}
        />
      )}
    </>
  );
};
