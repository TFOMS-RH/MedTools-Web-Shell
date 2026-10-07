import { create } from "zustand";
import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";

interface FiltersStore {
  targetDb: TargetDbType | null;
  selectedMedicalOrganization: string | null;
  selectedBillingYear: number | null;
  selectedBillingMonth: number | null;
  selectTargetDb: (targetDb: TargetDbType | null) => void;
  selectMedicalOrganization: (medicalOrganization: string) => void;
  selectBillingYear: (billingYear: number) => void;
  selectBillingMonth: (billingMonth: number) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  targetDb: null,
  selectedMedicalOrganization: null,
  selectedBillingYear: null,
  selectedBillingMonth: null,
  selectTargetDb: (targetDb) =>
    set({
      targetDb: targetDb,
      selectedMedicalOrganization: null,
      selectedBillingYear: null,
      selectedBillingMonth: null,
    }),
  selectMedicalOrganization: (medicalOrganization) =>
    set({
      selectedMedicalOrganization: medicalOrganization,
      selectedBillingYear: null,
      selectedBillingMonth:null
    }),
  selectBillingYear: (billingYear) =>
    set({
      selectedBillingYear: billingYear,
      selectedBillingMonth: null
    }),
  selectBillingMonth: (billingMonth) =>
    set({
      selectedBillingMonth: billingMonth,
    }),
}));
