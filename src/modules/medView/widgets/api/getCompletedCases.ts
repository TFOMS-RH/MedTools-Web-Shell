import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../../shared/types/ResultResponse";
import type { CompletedCaseListItemDto } from "../../../rControl/widgets/workspace/model/types/core/results/GetCompletedCaseListItemsResult";
import type { AppliedFilters } from "../model/types/AppliedFilters";

export const getCompletedCases = async (
  appliedFilters: AppliedFilters,
): Promise<CompletedCaseListItemDto[]> => {
  const response = await apiClient.post<
    ResultResponse<CompletedCaseListItemDto[]>
  >("/med-view/completed-case", appliedFilters);

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value?.length) {
    throw new Error("Отсутствуют данные");
  }

  return response.data.value;
};
