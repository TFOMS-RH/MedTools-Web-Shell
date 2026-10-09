import { MedViewCompletedCasesTableRoot } from "./completedCases/table/MedViewCompletedCasesTableRoot";
import { MedViewMedicalCaseCardsGroupRoot } from "./medicalCases/cardsGroup/MedViewMedicalCaseCardsGroupRoot";
import styles from "./styles.module.scss";

export const MedViewWorkspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <MedViewCompletedCasesTableRoot />
      <MedViewMedicalCaseCardsGroupRoot />
    </section>
  );
};
