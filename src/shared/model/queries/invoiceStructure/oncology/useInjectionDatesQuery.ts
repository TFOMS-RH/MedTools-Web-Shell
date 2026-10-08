import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getInjectionDates } from "../../../../api/invoiceStructure/oncology/getInjectionDates";

export const useInjectionDatesQuery = (
  medicationUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = medicationUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "injection-dates", medicationUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (medicationUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getInjectionDates(medicationUid, targetDb);
    },
  });
};
