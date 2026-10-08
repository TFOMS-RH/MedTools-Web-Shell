import type { MedicalOrganizationDto, MedicalOrganizationResult } from "../model/types/MedicalOrganizationResult";
import type { ResultResponse } from "../../../../../shared/types/ResultResponse";
import type { TargetDbType } from "../../../../../shared/types/TargetDbType";
import apiClient from "../../../../../app/providers/apiClient";

export const getMedicalOrganizations = async (
  targetDb: TargetDbType,
): Promise<MedicalOrganizationDto[]> => {
  const response = await apiClient.get<
    ResultResponse<MedicalOrganizationResult>
  >("/rcontrol/lookups/medical-organizations", {
    params: {
      targetDb: targetDb,
    },
  });

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Данные не были получены");
  }

  return response.data.value.medicalOrganizations;
};
