import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetOncologyServicesResult,
  OncologyServiceDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetOncologyServicesResult";
import apiClient from "../../client/apiClient";

export const getOncologyServices = async (
  oncologyCaseUid: number,
  targetDb: TargetDbType,
): Promise<OncologyServiceDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetOncologyServicesResult>
  >(`med-tools/rcontrol/oncology-cases/${oncologyCaseUid}/oncology-services`, {
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

  return response.data.value.oncologyServices;
};
