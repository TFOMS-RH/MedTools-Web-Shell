import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetProvidedServicesResult,
  ProvidedServiceDto,
} from "../../../model/types/invoiceStructure/results/providedServices/GetProvidedServicesResult";
import apiClient from "../../client/apiClient";

export const getProvidedServices = async (
  medicalCaseUid: number,
  targetDb: TargetDbType,
): Promise<ProvidedServiceDto[]> => {
  const response = await apiClient.get<
    ResultResponse<GetProvidedServicesResult>
  >(`med-tools/rcontrol/medical-cases/${medicalCaseUid}/provided-services`, {
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

  return response.data.value.providedServices;
};
