import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useMedicalSanctionsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/defects/useMedicalSanctionsQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlMedicalSanctionCards } from "./RControlMedicalSanctionCards";
import { RControlMedicalSanctionCardSkeletons } from "./RControlMedicalSanctionCardSkeletons";

export const RControlMedicalSanctionCardsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
  const {
    data: medicalSanctions,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMedicalSanctionsQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: medicalSanctions?.length === 0 && isSuccess,
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
        <RControlMedicalSanctionCardSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит санкции"
          variant="empty"
        />
      ) : (
        <RControlMedicalSanctionCards
          isPending={isPending}
          medicalSanctions={medicalSanctions ?? []}
        />
      )}
    </>
  );
};
