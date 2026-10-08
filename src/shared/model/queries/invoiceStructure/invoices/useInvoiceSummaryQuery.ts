import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getInvoiceSummary } from "../../../../api/invoiceStructure/invoices/getInvoiceSummary";

export const useInvoiceSummaryQuery = (
  invoiceUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = invoiceUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "invoice-summary", invoiceUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (invoiceUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getInvoiceSummary(invoiceUid, targetDb);
    },
  });
};
