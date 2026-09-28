import type { FilterGroupId } from "../types/FilterId";
import type { AppliedFilters } from "../types/AppliedFilters";
import type { FiltersDraft } from "../types/FiltersDraft";
import type { PaginationState } from "../../../../../shared/types/PaginationState";
import { create } from "zustand";
import { mapFiltersDraftToApplied } from "../mappers/mapFiltersDraftToApplied";

interface MedViewStore {
  selectedfilterGroupId: FilterGroupId;
  appliedFilters: AppliedFilters | null;
  completedCasePaginationState: PaginationState;
  selectFilterGroup: (filterGroupId: FilterGroupId) => void;
  applyFilters: (draft: FiltersDraft) => void;
  setCompletedCasesTablePagination: (
    newState: Partial<MedViewStore["completedCasePaginationState"]>,
  ) => void;
}

export const useMedViewStore = create<MedViewStore>((set) => ({
  selectedfilterGroupId: "none",
  appliedFilters: null,
  completedCasePaginationState: {
    page: 0,
    pageSize: 100,
  },
  selectFilterGroup: (filterGroupId) =>
    set({
      selectedfilterGroupId: filterGroupId,
    }),
  applyFilters: (draft) =>
    set({
      appliedFilters: mapFiltersDraftToApplied(draft),
    }),
  setCompletedCasesTablePagination: (newState) =>
    set((state) => ({
      completedCasePaginationState: {
        ...state.completedCasePaginationState,
        ...newState,
      },
    })),
}));
