import type { ResultResponse } from "../../../types/ResultResponse";
import type { TargetDbType } from "../../../types/TargetDbType";
import type {
  GetMedicalDevicesResult,
  MedicalDeviceDto,
} from "../../../model/types/invoiceStructure/results/providedServices/GetMedicalDevicesResult";
import apiClient from "../../client/apiClient";

export const getMedicalDevices = async (
  providedServiceUid: number,
  targetDb: TargetDbType,
): Promise<MedicalDeviceDto[]> => {
  const response = await apiClient.get<ResultResponse<GetMedicalDevicesResult>>(
    `med-tools/rcontrol/provided-services/${providedServiceUid}/medical-devices`,
    {
      params: {
        targetDb: targetDb,
      },
    },
  );

  if (response.data.isFailure) {
    throw new Error(response.data.error);
  }

  if (!response.data.value) {
    throw new Error("Сервер прислал невалидный ответ");
  }

  return response.data.value.medicalDevices;
};
