import apiClient from "../../../../app/providers/apiClient";
import type { InvoiceListItemsRequest } from "../../../model/types/invoiceStructure/params/InvoiceListItemsRequest";
import type { GetInvoiceListItemsResult } from "../../../model/types/invoiceStructure/results/invoices/GetInvoiceListItemsResult";
import type { ResultResponse } from "../../../types/ResultResponse";

export const getInvoiceListItems = async (
  params: InvoiceListItemsRequest,
): Promise<GetInvoiceListItemsResult> => {
  const response = await apiClient.get<
    ResultResponse<GetInvoiceListItemsResult>
  >("/rcontrol/invoices", {
    params: {
      medicalOrganizationCode: params.medicalOrganizationCode,
      year: params.year,
      month: params.month,
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
    throw new Error("null-ex");
  }

  return response.data.value;
};
