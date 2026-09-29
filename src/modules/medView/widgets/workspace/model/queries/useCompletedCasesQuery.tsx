import type { AppliedFilters } from "../types/AppliedFilters";
import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import { useQuery } from "@tanstack/react-query";
import { getCompletedCases } from "../../api/getCompletedCases";

export const useCompletedCasesQuery = (
  appliedFilters: AppliedFilters | null,
  pagination: PaginationState,
) => {
  return useQuery({
    queryKey: ["med-view", "completed-cases", appliedFilters, pagination],
    queryFn: () => {
      if (appliedFilters === null) {
        throw new Error("Получена некорректная модель примененных фильтров");
      }

      return getCompletedCases({
        filters: appliedFilters,
        pagination: {
          page: pagination.page + 1,
          pageSize: pagination.pageSize,
        },
      });
    },
    enabled: appliedFilters !== null,
  });
};
