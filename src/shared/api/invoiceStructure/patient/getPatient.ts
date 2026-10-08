import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetPatientResult,
  PatientDto,
} from "../../../model/types/invoiceStructure/results/patient/GetPatientResult";
import apiClient from "../../../../app/providers/apiClient";

export const getPatient = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<PatientDto> => {
  const response = await apiClient.get<ResultResponse<GetPatientResult>>(
    `/rcontrol/medical-cases/${medicalCaseUid}/patient`,
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

  return response.data.value.patient;
};
