import type {
  GetInvoiceSummaryResult,
  InvoiceSummaryDto,
} from "../../../model/types/invoiceStructure/results/invoices/GetInvoiceSummaryResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../client/apiClient";

export const getInvoiceSummary = async (
  invoiceUid: number,
  targetDb: TargetDbType,
): Promise<InvoiceSummaryDto> => {
  const response = await apiClient.get<ResultResponse<GetInvoiceSummaryResult>>(
    `med-tools/rcontrol/invoices/${invoiceUid}/summary`,
    {
      params: {
        targetDb: targetDb,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("null-ex");
  }

  return response.data.value.invoiceSummary;
};
