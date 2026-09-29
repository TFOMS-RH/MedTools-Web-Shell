import { create } from "zustand";
import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import type { MedViewCategoryId } from "../../../../../rControl/widgets/workspace/model/types/categories/CategoryId";

interface MedViewStore {
  selectedCompletedCaseUid: number | null;
  selectedMedicalCaseUid: number | null;
  selectedOncologyServiceUid: number | null;
  selectedMedicationUid: number | null;
  selectedProvidedServiceUid: number | null;

  completedCasePaginationState: PaginationState;
  defectsTablePagination: PaginationState;

  targetCategory: MedViewCategoryId;

  selectCompletedCase: (completedCaseUid: number | null) => void;
  selectMedicalCase: (medicalCaseUid: number | null) => void;
  setCompletedCasesTablePagination: (
    newState: Partial<MedViewStore["completedCasePaginationState"]>,
  ) => void;
  setDefectsTablePagination: (
    newState: Partial<MedViewStore["defectsTablePagination"]>,
  ) => void;
  setTargetCategory: (targetCategory: MedViewCategoryId) => void;
  selectOncologyService: (oncologyServicUid: number | null) => void;
  selectMedication: (medicationUid: number | null) => void;
  selectProvidedService: (providedService: number | null) => void;
}

export const useMedViewStore = create<MedViewStore>((set) => ({
  selectedfilterGroupId: "none",
  appliedFilters: null,
  selectedCompletedCaseUid: null,
  selectedMedicalCaseUid: null,
  selectedOncologyServiceUid: null,
  selectedMedicationUid: null,
  selectedProvidedServiceUid: null,
  targetCategory: "default",
  completedCasePaginationState: {
    page: 0,
    pageSize: 10,
  },
  defectsTablePagination: {
    page: 0,
    pageSize: 10,
  },

  selectCompletedCase: (completedCaseUid) =>
    set((state) => ({
      selectedCompletedCaseUid: completedCaseUid,
      ...state.completedCasePaginationState,
      page: 0,
    })),

  selectMedicalCase: (medicalCaseUid) =>
    set({
      selectedMedicalCaseUid: medicalCaseUid,
    }),

  setCompletedCasesTablePagination: (newState) =>
    set((state) => ({
      completedCasePaginationState: {
        ...state.completedCasePaginationState,
        ...newState,
      },
    })),
  setDefectsTablePagination: (newState) =>
    set((state) => ({
      defectsTablePagination: {
        ...state.defectsTablePagination,
        ...newState,
      },
    })),
  setTargetCategory: (targetCategory) =>
    set({
      targetCategory: targetCategory,
    }),

  selectOncologyService: (oncologyService) =>
    set({
      selectedOncologyServiceUid: oncologyService,
    }),
  selectMedication: (medicatonUid) =>
    set({
      selectedMedicationUid: medicatonUid,
    }),
  selectProvidedService: (providedService) =>
    set({
      selectedProvidedServiceUid: providedService,
    }),
}));
