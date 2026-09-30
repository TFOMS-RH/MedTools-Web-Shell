import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";
import type { AppliedFilters } from "../types/AppliedFilters";
import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import { useQuery } from "@tanstack/react-query";
import { getCompletedCases } from "../../api/getCompletedCases";

export const useCompletedCasesQuery = (
  appliedFilters: AppliedFilters | null,
  pagination: PaginationState,
  targetDb: TargetDbType | null,
) => {
  return useQuery({
    queryKey: [
      "med-view",
      "completed-cases",
      appliedFilters,
      pagination,
      targetDb,
    ],
    queryFn: () => {
      if (appliedFilters === null || targetDb === null) {
        throw new Error("Получена некорректная модель примененных фильтров");
      }

      return getCompletedCases({
        filters: appliedFilters,
        pagination: {
          page: pagination.page + 1,
          pageSize: pagination.pageSize,
        },
        targetDb: targetDb,
      });
    },
    enabled: appliedFilters !== null && targetDb !== null,
  });
};
