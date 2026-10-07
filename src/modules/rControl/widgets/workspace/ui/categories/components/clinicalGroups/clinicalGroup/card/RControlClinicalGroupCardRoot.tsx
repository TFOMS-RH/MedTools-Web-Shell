import { useClinicalGroupQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useClinicalGroupQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { RControlClinicalGroupCardHeader } from "./RControlClinicalGroupCardHeader";
import { RControlClinicalGroupCardBody } from "./RControlClinicalGroupCardBody";

export const RControlClinicalGroupCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
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
      <RControlClinicalGroupCardHeader />
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
        <RControlClinicalGroupCardBody
          clinicalGroup={clinicalGroup!}
          isPending={isPending}
        />
      )}
    </div>
  );
};
