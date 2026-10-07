import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getMedicalCaseDetails } from "../../../../api/invoiceStructure/medicalCaseDetails/getMedicalCaseDetails";

export const useMedicalCaseDetailsQuery = (
  medicalCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicalCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "medical-case-details", medicalCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicalCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getMedicalCaseDetails(medicalCaseUid, targetDb);
    },
  });
};
