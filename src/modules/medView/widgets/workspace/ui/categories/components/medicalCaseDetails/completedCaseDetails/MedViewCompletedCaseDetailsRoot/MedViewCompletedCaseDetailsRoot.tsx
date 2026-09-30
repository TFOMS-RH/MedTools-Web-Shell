import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useCompletedCaseDetailsQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/medicalCaseDetails/useCompletedCaseDetailsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { CompletedCaseDetailsBody } from "../MedViewCompletedCaseDetailsBody/MedViewCompletedCaseDetailsBody";
import { CompletedCaseDetailsHeader } from "../MedViewCompletedCaseDetailsHeader/MedViewCompletedCaseDetailsHeader";

export const CompletedCaseDetailsRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedCompletedCaseUid } = useMedViewStore();
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
      <CompletedCaseDetailsHeader />
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
        <CompletedCaseDetailsBody
          completedCaseDetails={completedCaseDetails!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
