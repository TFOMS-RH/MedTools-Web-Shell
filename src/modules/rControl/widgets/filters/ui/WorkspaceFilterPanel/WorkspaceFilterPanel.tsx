import styles from "./styles.module.scss";

import { useFiltersStore } from "../../model/store/useFiltersStore";
import { TargetDbToggle } from "../../../../../../shared/ui/TargetDbToggle/TargetDbToggle";
import { useMedicalOrganizationsQuery } from "../../model/queries/useMedicalOrganizationsQuery";
import { useBillingPeriodsQuery } from "../../model/queries/useBillingPeriodsQuery";
import { useRControlWorkspaceStore } from "../../../workspace/model/store/useRControlWorkspaceStore";
import { MedToolsSelect } from "../../../../../../shared/ui/medTools/inputs/MedToolsSelect";

export const WorkspaceFilterPanel = () => {
  const {
    targetDb,
    selectedMedicalOrganization,
    selectedBillingYear,
    selectedBillingMonth,
    selectTargetDb,
    selectMedicalOrganization,
    selectBillingYear,
    selectBillingMonth,
  } = useFiltersStore();

  const {
    data: medicalOrganizations = [],
    isFetching: isMedicalOrganizationsFetching,
  } = useMedicalOrganizationsQuery(targetDb);

  const { data: billingPeriods = [], isFetching: isBillingPeriodsFetching } =
    useBillingPeriodsQuery(selectedMedicalOrganization, targetDb);

  const { setInvoicesTablePagination, selectInvoice } =
    useRControlWorkspaceStore();

  return (
    <section className={styles.filtersPanelRoot}>
      <div className={styles.sourceGroup}>
        <p className={styles.title}>Источник данных</p>
        <TargetDbToggle
          value={targetDb ?? ""}
          onChange={(
            _event: React.MouseEvent<HTMLElement>,
            newValue: string,
          ) => {
            if (newValue === "SMODB18" || newValue === "INOGOROD18") {
              selectTargetDb(newValue);
              setInvoicesTablePagination({ page: 0 });
              selectInvoice(null);
            }
          }}
        />
      </div>
      <div className={styles.actions}>
        <div className={styles.selectsGroup}>
          <MedToolsSelect
            label="Организация"
            value={selectedMedicalOrganization ?? ""}
            options={medicalOrganizations.map((entity) => ({
              label: entity.medicalOrganizationCode,
              value: entity.medicalOrganizationCode,
            }))}
            onChange={(newValue: string) => selectMedicalOrganization(newValue)}
            isLoading={isMedicalOrganizationsFetching}
          />

          <MedToolsSelect
            label="Год"
            value={selectedBillingYear?.toString() ?? ""}
            options={billingPeriods.map((period) => ({
              label: period.billingYear.toString(),
              value: period.billingYear.toString(),
            }))}
            onChange={(value: string) => {
              if (value !== null) {
                selectBillingYear(parseInt(value));
                setInvoicesTablePagination({ page: 0 });
                selectInvoice(null);
              }
            }}
            isLoading={isBillingPeriodsFetching}
          />

          <MedToolsSelect
            label="Месяц"
            value={selectedBillingMonth?.toString() ?? ""}
            options={(() => {
              const found = billingPeriods.find(
                (period) => period.billingYear === selectedBillingYear,
              );
              return (found?.billingMonths ?? []).map((month) => ({
                label: month.toString(),
                value: month.toString(),
              }));
            })()}
            onChange={(value: string) => {
              if (value !== null) {
                selectBillingMonth(parseInt(value));
                setInvoicesTablePagination({ page: 0 });
                selectInvoice(null);
              }
            }}
            isLoading={isBillingPeriodsFetching}
          />
        </div>
      </div>
    </section>
  );
};
