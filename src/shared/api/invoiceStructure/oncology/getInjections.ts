import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetInjectionsResult,
  InjectionDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetInjectionsResult";
import apiClient from "../../client/apiClient";

export const getInjections = async (
  medicationUid: number,
  targetDb: TargetDbType,
): Promise<InjectionDto[]> => {
  const response = await apiClient.get<ResultResponse<GetInjectionsResult>>(
    `med-tools/rcontrol/medications/${medicationUid}/injections`,
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

  return response.data.value.injections;
};
