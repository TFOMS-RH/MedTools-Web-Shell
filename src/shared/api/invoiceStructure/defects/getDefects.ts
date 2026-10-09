import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type { GetDefectsResult } from "../../../model/types/invoiceStructure/results/defects/GetDefectsResult";
import apiClient from "../../client/apiClient";

export const getDefects = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
  page: number,
  pageSize: number,
): Promise<GetDefectsResult> => {
  const response = await apiClient.get<ResultResponse<GetDefectsResult>>(
    `med-tools/rcontrol/medical-cases/${medicalCaseUid}/defects`,
    {
      params: {
        targetDb: targetDb,
        page: page + 1,
        pageSize: pageSize,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value;
};
