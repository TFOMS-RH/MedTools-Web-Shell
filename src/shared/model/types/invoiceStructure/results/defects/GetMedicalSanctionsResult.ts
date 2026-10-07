export interface GetMedicalSanctionsResult {
  medicalSanctions: MedicalSanctionDto[];
}

export interface MedicalSanctionDto {
  medicalSanctionUid: number;
  sanctionCode: string;
  sanctionAmount: number;
  controlTypeCode: string;
  refusalReasonCode: number;
  comment: string | null;
  source: number;
  unitsRemoved: number;
  expertiseActDate: string;
  expertiseActNumber: string;
  expertCode: string | null;
  filename: string;
  year: number | null;
  month: number | null;
  uploadDate: string | null;
}
