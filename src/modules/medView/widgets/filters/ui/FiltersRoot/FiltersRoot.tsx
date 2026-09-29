
import { initialFiltersDraft, type FiltersDraft } from "../../../workspace/model/types/FiltersDraft";
import { useMedViewFiltersStore } from "../../model/stores/useMedViewFiltersStore";
import { FiltersGroupRender } from "../FilterRender/FiltersGroupRender";
import { FiltersPanel } from "../FiltersPanel/FiltersPanel";
import { useState } from "react";
import styles from "./styles.module.scss";

export const FiltersRoot = () => {
  const { selectedfilterGroupId } = useMedViewFiltersStore();
  const [filtersDraft, setFiltersDraft] =
    useState<FiltersDraft>(initialFiltersDraft);

  return (
    <section className={styles.filtersRoot}>
      <FiltersPanel filtersDraft={filtersDraft} />
      <FiltersGroupRender
        filterGroupId={selectedfilterGroupId}
        filtersDraft={filtersDraft}
        setFiltersDraft={setFiltersDraft}
      />
    </section>
  );
};
