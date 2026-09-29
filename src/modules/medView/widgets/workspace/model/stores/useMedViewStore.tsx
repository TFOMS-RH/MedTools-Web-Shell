import { create } from "zustand";
import type { PaginationState } from "../../../../../../shared/types/PaginationState";

interface MedViewStore {
  selectedCompletedCaseUid: number | null;
  selectedMedicalCaseUid: number | null;
  completedCasePaginationState: PaginationState;
  selectCompletedCase: (completedCaseUid: number | null) => void;
  selectMedicalCase: (medicalCaseUid: number | null) => void;
  setCompletedCasesTablePagination: (
    newState: Partial<MedViewStore["completedCasePaginationState"]>,
  ) => void;
}

export const useMedViewStore = create<MedViewStore>((set) => ({
  selectedfilterGroupId: "none",
  appliedFilters: null,
  selectedCompletedCaseUid: null,
  selectedMedicalCaseUid: null,
  completedCasePaginationState: {
    page: 0,
    pageSize: 25,
  },

  selectCompletedCase: (completedCaseUid) =>
    set((state) => ({
      selectedCompletedCaseUid: completedCaseUid,
      ...state.completedCasePaginationState,
      page: 0,
    })),

  selectMedicalCase: (medicalCaseUid) =>
    set((state) => ({
      selectedMedicalCaseUid: medicalCaseUid,
      ...state.completedCasePaginationState,
      page: 0,
    })),

  setCompletedCasesTablePagination: (newState) =>
    set((state) => ({
      completedCasePaginationState: {
        ...state.completedCasePaginationState,
        ...newState,
      },
    })),
}));
