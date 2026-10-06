import { useState } from "react";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import styles from "../styles.module.scss";
import type { MedicationFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";

interface MedicationFiltersSubgroupProps {
  medicationFiltersSubgroupDraft: MedicationFiltersSubgroupDraft;
  setMedicationFiltersSubgroupDraft: (
    medicationFiltersSubgroupDraft: MedicationFiltersSubgroupDraft,
  ) => void;
}

export const MedicationFiltersSubgroup = ({
  medicationFiltersSubgroupDraft,
  setMedicationFiltersSubgroupDraft,
}: MedicationFiltersSubgroupProps) => {
  const [inputIdenitifierValue, setInputIdenitifierValue] = useState("");
  const [inputRegimenValue, setInputRegimenValue] = useState("");

  const { data: drugIdentifierFilterOptions, isPending } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/drug-identifiers",
      inputIdenitifierValue,
    );

  const { data: therapyRegimenFilterOptions } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/therapy-regimens",
      inputRegimenValue,
    );

  return (
    <div className={styles.medicationSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Лекарственный препарат</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span8}>
          <MedViewAutocompleteInput
            label="Идентификатор лекарственного препарата"
            values={medicationFiltersSubgroupDraft.drugIdentifiers}
            options={drugIdentifierFilterOptions ?? []}
            inputValue={inputIdenitifierValue}
            onInputChange={setInputIdenitifierValue}
            onChange={(newValue: FilterOption[]) =>
              setMedicationFiltersSubgroupDraft({
                ...medicationFiltersSubgroupDraft,
                drugIdentifiers: newValue,
              })
            }
            loading={isPending}
          />
        </div>

        <div className={styles.span4}>
          <MedViewAutocompleteInput
            label="Cхема лекарственной терапии"
            values={medicationFiltersSubgroupDraft.therapyRegimens}
            options={therapyRegimenFilterOptions ?? []}
            inputValue={inputRegimenValue}
            onInputChange={setInputRegimenValue}
            onChange={(newValue: FilterOption[]) =>
              setMedicationFiltersSubgroupDraft({
                ...medicationFiltersSubgroupDraft,
                therapyRegimens: newValue,
              })
            }
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};
