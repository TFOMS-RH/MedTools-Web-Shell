import { MedViewCompletedCaseTableRoot } from "./MedViewCompletedCaseTable/MedViewCompletedCaseTableRoot/MedViewCompletedCaseTableRoot";
import styles from "./styles.module.scss";

export const MedViewWorkspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <MedViewCompletedCaseTableRoot />
    </section>
  );
};
