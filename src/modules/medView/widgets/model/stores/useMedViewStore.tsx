import type { FilterGroupId } from "../types/FilterId";
import type { AppliedFilters } from "../types/AppliedFilters";
import type { FiltersDraft } from "../types/FiltersDraft";
import { create } from "zustand";
import { mapFiltersDraftToApplied } from "../mappers/mapFiltersDraftToApplied";

interface MedViewStore {
  selectedfilterGroupId: FilterGroupId;
  appliedFilters: AppliedFilters | null;
  selectFilterGroup: (filterGroupId: FilterGroupId) => void;
  applyFilters: (draft: FiltersDraft) => void;
}

export const useMedViewStore = create<MedViewStore>((set) => ({
  selectedfilterGroupId: "none",
  appliedFilters: null,
  selectFilterGroup: (filterGroupId) =>
    set({
      selectedfilterGroupId: filterGroupId,
    }),
  applyFilters: (draft) =>
    set({
      appliedFilters: mapFiltersDraftToApplied(draft),
    }),
}));
