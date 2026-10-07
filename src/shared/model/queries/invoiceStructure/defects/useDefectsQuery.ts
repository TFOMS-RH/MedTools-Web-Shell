import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getDefects } from "../../../../api/invoiceStructure/defects/getDefects";

export const useDefectsQuery = (
  medicalCaseUid: number | null,
  targetDb: TargetDbType | null,
  page: number,
  pageSize: number,
) => {
  const isReady = medicalCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: [
      "r-control",
      "defects",
      medicalCaseUid,
      targetDb,
      page,
      pageSize,
    ],
    enabled: isReady,
    queryFn: () => {
      if (medicalCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getDefects(medicalCaseUid, targetDb, page, pageSize);
    },
  });
};
