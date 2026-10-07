import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { useInsuranceQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/patient/useInsuranceQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlInsuranceCardBody } from "./RControlInsuranceCardBody";
import { RControlInsuranceCardHeader } from "./RControlInsuranceCardHeader";

export const RControlInsuranceCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
  const {
    data: insurance,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useInsuranceQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: insurance === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <RControlInsuranceCardHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о СМО"
          variant="empty"
        />
      ) : (
        <RControlInsuranceCardBody
          insurance={insurance!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
