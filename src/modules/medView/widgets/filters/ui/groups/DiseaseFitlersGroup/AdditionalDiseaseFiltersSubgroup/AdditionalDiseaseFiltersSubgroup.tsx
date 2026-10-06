import type { AdditionalDiseaseFiltersGroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";
import { useState } from "react";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import styles from "../styles.module.scss";

interface AdditionalDiseaseFiltersSubgroupProps {
  additionalDiseaseFiltersSubgroupDraft: AdditionalDiseaseFiltersGroupDraft;
  setAdditionalDiseaseFiltersSubgroupDraft: (
    additionalDiseaseFiltersSubgroupDraft: AdditionalDiseaseFiltersGroupDraft,
  ) => void;
}

export const AdditionalDiseaseFiltersSubgroup = ({
  additionalDiseaseFiltersSubgroupDraft,
  setAdditionalDiseaseFiltersSubgroupDraft,
}: AdditionalDiseaseFiltersSubgroupProps) => {
  const [initialDiagnosesInputValue, setInitialDiagnosesInputValue] =
    useState("");
  const [concomitantDiagnosesInputValue, setConcomitantDiagnosesInputValue] =
    useState("");
  const [complicationDiagnosesInputValue, setComplicationDiagnosesInputValue] =
    useState("");

  const { data: initialDiagnosesOptions } = useAutocompleteFilterOptionsQuery(
    "/med-view/filter-options/diseases",
    initialDiagnosesInputValue,
  );

  const { data: concomitantDiagnosesOptions } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/diseases",
      concomitantDiagnosesInputValue,
    );

  const { data: complicationDiagnosesOptions } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/diseases",
      complicationDiagnosesInputValue,
    );

  return (
    <div className={styles.additionalDiseaseFiltersSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Дополнительные болезни</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Первичный диагноз"
            inputValue={initialDiagnosesInputValue}
            options={initialDiagnosesOptions ?? []}
            onInputChange={setInitialDiagnosesInputValue}
            values={additionalDiseaseFiltersSubgroupDraft.initialDiagnoses}
            onChange={(newValue: FilterOption[]) =>
              setAdditionalDiseaseFiltersSubgroupDraft({
                ...additionalDiseaseFiltersSubgroupDraft,
                initialDiagnoses: newValue,
              })
            }
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Диагноз осложнения заболевания"
            inputValue={complicationDiagnosesInputValue}
            options={complicationDiagnosesOptions ?? []}
            onInputChange={setComplicationDiagnosesInputValue}
            values={additionalDiseaseFiltersSubgroupDraft.complicationDiagnoses}
            onChange={(newValue: FilterOption[]) =>
              setAdditionalDiseaseFiltersSubgroupDraft({
                ...additionalDiseaseFiltersSubgroupDraft,
                complicationDiagnoses: newValue,
              })
            }
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Сопутствующие заболевания"
            inputValue={concomitantDiagnosesInputValue}
            options={concomitantDiagnosesOptions ?? []}
            onInputChange={setConcomitantDiagnosesInputValue}
            values={additionalDiseaseFiltersSubgroupDraft.concomitantDiagnoses}
            onChange={(newValue: FilterOption[]) =>
              setAdditionalDiseaseFiltersSubgroupDraft({
                ...additionalDiseaseFiltersSubgroupDraft,
                concomitantDiagnoses: newValue,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
