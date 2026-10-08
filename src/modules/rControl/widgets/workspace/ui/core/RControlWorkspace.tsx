import { RControlCompletedCasesTableRoot } from "./completedCases/table/RControlCompletedCasesTableRoot";
import { RControlInvoiceSummaryCardRoot } from "./invoiceSummary/card/RControlInvoiceSummaryCardRoot";
import { RControlInvoicesTableRoot } from "./invoices/table/RControlInvoicesTableRoot";
import { RControlMedicalCaseCardsGroupRoot } from "./medicalCases/cardsGroup/RControlMedicalCaseCardsGroupRoot";
import styles from "./styles.module.scss";

export const RControlWorkspace = () => {
  return (
    <section className={styles.workspaceRoot}>
      <div className={styles.invoicesGroup}>
        <RControlInvoicesTableRoot />
        <RControlInvoiceSummaryCardRoot />
      </div>
      <RControlCompletedCasesTableRoot />
      <RControlMedicalCaseCardsGroupRoot />
    </section>
  );
};
