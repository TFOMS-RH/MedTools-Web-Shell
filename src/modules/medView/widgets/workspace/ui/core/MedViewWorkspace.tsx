import { MedViewCompletedCaseTableRoot } from "./MedViewCompletedCaseTable/MedViewCompletedCaseTableRoot/MedViewCompletedCaseTableRoot";
import { MedViewMedicalCasesSection } from "./MedViewMedicalCases/MedViewMedicalCasesSection/MedViewMedicalCasesSection";
import styles from "./styles.module.scss";

export const MedViewWorkspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <MedViewCompletedCaseTableRoot />
      <MedViewMedicalCasesSection />
    </section>
  );
};
