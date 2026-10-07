import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../../../../api/invoiceStructure/patient/getPatient";

export const usePatientQuery = (
  medicalCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicalCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "patient", medicalCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicalCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getPatient(medicalCaseUid, targetDb);
    },
  });
};
