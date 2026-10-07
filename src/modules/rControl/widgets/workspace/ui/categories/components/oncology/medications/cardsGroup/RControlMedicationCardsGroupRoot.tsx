import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useMedicationsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useMedicationsQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlMedicalCaseCardSkeletons } from "../../../../../core/medicalCases/cardsGroup/RControlMedicalCaseCardSkeletons";
import { RControlMedicationCards } from "./RControlMedicationCards";

export const RControlMedicationCardsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const {
    selectedOncologyServiceUid,
    selectedMedicationUid,
    selectMedication,
  } = useRControlWorkspaceStore();
  const {
    data: medications,
    isLoading,
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
      ) : isLoading ? (
        <RControlMedicalCaseCardSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Онкологический случай не содержит информации о лекарственных препаратах"
          variant="empty"
        />
      ) : (
        <RControlMedicationCards
          medications={medications ?? []}
          selectMedication={selectMedication}
          selectedMedicationUid={selectedMedicationUid}
        />
      )}
    </>
  );
};
