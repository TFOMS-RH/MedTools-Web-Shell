import apiClient from "../../../../../shared/api/client/apiClient";
import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type {
  FilterOption,
  FilterOptionsResponse,
} from "../../workspace/model/types/FilterOptions";

export const getAutocompleteFilterOptions = async (
  endpoint: string,
  search: string,
): Promise<FilterOption[]> => {
  const response = await apiClient.get<ResultResponse<FilterOptionsResponse>>(
    endpoint,
    {
      params: {
        search: search,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value?.filterOptions) {
    throw new Error("Отсутствуют параметры фильтрации");
  }

  return response.data.value.filterOptions;
};
