import { TargetDbToggle } from "../../../../../../shared/ui/TargetDbToggle/TargetDbToggle";
import { useMedViewStore } from "../../../workspace/model/stores/useMedViewStore";
import { useMedViewFiltersStore } from "../../model/stores/useMedViewFiltersStore";
import styles from "./styles.module.scss";

export const MedViewSourcePanel = () => {
  const { selectTargetDb, targetDb } = useMedViewFiltersStore();

  const { resetWorkspace } = useMedViewStore();

  return (
    <section className={styles.sourcePanel}>
      <p className={styles.title}>Источник данных:</p>
      <div className={styles.actions}>
        <TargetDbToggle
          value={targetDb ?? ""}
          onChange={(
            _event: React.MouseEvent<HTMLElement>,
            newValue: string,
          ) => {
            if (newValue === "SMODB18" || newValue === "INOGOROD18") {
              resetWorkspace();
              selectTargetDb(newValue);
            }
          }}
        />
      </div>
    </section>
  );
};
