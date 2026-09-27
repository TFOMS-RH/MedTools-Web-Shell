import type { AppliedFilters } from "../types/AppliedFilters";
import type { FiltersDraft } from "../types/FiltersDraft";
import { mapDate } from "./mapDate";

export const mapFiltersDraftToApplied = (
  draft: FiltersDraft,
): AppliedFilters => {
  const appliedFilters: AppliedFilters = {
    person: {
      patient: {
        firstName: draft.person.patient.firstName,
        lastName: draft.person.patient.lastName,
        middleName: draft.person.patient.middleName,
        sex: draft.person.patient.sex,
        birthDate: mapDate(draft.person.patient.birthDate),
      },
      representative: {
        firstName: draft.person.representative.firstName,
        lastName: draft.person.representative.lastName,
        middleName: draft.person.representative.middleName,
        sex: draft.person.representative.sex,
        birthDate: mapDate(draft.person.representative.birthDate),
      },
      insurance: {
        insurances: draft.person.insurance.insurances,
        insurancePolicyNumber: draft.person.insurance.insurancePolicyNumber,
        insurancePolicySeries: draft.person.insurance.insurancePolicySeries,
        insurancePolicyTypes: draft.person.insurance.insurancePolicyTypes,
        unifiedPolicyNumber: draft.person.insurance.unifiedPolicyNumber,
      },
    },
    medicalCaseDetails: {
      baseMedicalCaseDetails: {
        bedProfiles: draft.medicalCaseDetails.medicalCaseDetails.bedProfiles,
        diseaseCharacters:
          draft.medicalCaseDetails.medicalCaseDetails.diseaseCharacters,
        division: draft.medicalCaseDetails.medicalCaseDetails.division,
        encounterMedicalOrganizations:
          draft.medicalCaseDetails.medicalCaseDetails
            .encounterMedicalOrganizations,
        medicalProfiles:
          draft.medicalCaseDetails.medicalCaseDetails.medicalProfiles,
        medicalRecordNumber:
          draft.medicalCaseDetails.medicalCaseDetails.medicalRecordNumber,
        physicianSpecialties:
          draft.medicalCaseDetails.medicalCaseDetails.physicianSpecialties,
        preventiveCarePlace:
          draft.medicalCaseDetails.medicalCaseDetails.preventiveCarePlace,
        treatmentEndDate: mapDate(
          draft.medicalCaseDetails.medicalCaseDetails.treatmentEndDate,
        ),
        treatmentStartDate: mapDate(
          draft.medicalCaseDetails.medicalCaseDetails.treatmentStartDate,
        ),
        visitPurposes:
          draft.medicalCaseDetails.medicalCaseDetails.visitPurposes,
      },
      completedCaseDetails: {
        careConditions:
          draft.medicalCaseDetails.completedCaseDetails.careConditions,
        careForms: draft.medicalCaseDetails.completedCaseDetails.careForms,
        diseaseOutcomes:
          draft.medicalCaseDetails.completedCaseDetails.diseaseOutcomes,
        hospitalizationOutcomes:
          draft.medicalCaseDetails.completedCaseDetails.hospitalizationOutcomes,
        medicalCareTypes:
          draft.medicalCaseDetails.completedCaseDetails.medicalCareTypes,
        medicalOrganizations:
          draft.medicalCaseDetails.completedCaseDetails.medicalOrganizations,
        paymentMethods:
          draft.medicalCaseDetails.completedCaseDetails.paymentMethods,
        referringMedicalOrganizations:
          draft.medicalCaseDetails.completedCaseDetails
            .referringMedicalOrganizations,
        screeningResults:
          draft.medicalCaseDetails.completedCaseDetails.screeningResults,
        treatmentEndDate: mapDate(
          draft.medicalCaseDetails.completedCaseDetails.treatmentEndDate,
        ),
        treatmentStartDate: mapDate(
          draft.medicalCaseDetails.completedCaseDetails.treatmentStartDate,
        ),
      },
    },
    oncology: {
      oncologyCase: {
        stages: draft.oncology.oncologyCase.stages.map((x) => x.value),
        referralReasons: draft.oncology.oncologyCase.referralReasons,
      },
      oncologyService: {
        drugTherapyCycles: draft.oncology.oncologyService.drugTherapyCycles,
        drugTherapyLines: draft.oncology.oncologyService.drugTherapyLines,
        radioTherapyTypes: draft.oncology.oncologyService.radioTherapyTypes,
        serviceTypes: draft.oncology.oncologyService.serviceTypes,
        surgicalTreatmentTypes:
          draft.oncology.oncologyService.surgicalTreatmentTypes,
      },
      medication: {
        drugIdentifiers: draft.oncology.medication.drugIdentifiers.map(
          (x) => x.value,
        ),
        therapyRegimens: draft.oncology.medication.therapyRegimens.map(
          (x) => x.value,
        ),
      },
    },
    prescription: {
      basePrescription: {
        bedProfiles: draft.prescription.prescription.bedProfiles,
        diagnosticMethods: draft.prescription.prescription.diagnosticMethods,
        medicalCareProfiles:
          draft.prescription.prescription.medicalCareProfiles,
        prescriptionTypes: draft.prescription.prescription.prescriptionTypes,
        referralDate: mapDate(draft.prescription.prescription.referralDate),
        referredToMedicalOrganizations:
          draft.prescription.prescription.referredToMedicalOrganizations,
        services: draft.prescription.prescription.services.map((x) => x.value),
      },
      referral: {
        diagnosticMethods: draft.prescription.referral.diagnosticMethods,
        referralDate: mapDate(draft.prescription.referral.referralDate),
        referralTypes: draft.prescription.referral.refferalTypes,
        referredServices: draft.prescription.referral.referredServices.map(
          (x) => x.value,
        ),
        referredToMedicalOrganizations:
          draft.prescription.referral.referredToMedicalOrganizations,
      },
    },
    clinicalGroups: {
      baseClinicalGroups: {
        clinicalStatisticGroupNumbers:
          draft.clinicalGroups.clinicalGroups.clinicalStatisticGroupNumbers.map(
            (x) => x.value,
          ),
        complexityCoefficientNumbers:
          draft.clinicalGroups.clinicalGroups.complexityCoefficientNumbers,
        interruptedCasePaymentReasons:
          draft.clinicalGroups.clinicalGroups.interruptedCasePaymentReasons,
      },
      highTechMedicalCare: {
        highTechCareMethods:
          draft.clinicalGroups.highTechMedicalCare.highTechCareMethods.map(
            (x) => x.value,
          ),
        highTechCareTypes:
          draft.clinicalGroups.highTechMedicalCare.highTechCareTypes.map(
            (x) => x.value,
          ),
        plannedAdmissionDate: mapDate(
          draft.clinicalGroups.highTechMedicalCare.plannedAdmissionDates,
        ),
        voucherIssueDate: mapDate(
          draft.clinicalGroups.highTechMedicalCare.voucherIssueDate,
        ),
        voucherNumber: draft.clinicalGroups.highTechMedicalCare.voucherNumber,
      },
    },
    providedServices: {
      providedServices: draft.providedServices.serviceCodes.map((x) => x.value),
    },
    sanction: {
      controlTypeCodes: draft.sanction.controlTypeCodes,
      expertiseActDate: mapDate(draft.sanction.expertiseActDate),
      expertiseActNumber: draft.sanction.expertiseActNumber,
      refusalReasons: draft.sanction.refusalReasons.map((x) => x.value),
    },
    internalService: {
      completedCaseUid: draft.inrernalService.completedCaseUid,
      medicalCaseUid: draft.inrernalService.medicalCaseUid,
      patientUid: draft.inrernalService.patientUid,
    },
  };

  return appliedFilters;
};
