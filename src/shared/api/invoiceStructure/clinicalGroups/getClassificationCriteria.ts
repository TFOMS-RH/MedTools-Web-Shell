import type {
  ClassificationCriterionDto,
  GetClassificationCriteriaResult,
} from "../../../model/types/invoiceStructure/results/clinicalGroup/GetClassificationCriteriaResult";
import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import apiClient from "../../../../app/providers/apiClient";

export const getClassificationCriteria = async (
  clinicalGroupUid: number,
  targetDb: TargetDbType,
): Promise<ClassificationCriterionDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetClassificationCriteriaResult>
  >(`/rcontrol/clinical-groups/${clinicalGroupUid}/classification-criteria`, {
    params: {
      targetDb: targetDb,
    },
  });

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.classificationCriteria;
};
