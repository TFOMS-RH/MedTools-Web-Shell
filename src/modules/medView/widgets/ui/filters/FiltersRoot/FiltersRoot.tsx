import {
  initialFiltersDraft,
  type FiltersDraft,
} from "../../../model/types/FiltersDraft";
import { useState } from "react";
import { useMedViewStore } from "../../../model/stores/useMedViewStore";
import { FiltersGroupRender } from "../FilterRender/FiltersGroupRender";
import { FiltersPanel } from "../FiltersPanel/FiltersPanel";
import styles from "./styles.module.scss";

export const FiltersRoot = () => {
  const { selectedfilterGroupId } = useMedViewStore();
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
