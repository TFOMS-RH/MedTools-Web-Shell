import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { useClinicalGroupQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/clinicalGroups/useClinicalGroupQuery";
import { MedViewClinicalGroupHeader } from "../MedViewClinicalGroupHeader/MedViewClinicalGroupHeader";
import { MedViewClinicalGroupBody } from "../MedViewClinicalGroupBody/MedViewClinicalGroupBody";

export const MedViewClinicalGroupRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: clinicalGroup,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useClinicalGroupQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: clinicalGroup === null && isSuccess,
  });

  return (
    <div className="cardRoot">
      <MedViewClinicalGroupHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о КСГ/КПГ"
          variant="empty"
        />
      ) : (
        <MedViewClinicalGroupBody
          clinicalGroup={clinicalGroup!}
          isPending={isPending}
        />
      )}
    </div>
  );
};
