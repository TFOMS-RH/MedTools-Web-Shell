import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import type { MedViewCategoryId } from "../../../../../../shared/model/types/CategoryId";
import { create } from "zustand";

interface MedViewWorkspaceStore {
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
    newState: Partial<MedViewWorkspaceStore["completedCasePaginationState"]>,
  ) => void;
  setDefectsTablePagination: (
    newState: Partial<MedViewWorkspaceStore["defectsTablePagination"]>,
  ) => void;
  setTargetCategory: (targetCategory: MedViewCategoryId) => void;
  selectOncologyService: (oncologyServicUid: number | null) => void;
  selectMedication: (medicationUid: number | null) => void;
  selectProvidedService: (providedService: number | null) => void;

  resetWorkspace: () => void;
}

export const useMedViewWorkspaceStore = create<MedViewWorkspaceStore>(
  (set) => ({
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
        selectedMedicalCaseUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        selectedProvidedServiceUid: null,
        selectedCompletedCaseUid: completedCaseUid,

        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),

    selectMedicalCase: (medicalCaseUid) =>
      set((state) => ({
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        selectedProvidedServiceUid: null,
        selectedMedicalCaseUid: medicalCaseUid,

        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),

    selectOncologyService: (oncologyService) =>
      set({
        selectedOncologyServiceUid: oncologyService,
        selectedMedicationUid: null,
      }),
    selectMedication: (medicatonUid) =>
      set({
        selectedMedicationUid: medicatonUid,
      }),
    selectProvidedService: (providedService) =>
      set({
        selectedProvidedServiceUid: providedService,
      }),

    setCompletedCasesTablePagination: (newState) =>
      set((state) => ({
        completedCasePaginationState: {
          ...state.completedCasePaginationState,
          ...newState,
        },
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        selectedProvidedServiceUid: null,

        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
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

    resetWorkspace: () =>
      set((state) => ({
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedOncologyServiceUid: null,
        selectedProvidedServiceUid: null,
        selectedMedicationUid: null,

        completedCasePaginationState: {
          ...state.completedCasePaginationState,
          page: 0,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),
  }),
);
