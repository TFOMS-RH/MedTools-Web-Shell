import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getPrescriptions } from "../../../../api/invoiceStructure/prescriptions/getPrescriptions";

export const usePrescriptionsQuery = (
  medicalCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicalCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "prescriptions", medicalCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicalCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getPrescriptions(medicalCaseUid, targetDb);
    },
  });
};
