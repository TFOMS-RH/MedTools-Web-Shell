import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  ConsultationDto,
  GetConsultationsResult,
} from "../../../model/types/invoiceStructure/results/oncology/GetConsultationsResult";
import apiClient from "../../client/apiClient";

export const getConsultations = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<ConsultationDto[]> => {
  const response = await apiClient.get<ResultResponse<GetConsultationsResult>>(
    `med-tools/rcontrol/medical-cases/${medicalCaseUid}/consultations`,
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

  return response.data.value.consultations;
};
