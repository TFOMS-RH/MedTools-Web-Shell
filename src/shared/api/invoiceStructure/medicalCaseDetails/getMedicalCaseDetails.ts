import type {
  GetMedicalCaseDetailsResult,
  MedicalCaseDetailsDto,
} from "../../../model/types/invoiceStructure/results/medicalCases/GetMedicalCaseDetailsResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../../../app/providers/apiClient";

export const getMedicalCaseDetails = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<MedicalCaseDetailsDto> => {
  const response = await apiClient.get<
    ResultResponse<GetMedicalCaseDetailsResult>
  >(`/rcontrol/medical-cases/${medicalCaseUid}`, {
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

  return response.data.value.medicalCaseDetails;
};
