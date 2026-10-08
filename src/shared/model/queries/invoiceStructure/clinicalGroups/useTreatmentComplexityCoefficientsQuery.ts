import type { TargetDbType } from "../../../../types/TargetDbType";
import { getTreatmentComplexityCoefficients } from "../../../../api/invoiceStructure/clinicalGroups/getTreatmentComplexityCoefficients";
import { useQuery } from "@tanstack/react-query";

export const useTreatmentComplexityCoefficientsQuery = (
  clinicalGroupUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = clinicalGroupUid !== null && targetDb !== null;

  return useQuery({
    queryKey: [
      "r-control",
      "treatment-complexity-coefficients",
      clinicalGroupUid,
      targetDb,
    ],
    enabled: isReady,
    queryFn: () => {
      if (clinicalGroupUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getTreatmentComplexityCoefficients(clinicalGroupUid, targetDb);
    },
  });
};
