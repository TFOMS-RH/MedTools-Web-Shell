import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { useHighTechMedicalCareQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useHighTechMedicalCareQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlHighTechMedicalCareCardBody } from "./RControlHighTechMedicalCareCardBody";
import { RControlHighTechMedicalCareCardHeader } from "./RControlHighTechMedicalCareCardHeader";

export const RControlHighTechMedicalCareCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
  const {
    data: highTechMedicalCare,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useHighTechMedicalCareQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: highTechMedicalCare === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <RControlHighTechMedicalCareCardHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о ВМП"
          variant="empty"
        />
      ) : (
        <RControlHighTechMedicalCareCardBody
          highTechMedicalCare={highTechMedicalCare!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
