import type { PaginationState } from "../../../../../../shared/types/PaginationState";
import { create } from "zustand";
import type { RControlCategoryId } from "../../../../../../shared/model/types/CategoryId";

interface RControlWorkspaceStore {
  selectedInvoiceUid: number | null;
  selectedCompletedCaseUid: number | null;
  selectedMedicalCaseUid: number | null;
  selectedProvidedServiceUid: number | null;
  selectedOncologyServiceUid: number | null;
  selectedMedicationUid: number | null;
  invoiceTableSearchString: string;
  completedCasesTableSearchString: string;

  invoicesTablePagination: PaginationState;
  completedCasesTablePagination: PaginationState;
  defectsTablePagination: PaginationState;

  targetCategory: RControlCategoryId;

  selectOncologyService: (oncologyServiceUid: number | null) => void;
  selectMedication: (medicationUid: number | null) => void;
  selectInvoice: (invoiceUid: number | null) => void;
  selectCompletedCase: (completedCaseUid: number | null) => void;
  selectMedicalCase: (medicalCaseUid: number | null) => void;
  selectProvidedService: (providedServiceUid: number | null) => void;
  setInvoicesTablePagination: (
    newState: Partial<RControlWorkspaceStore["invoicesTablePagination"]>,
  ) => void;
  setCompletedCasesTablePagination: (
    newState: Partial<RControlWorkspaceStore["completedCasesTablePagination"]>,
  ) => void;
  setDefectsTablePagination: (
    newState: Partial<RControlWorkspaceStore["defectsTablePagination"]>,
  ) => void;
  setTargetCategory: (targetCategory: RControlCategoryId) => void;
  setInvoicesSearch: (value: string) => void;
  setCompletedCasesSearch: (value: string) => void;
}

export const useRControlWorkspaceStore = create<RControlWorkspaceStore>(
  (set) => ({
    selectedInvoiceUid: null,
    selectedCompletedCaseUid: null,
    selectedMedicalCaseUid: null,
    selectedProvidedServiceUid: null,
    selectedOncologyServiceUid: null,
    selectedMedicationUid: null,
    invoiceTableSearchString: "",
    completedCasesTableSearchString: "",

    invoicesTablePagination: {
      page: 0,
      pageSize: 10,
    },
    completedCasesTablePagination: {
      page: 0,
      pageSize: 10,
    },
    defectsTablePagination: {
      page: 0,
      pageSize: 10,
    },

    targetCategory: "default",

    setTargetCategory: (targetCategory) =>
      set({
        targetCategory: targetCategory,
      }),
    selectInvoice: (invoiceUid) =>
      set((state) => ({
        selectedInvoiceUid: invoiceUid,
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedProvidedServiceUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        completedCasesTablePagination: {
          ...state.completedCasesTablePagination,
          page: 0,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),
    selectCompletedCase: (completedCaseUid) =>
      set((state) => ({
        selectedCompletedCaseUid: completedCaseUid,
        selectedMedicalCaseUid: null,
        selectedProvidedServiceUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),
    selectMedicalCase: (medicalCaseUid) =>
      set((state) => ({
        selectedMedicalCaseUid: medicalCaseUid,
        selectedProvidedServiceUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
      })),
    selectProvidedService: (providedServiceUid) =>
      set({
        selectedProvidedServiceUid: providedServiceUid,
      }),
    selectOncologyService: (oncologyServiceUid) =>
      set({
        selectedOncologyServiceUid: oncologyServiceUid,
        selectedMedicationUid: null,
      }),
    selectMedication: (medicationUid) =>
      set({
        selectedMedicationUid: medicationUid,
      }),
    setInvoicesTablePagination: (newState) =>
      set((state) => ({
        invoicesTablePagination: {
          ...state.invoicesTablePagination,
          ...newState,
        },
        completedCasesTablePagination: {
          ...state.completedCasesTablePagination,
          page: 0,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
        selectedInvoiceUid: null,
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        selectedProvidedServiceUid: null,
      })),
    setCompletedCasesTablePagination: (newState) =>
      set((state) => ({
        completedCasesTablePagination: {
          ...state.completedCasesTablePagination,
          ...newState,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        selectedProvidedServiceUid: null,
      })),

    setDefectsTablePagination: (newState) =>
      set((state) => ({
        defectsTablePagination: {
          ...state.defectsTablePagination,
          ...newState,
        },
      })),

    setInvoicesSearch: (value: string) =>
      set((state) => ({
        selectedInvoiceUid: null,
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedProvidedServiceUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        invoicesTablePagination: {
          ...state.invoicesTablePagination,
          page: 0,
        },
        completedCasesTablePagination: {
          ...state.completedCasesTablePagination,
          page: 0,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
        invoiceTableSearchString: value,
      })),

    setCompletedCasesSearch: (value: string) =>
      set((state) => ({
        selectedCompletedCaseUid: null,
        selectedMedicalCaseUid: null,
        selectedProvidedServiceUid: null,
        selectedOncologyServiceUid: null,
        selectedMedicationUid: null,
        completedCasesTablePagination: {
          ...state.completedCasesTablePagination,
          page: 0,
        },
        defectsTablePagination: {
          ...state.defectsTablePagination,
          page: 0,
        },
        completedCasesTableSearchString: value,
      })),
  }),
);
