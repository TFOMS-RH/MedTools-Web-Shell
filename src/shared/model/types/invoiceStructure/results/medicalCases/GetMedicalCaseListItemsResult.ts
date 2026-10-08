export interface GetMedicalCaseListItemsResult {
  medicalCases: MedicalCaseDto[];
}

export interface MedicalCaseDto {
  medicalCaseUid: number;
  medicalProfile: number | null;
  isPediatric: boolean;
  physicianSpecialty: number;
  treatmentStartDate: string;
  treatmentEndDate: string;
  primaryDiagnosis: string;
  paidUnits: number | null;
  unitRate: number | null;
  amountBilled: number;
  approvedAmount: number | null;
  insuranceCompanyApprovedAmount: number | null;
}
