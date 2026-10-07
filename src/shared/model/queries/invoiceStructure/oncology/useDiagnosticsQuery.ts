import type { TargetDbType } from "../../../../types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getDiagnostics } from "../../../../api/invoiceStructure/oncology/getDiagnostics";

export const useDiagnosticsQuery = (
  oncologyCaseUid: number | null,
  targetDb: TargetDbType | null,
) => {
  const isReady = oncologyCaseUid !== null && targetDb !== null;

  return useQuery({
    queryKey: ["r-control", "diagnostics", oncologyCaseUid, targetDb],
    enabled: isReady,
    queryFn: () => {
      if (oncologyCaseUid === null || targetDb === null) {
        throw new Error("Невалидные параметры запроса");
      }

      return getDiagnostics(oncologyCaseUid, targetDb);
    },
  });
};
