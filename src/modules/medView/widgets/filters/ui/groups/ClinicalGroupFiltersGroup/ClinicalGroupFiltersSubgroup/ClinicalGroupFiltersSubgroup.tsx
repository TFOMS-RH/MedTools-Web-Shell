import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import styles from "../styles.module.scss";
import { useState } from "react";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import type { ClinicalGroupsFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";

interface ClinicalGroupFiltersSubgroupProps {
  clinicalGroupFiltersSubgroupDraft: ClinicalGroupsFiltersSubgroupDraft;
  setClinicalGroupFiltersSubgroupDraft: (
    clinicalGroupFiltersSubgroupDraft: ClinicalGroupsFiltersSubgroupDraft,
  ) => void;
}

export const ClinicalGroupFiltersSubgroup = ({
  clinicalGroupFiltersSubgroupDraft,
  setClinicalGroupFiltersSubgroupDraft,
}: ClinicalGroupFiltersSubgroupProps) => {
  const [
    inputCLinicalStatisticGroupValue,
    setInputCLinicalStatisticGroupValue,
  ] = useState("");

  const { data: complexityCoefficientFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/complexity-coefficients",
    "complexity-coefficient",
  );

  const { data: interruptedCasePaymentReason } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/interrupted-case-payment-reasons",
    "interrupted-case-payment-reason",
  );

  const { data: clinicalStatisticGroupFilterOptions, isPending } =
    useAutocompleteFilterOptionsQuery(
      "med-tools/med-view/filter-options/clinical-groups",
      inputCLinicalStatisticGroupValue,
    );

  return (
    <div className={styles.clinicalGroupFiltersSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>КСГ</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Номер КСГ"
            values={
              clinicalGroupFiltersSubgroupDraft.clinicalStatisticGroupNumbers
            }
            options={clinicalStatisticGroupFilterOptions ?? []}
            inputValue={inputCLinicalStatisticGroupValue}
            onInputChange={setInputCLinicalStatisticGroupValue}
            onChange={(newValue: FilterOption[]) =>
              setClinicalGroupFiltersSubgroupDraft({
                ...clinicalGroupFiltersSubgroupDraft,
                clinicalStatisticGroupNumbers: newValue,
              })
            }
            loading={isPending}
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewMultipleSelectInput
            label="Номер КСЛП"
            values={
              clinicalGroupFiltersSubgroupDraft.complexityCoefficientNumbers
            }
            onChange={(newValue: string[]) =>
              setClinicalGroupFiltersSubgroupDraft({
                ...clinicalGroupFiltersSubgroupDraft,
                complexityCoefficientNumbers: newValue,
              })
            }
            options={
              complexityCoefficientFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewMultipleSelectInput
            label="Причина оплаты за прерванный случай"
            values={
              clinicalGroupFiltersSubgroupDraft.interruptedCasePaymentReasons
            }
            onChange={(newValue: string[]) =>
              setClinicalGroupFiltersSubgroupDraft({
                ...clinicalGroupFiltersSubgroupDraft,
                interruptedCasePaymentReasons: newValue,
              })
            }
            options={
              interruptedCasePaymentReason?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>
    </div>
  );
};
