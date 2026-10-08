import { getHighTechMedicalCare } from "../../../../api/invoiceStructure/clinicalGroups/getHighTechMedicalCare";
import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";

export const useHighTechMedicalCareQuery = (
  medicalCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicalCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "high-tech-medical-care", medicalCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicalCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getHighTechMedicalCare(medicalCaseUid, targetDb);
    },
  });
};
