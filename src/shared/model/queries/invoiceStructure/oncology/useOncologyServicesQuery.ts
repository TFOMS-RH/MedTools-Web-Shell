import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getOncologyServices } from "../../../../api/invoiceStructure/oncology/getOncologyServices";

export const useOncologyServicesQuery = (
  oncologyCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = oncologyCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "oncology-services", oncologyCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (oncologyCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getOncologyServices(oncologyCaseUid, targetDb);
    },
  });
};
