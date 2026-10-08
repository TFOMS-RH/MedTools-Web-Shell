import type { CompletedCaseListItemsQueryParams } from "../../../types/invoiceStructure/params/CompletedCaseListItemsQueryParams";
import { getCompletedCaseListItems } from "../../../../api/invoiceStructure/completedCases/getCompletedCaseListItems";
import { useQuery } from "@tanstack/react-query";

export const useCompletedCaseListItemsQuery = (
  params: CompletedCaseListItemsQueryParams,
) => {
  const isReady = params.invoiceUid !== null && params.targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "completed-cases", params],
    enabled: isReady,
    queryFn: () => {
      if (params.invoiceUid === null || params.targetDb === null) {
        throw new Error("Неккоректные параметры запроса");
      }

      return getCompletedCaseListItems({
        invoiceUid: params.invoiceUid,
        page: params.page,
        pageSize: params.pageSize,
        targetDb: params.targetDb,
        searchString: params.searchString,
      });
    },
  });
};
