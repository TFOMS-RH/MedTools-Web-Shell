import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetReferralsResult,
  ReferralDto,
} from "../../../model/types/invoiceStructure/results/prescriptions/GetReferralsResult";
import apiClient from "../../client/apiClient";

export const getReferrals = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<ReferralDto[]> => {
  const response = await apiClient.get<ResultResponse<GetReferralsResult>>(
    `med-tools/rcontrol/medical-cases/${medicalCaseUid}/referrals`,
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
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.referrals;
};
