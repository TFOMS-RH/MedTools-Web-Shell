import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useRControlWorkspacePanelStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { usePatientQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/patient/usePatientQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlPatientCardBody } from "./RControlPatientCardBody";
import { RControlPatientCardHeader } from "./RControlPatientCardHeader";

export const RControlPatientCardRoot = () => {
  const { targetDb } = useRControlWorkspacePanelStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();

  const {
    data: patient,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = usePatientQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: patient === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <RControlPatientCardHeader />

      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о пациенте"
          variant="empty"
        />
      ) : (
        <RControlPatientCardBody patient={patient!} isPending={isPending} />
      )}
    </article>
  );
};
