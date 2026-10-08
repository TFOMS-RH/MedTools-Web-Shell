import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  ContraindicationDto,
  GetContraindicationsResult,
} from "../../../model/types/invoiceStructure/results/oncology/GetContraindicationsResult";

export const getContraindications = async (
  oncologyCaseUid: number,
  targetDb: TargetDbType,
): Promise<ContraindicationDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetContraindicationsResult>
  >(`/rcontrol/oncology-cases/${oncologyCaseUid}/contraindications`, {
    params: {
      targetDb: targetDb,
    },
  });

  if (response.data.isFailure) {
    throw new Error(response.data.clientMessage);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.contraindications;
};
