export interface GetDefectsResult {
  defects: DefectDto[];
  totalCount: number;
}

export interface DefectDto {
  defectUid: number;
  code: number | null;
  comment: string;
}
