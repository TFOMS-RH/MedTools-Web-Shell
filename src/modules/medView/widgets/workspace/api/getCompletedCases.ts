import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type { GetCompletedCaseListItemsResult } from "../../../../../shared/model/types/invoiceStructure/results/medicalCases/GetCompletedCaseListItemsResult";
import type { GetCompletedCasesRequest } from "../model/types/GetCompletedCasesRequest";
import apiClient from "../../../../../shared/api/client/apiClient";

export const getCompletedCases = async (
  request: GetCompletedCasesRequest,
): Promise<GetCompletedCaseListItemsResult> => {
  const response = await apiClient.post<
    ResultResponse<GetCompletedCaseListItemsResult>
  >("med-tools/med-view/completed-cases", request);

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер не смог вернуть данные");
  }

  return response.data.value;
};
