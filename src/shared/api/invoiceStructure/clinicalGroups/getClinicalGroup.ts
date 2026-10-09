import type {
  ClinicalGroupDto,
  GetClinicalGroupResult,
} from "../../../model/types/invoiceStructure/results/clinicalGroup/GetClinicalGroupResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../client/apiClient";

export const getClinicalGroup = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<ClinicalGroupDto | null> => {
  const response = await apiClient.get<ResultResponse<GetClinicalGroupResult>>(
    `med-tools/rcontrol/medical-cases/${medicalCaseUid}/clinical-group`,
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

  return response.data.value.clinicalGroup;
};
