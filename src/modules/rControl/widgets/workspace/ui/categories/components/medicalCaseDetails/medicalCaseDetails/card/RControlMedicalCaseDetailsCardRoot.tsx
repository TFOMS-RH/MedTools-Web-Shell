import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { useMedicalCaseDetailsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/medicalCaseDetails/useMedicalCaseDetailsQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlMedicalCaseDetailsCardBody } from "./RControlMedicalCaseDetailsCardBody";
import { RControlMedicalCaseDetailsCardHeader } from "./RControlMedicalCaseDetailsCardHeader";

export const RControlMedicalCaseDetailsCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
  const {
    data: medicalCaseDetails,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMedicalCaseDetailsQuery(selectedMedicalCaseUid, targetDb);
  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: medicalCaseDetails === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <RControlMedicalCaseDetailsCardHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о деталях медицинского случая"
          variant="empty"
        />
      ) : (
        <RControlMedicalCaseDetailsCardBody
          medicalCaseDetails={medicalCaseDetails!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
