import type { CompletedCaseListItemsRequest } from "../../../model/types/invoiceStructure/params/CompletedCaseListItemsRequest";
import type { GetCompletedCaseListItemsResult } from "../../../model/types/invoiceStructure/results/medicalCases/GetCompletedCaseListItemsResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import apiClient from "../../client/apiClient";

export const getCompletedCaseListItems = async (
  params: CompletedCaseListItemsRequest,
): Promise<GetCompletedCaseListItemsResult> => {
  const response = await apiClient.get<
    ResultResponse<GetCompletedCaseListItemsResult>
  >(`med-tools/rcontrol/invoices/${params.invoiceUid}/completed-cases`, {
    params: {
      page: params.page + 1,
      pageSize: params.pageSize,
      searchString: params.searchString,
      targetDb: params.targetDb,
    },
  });

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер не смог вернуть данные");
  }

  return response.data.value;
};
