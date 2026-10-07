import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useCompletedCaseDetailsQuery } from "../../../../../../model/queries/categories/medicalCaseDetails/useCompletedCaseDetailsQuery";
import { useWorkspaceStore } from "../../../../../../model/store/useWorkspaceStore";
import { RControlCompletedCaseDetailsCardBody } from "./RControlCompletedCaseDetailsCardBody";
import { RControlCompletedCaseDetailsCardHeader } from "./RControlCompletedCaseDetailsCardHeader";

export const CompletedCaseDetailsRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedCompletedCaseUid } = useWorkspaceStore();
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
