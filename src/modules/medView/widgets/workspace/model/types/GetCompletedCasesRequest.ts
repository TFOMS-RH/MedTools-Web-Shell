import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import type { AppliedFilters } from "./AppliedFilters";

export interface GetCompletedCasesRequest {
  filters: AppliedFilters;
  pagination: PaginationState;
}
