import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetPrescriptionsResult,
  PrescriptionDto,
} from "../../../model/types/invoiceStructure/results/prescriptions/GetPrescriptionsResult";
import apiClient from "../../../../app/providers/apiClient";

export const getPrescriptions = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<PrescriptionDto[]> => {
  const response = await apiClient.get<ResultResponse<GetPrescriptionsResult>>(
    `/rcontrol/medical-cases/${medicalCaseUid}/prescriptions`,
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

  return response.data.value.prescriptions;
};
