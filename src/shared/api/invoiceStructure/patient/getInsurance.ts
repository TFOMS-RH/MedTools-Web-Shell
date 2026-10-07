import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetInsuranceResult,
  InsuranceDto,
} from "../../../model/types/invoiceStructure/results/patient/GetInsuranceResult";
import apiClient from "../../../../app/providers/apiClient";

export const getInsurance = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<InsuranceDto> => {
  const response = await apiClient.get<ResultResponse<GetInsuranceResult>>(
    `/rcontrol/medical-cases/${medicalCaseUid}/insurance`,
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
    throw new Error("Сервер вернул невалидный ответ");
  }

  return response.data.value.insurance;
};
