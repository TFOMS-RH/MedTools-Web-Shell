export interface AppliedFilters {
  person: AppliedPersonFilters;
  medicalCaseDetails: AppliedMedicalCaseDetailsFilters;
  oncology: AppliedOncologyFilters;
  prescription: AppliedPrescriptionFilters;
  clinicalGroups: AppliedClinicalGroupsFilters;
  providedServices: AppliedProvidedServicesFilters;
  sanction: AppliedSanctionFilters;
  internalService: AppliedInternalServiceFilters;
}

interface AppliedInternalServiceFilters {
  patientUid: string;
  medicalCaseUid: string;
  completedCaseUid: string;
}

interface AppliedSanctionFilters {
  controlTypeCodes: string[];
  refusalReasons: string[];
  expertiseActNumber: string;
  expertiseActDate: string | null;
}

interface AppliedProvidedServicesFilters {
  providedServices: string[];
}

interface AppliedClinicalGroupsFilters {
  baseClinicalGroups: AppliedBaseClinicalGroupsFilters;
  highTechMedicalCare: AppliedHighTechMedicalCareFilters;
}

interface AppliedBaseClinicalGroupsFilters {
  clinicalStatisticGroupNumbers: string[];
  interruptedCasePaymentReasons: string[];
  complexityCoefficientNumbers: string[];
}

interface AppliedHighTechMedicalCareFilters {
  highTechCareTypes: string[];
  highTechCareMethods: string[];
  voucherIssueDate: string | null;
  voucherNumber: string;
  plannedAdmissionDate: string | null;
}

interface AppliedPrescriptionFilters {
  basePrescription: AppliedBasePrescriptionFilters;
  referral: AppliedReferralFilters;
}

interface AppliedBasePrescriptionFilters {
  prescriptionTypes: string[];
  diagnosticMethods: string[];
  services: string[];
  referralDate: string | null;
  referredToMedicalOrganizations: string[];
  medicalCareProfiles: string[];
  bedProfiles: string[];
}

interface AppliedReferralFilters {
  referralDate: string | null;
  referredToMedicalOrganizations: string[];
  referralTypes: string[];
  diagnosticMethods: string[];
  referredServices: string[];
}

interface AppliedOncologyFilters {
  oncologyCase: AppliedOncologyCaseFilters;
  medication: AppliedMedicationFilters;
  oncologyService: AppliedOncologyServiceFilters;
}

interface AppliedOncologyCaseFilters {
  referralReasons: string[];
  stages: string[];
}

interface AppliedMedicationFilters {
  drugIdentifiers: string[];
  therapyRegimens: string[];
}

interface AppliedOncologyServiceFilters {
  serviceTypes: string[];
  surgicalTreatmentTypes: string[];
  drugTherapyLines: string[];
  drugTherapyCycles: string[];
  radioTherapyTypes: string[];
}

interface AppliedMedicalCaseDetailsFilters {
  baseMedicalCaseDetails: AppliedBaseMedicalCaseDetailsFilters;
  completedCaseDetails: AppliedCompletedCaseDetailsFilters;
}

interface AppliedBaseMedicalCaseDetailsFilters {
  medicalProfiles: string[];
  bedProfiles: string[];
  division: string;
  encounterMedicalOrganizations: string[];
  visitPurposes: string[];
  preventiveCarePlace: string;
  treatmentStartDate: string | null;
  treatmentEndDate: string | null;
  diseaseCharacters: string[];
  physicianSpecialties: string[];
  medicalRecordNumber: string;
}

interface AppliedCompletedCaseDetailsFilters {
  careConditions: string[];
  medicalCareTypes: string[];
  careForms: string[];
  medicalOrganizations: string[];
  referringMedicalOrganizations: string[];
  treatmentStartDate: string | null;
  treatmentEndDate: string | null;
  screeningResults: string[];
  hospitalizationOutcomes: string[];
  diseaseOutcomes: string[];
  paymentMethods: string[];
}

interface AppliedPersonFilters {
  patient: AppliedPatientFilters;
  representative: AppliedRepresentativeFilters;
  insurance: AppliedInsuranceFilters;
}

interface AppliedPatientFilters {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string | null;
  sex: string | null;
}

interface AppliedRepresentativeFilters {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string | null;
  sex: string | null;
}

interface AppliedInsuranceFilters {
  insurances: string[];
  insurancePolicyTypes: string[];
  insurancePolicySeries: string;
  insurancePolicyNumber: string;
  unifiedPolicyNumber: string;
}
