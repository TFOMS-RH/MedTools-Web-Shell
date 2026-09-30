import type { MedicalOrgsTargetSource } from "../../../workspace/model/types/MedicalOrgsTargetSource";
import { useQuery } from "@tanstack/react-query";
import { getMedicalOrganizationFilterOptions } from "../../api/getMedicalOrganizationFilterOptions";
import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";

export const useMedicalOrganizationFilterOptionsQuery = (
  endpoint: string,
  filterQueryKey: string,
  targetDb: TargetDbType,
  targetSource: MedicalOrgsTargetSource,
) => {
  return useQuery({
    queryKey: [
      "med-view",
      "filter-options",
      filterQueryKey,
      targetDb,
      targetSource,
    ],
    queryFn: () =>
      getMedicalOrganizationFilterOptions(endpoint, targetDb, targetSource),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
