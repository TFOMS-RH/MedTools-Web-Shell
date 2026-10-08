import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetMedicalSanctionsResult,
  MedicalSanctionDto,
} from "../../../model/types/invoiceStructure/results/defects/GetMedicalSanctionsResult";

export const getMedicalSanctions = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<MedicalSanctionDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetMedicalSanctionsResult>
  >(`/rcontrol/medical-cases/${medicalCaseUid}/medical-sanctions`, {
    params: {
      targetDb: targetDb,
    },
  });

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.medicalSanctions;
};
