import type {
  GetTreatmentComplexityCoefficientsResult,
  TreatmentComplexityCoefficientDto,
} from "../../../model/types/invoiceStructure/results/clinicalGroup/GetTreatmentComplexityCoefficientsResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../client/apiClient";

export const getTreatmentComplexityCoefficients = async (
  clinicalGroupUid: number,
  targetDb: TargetDbType,
): Promise<TreatmentComplexityCoefficientDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetTreatmentComplexityCoefficientsResult>
  >(
    `med-tools/rcontrol/clinical-groups/${clinicalGroupUid}/treatment-complexity-coefficients`,
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

  return response.data.value.treatmentComplexityCoefficients;
};
