import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../../../filters/api/getFilterOptions";

export const useFilterOptionsQuery = (
  endpoint: string,
  filterQueryKey: string,
) => {
  return useQuery({
    queryKey: ["med-view", "filter-options", filterQueryKey],
    queryFn: () => getFilterOptions(endpoint),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
