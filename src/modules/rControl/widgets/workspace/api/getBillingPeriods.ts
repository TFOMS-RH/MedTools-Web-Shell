import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type { TargetDbType } from "../../../../../shared/types/TargetDbType";
import type { GetBillingPeriodsResult } from "../model/types/BillingPeriodsResult";
import apiClient from "../../../../../app/providers/apiClient";

export const getBillingPeriods = async (
  medicalOrganizationCode: string | null,
  targetDb: TargetDbType,
) => {
  
  const response = await apiClient.get<ResultResponse<GetBillingPeriodsResult>>(
    "/rcontrol/lookups/billing-periods",
    {
      params: {
        medicalOrganizationCode: medicalOrganizationCode,
        targetDb: targetDb,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Не удалось получить периоды");
  }

  return response.data.value.billingPeriods;
};
