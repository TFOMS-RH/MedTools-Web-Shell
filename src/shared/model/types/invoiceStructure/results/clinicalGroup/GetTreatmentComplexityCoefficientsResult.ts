export interface GetTreatmentComplexityCoefficientsResult {
  treatmentComplexityCoefficients: TreatmentComplexityCoefficientDto[];
}

export interface TreatmentComplexityCoefficientDto {
  treatmentComplexityCoefficientUid: number;
  complexityCoefficientNumber: string | null;
  complexityCoefficientValue: number;
}
