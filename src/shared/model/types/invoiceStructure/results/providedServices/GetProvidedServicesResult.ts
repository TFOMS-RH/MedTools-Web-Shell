export interface GetProvidedServicesResult {
  providedServices: ProvidedServiceDto[];
}

export interface ProvidedServiceDto {
  providedServiceUid: number;
  serviceCode: string;
  service: string;
  medicalInterventionType: string | null;
  medicalProfileCode: number;
  medicalProfile: string;
  physicianSpecialtyCode: number;
  physicianSpecialty: string;
  isPediatric: boolean;
  serviceStartDate: string;
  serviceEndDate: string;
  diagnosis: string;
  serviceQuantity: number;
  unitRate: number | null;
  amountBilled: number;
  internalComment: string | null;
}
