import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";
import { useQuery } from "@tanstack/react-query";
import { getMedicalOrganizations } from "../../api/getMedicalOrganizations";

export const useMedicalOrganizationsQuery = (targetDb: TargetDbType | null) => {
  return useQuery({
    queryKey: ["r-control", "medical-organizations", targetDb],
    enabled: targetDb !== null,
    queryFn: () => getMedicalOrganizations(targetDb!),
  });
};
