import type { TargetDbType } from "../../../../types/TargetDbType";
import { getClassificationCriteria } from "../../../../api/invoiceStructure/clinicalGroups/getClassificationCriteria";
import { useQuery } from "@tanstack/react-query";

export const useClassificationCriteriaQuery = (
  clinicalGroupUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = clinicalGroupUid !== null && targetDb !== null;

  return useQuery({
    queryKey: [
      "r-control",
      "classification-criteria",
      clinicalGroupUid,
      targetDb,
    ],
    enabled: isReady,
    queryFn: () => {
      if (clinicalGroupUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getClassificationCriteria(clinicalGroupUid, targetDb);
    },
  });
};
