export interface GetCompletedCaseDetailsResult {
  completedCaseDetails: CompletedCaseDetailsDto;
}

export interface CompletedCaseDetailsDto {
  medicalOrganizationCode: string;
  medicalOrganizationName: string;
  referringMedicalOrganizationCode: string | null;
  referringMedicalOrganizationName: string | null;
  referralDate: string | null;
  careConditions: number;
  medicalCareType: number;
  paymentMethodCode: number;
  medicalCareForm: number;
  treatmentStartDate: string;
  treatmentEndDate: string;
  hospitalizationDuration: number | null;
  hospitalizationOutcome: number;
  isIntrahospitalTransfer: boolean | null;
  screeningResult: number | null;
  isRefusal: boolean | null;
  isMobileTeam: boolean | null;
  diseaseOutcome: number;
}
