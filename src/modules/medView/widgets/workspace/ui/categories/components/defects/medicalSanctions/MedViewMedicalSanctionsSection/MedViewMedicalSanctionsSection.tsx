import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedicalSanctionsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/defects/useMedicalSanctionsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewMedicalSanctionsCards } from "../MedViewMedicalSanctionsCards/MedViewMedicalSanctionsCards";

export const MedViewMedicalSanctionsSection = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
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
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит санкции"
          variant="empty"
        />
      ) : (
        <MedViewMedicalSanctionsCards
          isPending={isPending}
          medicalSanctions={medicalSanctions ?? []}
        />
      )}
    </>
  );
};
