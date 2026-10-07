import type { TargetDbType } from "../../../../types/TargetDbType";
import { getMedicalDevices } from "../../../../api/invoiceStructure/providedServices/getMedicalDevices";
import { useQuery } from "@tanstack/react-query";

export const useMedicalDevicesQuery = (
  providedServiceUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = providedServiceUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "medical-devices", providedServiceUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (providedServiceUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getMedicalDevices(providedServiceUid, targetDb);
    },
  });
};
