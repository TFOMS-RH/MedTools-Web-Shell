import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useClassificationCriteriaQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useClassificationCriteriaQuery";
import { RControlClassificationCriterionChips } from "./RControlClassificationCriterionChips";
import { RControlClassificationCriterionChipsGroupHeader } from "./RControlClassificationCriterionChipsGroupHeader";
import { RControlClassificationCriterionChipSkeletons } from "./RControlClassificationCriterionChipSkeletons";

interface RControlClassificationCriterionChipsGroupRootProps {
  clinicalGroupUid: number | null;
}

export const RControlClassificationCriterionChipsGroupRoot = ({
  clinicalGroupUid,
}: RControlClassificationCriterionChipsGroupRootProps) => {
  const { targetDb } = useFiltersStore();
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
      <RControlClassificationCriterionChipsGroupHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : isLoading ? (
        <RControlClassificationCriterionChipSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Клиническая группа не содержит информации о классификационных критериях"
          variant="empty"
        />
      ) : (
        <RControlClassificationCriterionChips
          classificationCriteria={classificationCriteria ?? []}
          isPending={isPending}
        />
      )}
    </div>
  );
};
