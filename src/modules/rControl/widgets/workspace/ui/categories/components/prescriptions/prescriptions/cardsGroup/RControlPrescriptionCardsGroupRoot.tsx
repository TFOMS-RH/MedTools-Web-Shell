import { RControlPrescriptionCards } from "./RControlPrescriptionCards";
import { usePrescriptionsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/prescriptions/usePrescriptionsQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { RControlPrescriptionCardSkeletons } from "./RControlPrescriptionCardSkeletons";

export const RControlPrescriptionCardsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
  const {
    data: prescriptions,
    isLoading,
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
      ) : isLoading ? (
        <RControlPrescriptionCardSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о назначениях"
          variant="empty"
        />
      ) : (
        <RControlPrescriptionCards prescriptions={prescriptions ?? []} />
      )}
    </>
  );
};
