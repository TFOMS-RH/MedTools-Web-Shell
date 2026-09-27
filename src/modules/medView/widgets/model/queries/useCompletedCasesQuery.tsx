import type { AppliedFilters } from "../types/AppliedFilters";
import { useQuery } from "@tanstack/react-query";
import { getCompletedCases } from "../../api/getCompletedCases";

export const useCompletedCasesQuery = (
  appliedFilters: AppliedFilters | null,
) => {
  return useQuery({
    queryKey: ["med-view", "completed-cases", appliedFilters],
    queryFn: () => {
      if (appliedFilters === null) {
        throw new Error("Получена некорректная модель примененных фильтров");
      }

      return getCompletedCases(appliedFilters);
    },
    enabled: appliedFilters !== null,
  });
};
