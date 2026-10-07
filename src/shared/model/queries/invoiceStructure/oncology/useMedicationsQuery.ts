import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getMedications } from "../../../../api/invoiceStructure/oncology/getMedications";

export const useMedicationsQuery = (
  oncologyServiceUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = oncologyServiceUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "medications", oncologyServiceUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (oncologyServiceUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getMedications(oncologyServiceUid, targetDb);
    },
  });
};
