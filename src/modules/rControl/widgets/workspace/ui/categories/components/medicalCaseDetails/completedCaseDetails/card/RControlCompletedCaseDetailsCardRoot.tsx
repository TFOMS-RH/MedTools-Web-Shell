import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useRControlWorkspacePanelStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { useCompletedCaseDetailsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/medicalCaseDetails/useCompletedCaseDetailsQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlCompletedCaseDetailsCardBody } from "./RControlCompletedCaseDetailsCardBody";
import { RControlCompletedCaseDetailsCardHeader } from "./RControlCompletedCaseDetailsCardHeader";

export const CompletedCaseDetailsRoot = () => {
  const { targetDb } = useRControlWorkspacePanelStore();
  const { selectedCompletedCaseUid } = useRControlWorkspaceStore();
  const {
    data: completedCaseDetails,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useCompletedCaseDetailsQuery(selectedCompletedCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedCompletedCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: completedCaseDetails === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <RControlCompletedCaseDetailsCardHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о деталях законченного случая"
          variant="empty"
        />
      ) : (
        <RControlCompletedCaseDetailsCardBody
          completedCaseDetails={completedCaseDetails!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
