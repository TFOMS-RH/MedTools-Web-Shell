import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedicationsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useMedicationsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedicationsCards } from "../MedViewMedicationsCards/MedViewMedicationsCards";

export const MedViewMedicationsSection = () => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    selectedOncologyServiceUid,
    selectedMedicationUid,
    selectMedication,
  } = useMedViewStore();
  const {
    data: medications,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMedicationsQuery(selectedOncologyServiceUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedOncologyServiceUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: medications?.length === 0 && isSuccess,
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
          description="Онкологический случай не содержит информации о лекарственных препаратах"
          variant="empty"
        />
      ) : (
        <MedicationsCards
          medications={medications ?? []}
          isPending={isPending}
          selectMedication={selectMedication}
          selectedMedicationUid={selectedMedicationUid}
        />
      )}
    </>
  );
};
