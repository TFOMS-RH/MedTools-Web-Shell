import { useCompletedCasesQuery } from "../../../../../model/queries/useCompletedCasesQuery";
import { useMedViewStore } from "../../../../../model/stores/useMedViewStore";

export const CompletedCaseTable = () => {
  const { appliedFilters } = useMedViewStore();
  const { data } = useCompletedCasesQuery(appliedFilters);

  return <div>Пук</div>;
};
