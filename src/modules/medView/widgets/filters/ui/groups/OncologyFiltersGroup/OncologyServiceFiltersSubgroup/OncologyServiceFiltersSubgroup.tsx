import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import type { OncologyServiceFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import styles from "../styles.module.scss";

interface OncologyServiceFiltersSubgroupProps {
  oncologyServiceFiltersSubgroupDraft: OncologyServiceFiltersSubgroupDraft;
  setOncologyServiceFiltersSubgroupDraft: (
    oncologyServiceFiltersSubgroupDraft: OncologyServiceFiltersSubgroupDraft,
  ) => void;
}

export const OncologyServiceFiltersSubgroup = ({
  oncologyServiceFiltersSubgroupDraft,
  setOncologyServiceFiltersSubgroupDraft,
}: OncologyServiceFiltersSubgroupProps) => {
  const { data: oncologyServiceTypeFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/oncology-service-types",
    "oncology-service-type",
  );

  const { data: surgicalTreatmentTypeFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/surgical-treatment-types",
    "surgical-treatment-type",
  );

  const { data: radioTherapyTypeFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/radio-therapy-types",
    "radio-therapy-type",
  );

  const { data: drugTherapyLineFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/drug-therapy-lines",
    "drug-therapy-line",
  );

  const { data: drugTherapyCycleFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/drug-therapy-cycles",
    "drug-therapy-cycle",
  );

  return (
    <div className={styles.oncologyServiceSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Онкологическая услуга</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewMultipleSelectInput
            label="Тип хирургического лечения"
            values={oncologyServiceFiltersSubgroupDraft.surgicalTreatmentTypes}
            onChange={(newValue: string[]) =>
              setOncologyServiceFiltersSubgroupDraft({
                ...oncologyServiceFiltersSubgroupDraft,
                surgicalTreatmentTypes: newValue,
              })
            }
            options={
              surgicalTreatmentTypeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Тип услуги"
            values={oncologyServiceFiltersSubgroupDraft.serviceTypes}
            onChange={(newValue: string[]) =>
              setOncologyServiceFiltersSubgroupDraft({
                ...oncologyServiceFiltersSubgroupDraft,
                serviceTypes: newValue,
              })
            }
            options={
              oncologyServiceTypeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>

        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Тип лучевой терапии"
            values={oncologyServiceFiltersSubgroupDraft.radioTherapyTypes}
            onChange={(newValue: string[]) =>
              setOncologyServiceFiltersSubgroupDraft({
                ...oncologyServiceFiltersSubgroupDraft,
                radioTherapyTypes: newValue,
              })
            }
            options={
              radioTherapyTypeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Линия лекарственной терапии"
            values={oncologyServiceFiltersSubgroupDraft.drugTherapyLines}
            onChange={(newValue: string[]) =>
              setOncologyServiceFiltersSubgroupDraft({
                ...oncologyServiceFiltersSubgroupDraft,
                drugTherapyLines: newValue,
              })
            }
            options={
              drugTherapyLineFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Цикл лекарственной терапии"
            values={oncologyServiceFiltersSubgroupDraft.drugTherapyCycles}
            onChange={(newValue: string[]) =>
              setOncologyServiceFiltersSubgroupDraft({
                ...oncologyServiceFiltersSubgroupDraft,
                drugTherapyCycles: newValue,
              })
            }
            options={
              drugTherapyCycleFilterOptions?.map((option) => ({
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
