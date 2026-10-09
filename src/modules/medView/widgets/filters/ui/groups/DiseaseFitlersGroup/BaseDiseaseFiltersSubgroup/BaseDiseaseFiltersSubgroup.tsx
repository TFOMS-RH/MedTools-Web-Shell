import type { BaseDiseaseFiltersGroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";
import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import { useState } from "react";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import styles from "../styles.module.scss";

interface BaseDiseaseFiltersSubgroupProps {
  baseDiseaseFitlersSubgroupDraft: BaseDiseaseFiltersGroupDraft;
  setBaseDiseaseFitlersSubgroupDraft: (
    baseDiseaseFitlersSubgroupDraft: BaseDiseaseFiltersGroupDraft,
  ) => void;
}

export const BaseDiseaseFiltersSubgroup = ({
  baseDiseaseFitlersSubgroupDraft,
  setBaseDiseaseFitlersSubgroupDraft,
}: BaseDiseaseFiltersSubgroupProps) => {
  const [primaryDiagnosisInputValue, setPrimaryDiagnosisInputValue] =
    useState("");

  const { data: icdClassesFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/disease-classes",
    "icd-class",
  );

  const { data: icdSubClassesFilterOptions } = useFilterOptionsQuery(
    "med-tools/med-view/filter-options/disease-sub-classes",
    "icd-sub-class",
  );

  const { data: primaryDiagnosisFilterOptions } =
    useAutocompleteFilterOptionsQuery(
      "med-tools/med-view/filter-options/diseases",
      primaryDiagnosisInputValue,
    );

  return (
    <div className={styles.baseDiseaseFiltersSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Основное</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Основное заболевание"
            inputValue={primaryDiagnosisInputValue}
            options={primaryDiagnosisFilterOptions ?? []}
            values={baseDiseaseFitlersSubgroupDraft.primaryDiagnoses}
            onInputChange={setPrimaryDiagnosisInputValue}
            onChange={(newValue: FilterOption[]) =>
              setBaseDiseaseFitlersSubgroupDraft({
                ...baseDiseaseFitlersSubgroupDraft,
                primaryDiagnoses: newValue,
              })
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewMultipleSelectInput
            label="Классы МКБ"
            options={icdClassesFilterOptions ?? []}
            values={baseDiseaseFitlersSubgroupDraft.diagnosisClasses}
            onChange={(newValue: string[]) =>
              setBaseDiseaseFitlersSubgroupDraft({
                ...baseDiseaseFitlersSubgroupDraft,
                diagnosisClasses: newValue,
              })
            }
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewMultipleSelectInput
            label="Подклассы МКБ"
            options={icdSubClassesFilterOptions ?? []}
            values={baseDiseaseFitlersSubgroupDraft.diagnosisSubClasses}
            onChange={(newValue: string[]) =>
              setBaseDiseaseFitlersSubgroupDraft({
                ...baseDiseaseFitlersSubgroupDraft,
                diagnosisSubClasses: newValue,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
