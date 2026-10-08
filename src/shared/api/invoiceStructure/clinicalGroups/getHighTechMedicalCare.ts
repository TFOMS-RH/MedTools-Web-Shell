import type {
  GetHighTechMedicalCareResult,
  HighTechMedicalCareDto,
} from "../../../model/types/invoiceStructure/results/clinicalGroup/GetHighTechMedicalCareResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../../../app/providers/apiClient";

export const getHighTechMedicalCare = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<HighTechMedicalCareDto> => {
  const response = await apiClient.get<
    ResultResponse<GetHighTechMedicalCareResult>
  >(`/rcontrol/medical-cases/${medicalCaseUid}/high-tech-medical-care`, {
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

  return response.data.value.highTechMedicalCare;
};
