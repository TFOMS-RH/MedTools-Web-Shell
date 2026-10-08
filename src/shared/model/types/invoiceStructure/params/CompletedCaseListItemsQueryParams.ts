import type { TargetDbType } from "../../../../types/TargetDbType";

export interface CompletedCaseListItemsQueryParams {
  invoiceUid: number | null;
  page: number;
  pageSize: number;
  searchString: string;
  targetDb: TargetDbType | null;
}
