export interface GetMedicalDevicesResult {
  medicalDevices: MedicalDeviceDto[];
}

export interface MedicalDeviceDto {
  medicalDeviceUid: number;
  implantationDate: string;
  medicalDeviceTypeCode: number;
  serialNumber: string;
}
