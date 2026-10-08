import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetMedicationsResult,
  MedicationDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetMedicationsResult";
export const getMedications = async (
  oncologyServiceUid: number,
  targetDb: TargetDbType,
): Promise<MedicationDto[]> => {
  const response = await apiClient.get<ResultResponse<GetMedicationsResult>>(
    `/rcontrol/oncology-services/${oncologyServiceUid}/medications`,
    {
      params: {
        targetDb: targetDb,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.clientMessage);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.medications;
};
