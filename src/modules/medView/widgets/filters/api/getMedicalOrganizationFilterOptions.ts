import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type { TargetDbType } from "../../../../../shared/types/TargetDbType";
import type {
  FilterOption,
  FilterOptionsResponse,
} from "../../workspace/model/types/FilterOptions";
import type { MedicalOrgsTargetSource } from "../../workspace/model/types/MedicalOrgsTargetSource";
import apiClient from "../../../../../shared/api/client/apiClient";

export const getMedicalOrganizationFilterOptions = async (
  endpoint: string,
  targetDb: TargetDbType,
  targetSource: MedicalOrgsTargetSource,
): Promise<FilterOption[]> => {
  const response = await apiClient.get<ResultResponse<FilterOptionsResponse>>(
    endpoint,
    {
      params: {
        targetDb: targetDb,
        medicalOrgsKeysFrom: targetSource,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value?.filterOptions) {
    throw new Error("Отсутствуют параметры фильтрации");
  }

  return response.data.value.filterOptions;
};
