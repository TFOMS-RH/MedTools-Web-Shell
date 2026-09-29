import type { TargetDbType } from "../../../../../../shared/types/TargetDbType";
import type { FilterGroupId } from "../../../workspace/model/types/FilterId";
import type { AppliedFilters } from "../../../workspace/model/types/AppliedFilters";
import type { FiltersDraft } from "../../../workspace/model/types/FiltersDraft";
import { mapFiltersDraftToApplied } from "../../../workspace/model/mappers/mapFiltersDraftToApplied";
import { create } from "zustand";

interface MedViewFiltersStore {
  targetDb: TargetDbType | null;
  selectedfilterGroupId: FilterGroupId;
  appliedFilters: AppliedFilters | null;

  selectTargetDb: (targetDb: TargetDbType | null) => void;
  selectFilterGroup: (filterGroupId: FilterGroupId) => void;
  applyFilters: (draft: FiltersDraft) => void;
}

export const useMedViewFiltersStore = create<MedViewFiltersStore>((set) => ({
  targetDb: null,
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
  selectTargetDb: (targetDb) =>
    set({
      targetDb: targetDb,
    }),
}));
