import apiClient from "../../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type { GetCompletedCaseListItemsResult } from "../../../../rControl/widgets/workspace/model/types/core/results/GetCompletedCaseListItemsResult";
import type { GetCompletedCasesRequest } from "../model/types/GetCompletedCasesRequest";

export const getCompletedCases = async (
  request: GetCompletedCasesRequest,
): Promise<GetCompletedCaseListItemsResult> => {
  const response = await apiClient.post<
    ResultResponse<GetCompletedCaseListItemsResult>
  >("/med-view/completed-cases", request);

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер не смог вернуть данные");
  }

  console.log(response.data.value);

  return response.data.value;
};
