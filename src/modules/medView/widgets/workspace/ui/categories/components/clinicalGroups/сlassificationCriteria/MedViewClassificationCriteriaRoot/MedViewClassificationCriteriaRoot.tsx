import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useClassificationCriteriaQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/clinicalGroups/useClassificationCriteriaQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { MedViewClassificationCriteriaBody } from "../MedViewClassificationCriteriaBody/MedViewClassificationCriteriaBody";
import { MedViewClassificationCriteriaHeader } from "../MedViewClassificationCriteriaHeader/MedViewClassificationCriteriaHeader";

interface ClassificationCriteriaRootProps {
  clinicalGroupUid: number | null;
}

export const MedViewClassificationCriteriaRoot = ({
  clinicalGroupUid,
}: ClassificationCriteriaRootProps) => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: classificationCriteria,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useClassificationCriteriaQuery(clinicalGroupUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: clinicalGroupUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: classificationCriteria?.length === 0 && isSuccess,
  });

  return (
    <div className="cardRoot">
      <MedViewClassificationCriteriaHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Клиническая группа не содержит информации о классификационных критериях"
          variant="empty"
        />
      ) : (
        <MedViewClassificationCriteriaBody
          classificationCriteria={classificationCriteria ?? []}
          isPending={isPending}
        />
      )}
    </div>
  );
};
