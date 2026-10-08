import { useQuery } from "@tanstack/react-query";
import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";
import { getBillingPeriods } from "../../api/getBillingPeriods";

export const useBillingPeriodsQuery = (
  medicalOrganizationCode: string | null,
  targetDb: TargetDbType | null,
) => {
  return useQuery({
    queryKey: [
      "r-control",
      "billing-periods",
      medicalOrganizationCode,
      targetDb,
    ],
    enabled: targetDb !== null && medicalOrganizationCode !== null,
    queryFn: () => getBillingPeriods(medicalOrganizationCode, targetDb!),
  });
};
