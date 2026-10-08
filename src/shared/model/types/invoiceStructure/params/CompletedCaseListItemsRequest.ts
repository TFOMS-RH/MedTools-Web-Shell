import type { TargetDbType } from "../../../../types/TargetDbType";

export interface CompletedCaseListItemsRequest {
  invoiceUid: number;
  page: number;
  pageSize: number;
  searchString: string;
  targetDb: TargetDbType;
}
