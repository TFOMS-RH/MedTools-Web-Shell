import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useMedicalSanctionsQuery } from "../../../../../../model/queries/categories/defects/useMedicalSanctionsQuery";
import { useWorkspaceStore } from "../../../../../../model/store/useWorkspaceStore";
import { RControlMedicalSanctionCards } from "./RControlMedicalSanctionCards";
import { RControlMedicalSanctionCardSkeletons } from "./RControlMedicalSanctionCardSkeletons";

export const RControlMedicalSanctionCardsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useWorkspaceStore();
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
