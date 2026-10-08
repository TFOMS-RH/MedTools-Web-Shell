import apiClient from "../../../../app/providers/apiClient";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetInjectionDatesResult,
  InjectionDateDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetInjectionDatesResult";

export const getInjectionDates = async (
  medicationUid: number | null,
  targetDb: TargetDbType,
): Promise<InjectionDateDto[]> => {
  const response = await apiClient.get<ResultResponse<GetInjectionDatesResult>>(
    `/rcontrol/medications/${medicationUid}/injection-dates`,
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

  return response.data.value.injectionDates;
};
