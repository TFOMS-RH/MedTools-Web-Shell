export interface GetMedicalCaseDetailsResult {
  medicalCaseDetails: MedicalCaseDetailsDto;
}

export interface MedicalCaseDetailsDto {
    medicalProfile: number;
    physicianSpecialty: number;
    treatmentStartDate: string;
    treatmentEndDate: string;
    primaryDiagnosis: string;
    paidUnits: number | null;
    department: string | null;
    departmentCode: number | null;
    isPediatric: boolean;
    visitPurpose: string | null;
    bedProfile: number | null;
    medicalRecordNumber: string;
    isAdmissionTransfer: boolean | null;
    isRehabilitation: boolean | null;
    hospitalizationDuration: number | null;
    facilityLevel: string | null;
    initialDiagnosis: string | null;
    isOncologySuspicion: boolean | null;
    physicianCode: string;
    weight: number | null;
    diseaseCharacter: number | null;
    internalComment: string | null;
}
