import { MedViewCompletedCaseTableRoot } from "./CompletedCaseTable/MedViewCompletedCaseTableRoot/CompletedCaseTableRoot";
import styles from "./styles.module.scss";

export const MedViewWorkspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <MedViewCompletedCaseTableRoot />
    </section>
  );
};
