import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../../shared/types/ResultResponse";
import type { GetCompletedCaseListItemsResult } from "../../../rControl/widgets/workspace/model/types/core/results/GetCompletedCaseListItemsResult";
import type { AppliedFilters } from "../model/types/AppliedFilters";

export const getCompletedCases = async (
  appliedFilters: AppliedFilters,
): Promise<GetCompletedCaseListItemsResult> => {
  const response = await apiClient.post<
    ResultResponse<GetCompletedCaseListItemsResult>
  >("/med-view/completed-case", appliedFilters);

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер не смог вернуть данные");
  }

  return response.data.value;
};
