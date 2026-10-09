import type {
  GetOncologyCaseResult,
  OncologyCaseDto,
} from "../../../model/types/invoiceStructure/results/oncology/GetOncologyCaseResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../client/apiClient";

export const getOncologyCase = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<OncologyCaseDto | null> => {
  const response = await apiClient.get<ResultResponse<GetOncologyCaseResult>>(
    `med-tools/rcontrol/medical-cases/${medicalCaseUid}/oncology-case`,
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

  return response.data.value.oncologyCase;
};
