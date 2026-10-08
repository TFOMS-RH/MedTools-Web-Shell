export interface MedicalOrganizationResult {
  medicalOrganizations: MedicalOrganizationDto[];
}

export interface MedicalOrganizationDto {
  medicalOrganizationCode: string;
  medicalOrganizationName: string;
}
