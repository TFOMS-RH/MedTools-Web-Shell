import type { TargetDbType } from "../../../../types/TargetDbType";

export interface InvoiceListItemsQueryParams {
  medicalOrganizationCode: string | null;
  year: number | null;
  month: number | null;
  page: number;
  pageSize: number;
  targetDb: TargetDbType | null;
  searchString: string;
}
