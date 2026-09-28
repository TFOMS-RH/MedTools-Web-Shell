import { CompletedCasesTableRoot } from "./CompletedCasesTable/CompletedCasesTableRoot/CompletedCasesTableRoot";
import { MedicalCasesSection } from "./MedicalCases/MedicalCasesSection/MedicalCasesSection";
import { InvoicesTableRoot } from "./InvoicesTable/InvoicesTableRoot/InvoicesTableRoot";
import { InvoiceSummaryRoot } from "./InvoiceSummary/InvoiceSummaryRoot";
import styles from "./styles.module.scss";

export const Workspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <div className={styles.invoicesGroup}>
        <InvoicesTableRoot />
        <InvoiceSummaryRoot />
      </div>
      <CompletedCasesTableRoot />
      <MedicalCasesSection />
    </section>
  );
};
