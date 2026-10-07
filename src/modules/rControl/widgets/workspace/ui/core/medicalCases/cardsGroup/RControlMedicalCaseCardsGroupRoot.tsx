import { useMedicalCasesListItemsQuery } from "../../../../../../../../shared/model/queries/invoiceStructure/medicalCases/useMedicalCasesListItemsQuery";
import { RControlMedicalCaseCardSkeletons } from "./RControlMedicalCaseCardSkeletons";
import { useRControlWorkspaceStore } from "../../../../model/store/useRControlWorkspaceStore";
import { resolveDataState } from "../../../../../../../../shared/helpers/resolveDataState";
import { useRControlWorkspacePanelStore } from "../../../../model/store/useRControlWorkspacePanelStore";
import { RControlMedicalCaseCards } from "./RControlMedicalCaseCards";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useEffect } from "react";

export const RControlMedicalCaseCardsGroupRoot = () => {
  const { targetDb } = useRControlWorkspacePanelStore();
  const {
    selectedCompletedCaseUid,
    selectedMedicalCaseUid,
    selectMedicalCase,
  } = useRControlWorkspaceStore();
  const {
    data: medicalCases,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMedicalCasesListItemsQuery(selectedCompletedCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedCompletedCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isEmpty: medicalCases?.length === 0 && isSuccess,
    isSuccess: isSuccess,
  });

  useEffect(() => {
    if (!medicalCases?.length) {
      return;
    }

    const hasSelectedMedicalCase = medicalCases.some(
      (medicalCase) => medicalCase.medicalCaseUid === selectedMedicalCaseUid,
    );

    if (!hasSelectedMedicalCase) {
      selectMedicalCase(medicalCases[0].medicalCaseUid);
    }
  }, [medicalCases, selectedMedicalCaseUid, selectMedicalCase]);

  return (
    <>
      {dataState === "waiting" ? (
        <DataState
          title="Выберите законченный случай"
          description="Нажмите на строку в таблице законченных случаев для просмотра медицинских случаев"
          variant="waiting"
        />
      ) : dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "loading" ? (
        <RControlMedicalCaseCardSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинские случаи не найдены по выбранному законченному случаю"
          variant="empty"
        />
      ) : (
        <RControlMedicalCaseCards
          medicalCases={medicalCases ?? []}
          selectedMedicalCaseUid={selectedMedicalCaseUid}
          selectMedicalCase={selectMedicalCase}
        />
      )}
    </>
  );
};
