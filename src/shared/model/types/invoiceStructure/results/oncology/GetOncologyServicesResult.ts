export interface GetOncologyServicesResult {
  oncologyServices: OncologyServiceDto[];
}

export interface OncologyServiceDto {
  oncologyServiceUid: number;
  serviceTypeCode: number;
  serviceType: string;
  surgicalTreatmentTypeCode: number | null;
  surgicalTreatmentType: string | null;
  drugTherapyLineCode: number | null;
  drugTherapyLine: string | null;
  drugTherapyCycleCode: number | null;
  drugTherapyCycle: string | null;
  isAntiemeticProphylaxis: boolean | null;
  radioTherapyTypeCode: number | null;
  radiotherapyType: string | null;
}
