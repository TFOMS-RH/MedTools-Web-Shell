import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getInjections } from "../../../../api/invoiceStructure/oncology/getInjections";

export const useInjectionsQuery = (
  medicationUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicationUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "injections", medicationUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicationUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getInjections(medicationUid, targetDb);
    },
  });
};
