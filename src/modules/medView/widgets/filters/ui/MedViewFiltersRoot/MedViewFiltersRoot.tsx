import {
  initialFiltersDraft,
  type FiltersDraft,
} from "../../../workspace/model/types/FiltersDraft";
import { useMedViewFiltersStore } from "../../model/stores/useMedViewFiltersStore";
import { useState } from "react";
import { MedViewSourcePanel } from "../MedViewSourcePanel/MedViewSourcePanel";
import { MedViewFiltersGroupRender } from "../MedViewFiltersGroupRender/MedViewFiltersGroupRender";
import { MedViewFiltersPanel } from "../MedViewFiltersPanel/MedViewFiltersPanel";
import styles from "./styles.module.scss";

export const MedViewFiltersRoot = () => {
  const { selectedfilterGroupId } = useMedViewFiltersStore();
  const [filtersDraft, setFiltersDraft] =
    useState<FiltersDraft>(initialFiltersDraft);

  return (
    <section className={styles.filtersRoot}>
      <MedViewSourcePanel />
      <div className={styles.filtersGroup}>
        <MedViewFiltersPanel filtersDraft={filtersDraft} />
        <MedViewFiltersGroupRender
          filterGroupId={selectedfilterGroupId}
          filtersDraft={filtersDraft}
          setFiltersDraft={setFiltersDraft}
        />
      </div>
    </section>
  );
};
