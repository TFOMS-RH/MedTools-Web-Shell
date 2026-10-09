import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetMedicationsResult,
  MedicationDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetMedicationsResult";
import apiClient from "../../client/apiClient";
export const getMedications = async (
  oncologyServiceUid: number,
  targetDb: TargetDbType,
): Promise<MedicationDto[]> => {
  const response = await apiClient.get<ResultResponse<GetMedicationsResult>>(
    `med-tools/rcontrol/oncology-services/${oncologyServiceUid}/medications`,
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
