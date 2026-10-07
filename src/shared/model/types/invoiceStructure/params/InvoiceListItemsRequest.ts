import type { TargetDbType } from "../../../../types/TargetDbType";

export interface InvoiceListItemsRequest {
  medicalOrganizationCode: string;
  year: number;
  month: number;
  page: number;
  pageSize: number;
  targetDb: TargetDbType;
  searchString: string;
}
