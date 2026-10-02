import type { Dayjs } from "dayjs";
import { useState } from "react";
import { MedViewDateInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDateInput/MedViewDateInput";
import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import styles from "../styles.module.scss";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import type { PrescriptionFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";
import { useMedicalOrganizationFilterOptionsQuery } from "../../../../model/queries/useMedicalOrganizationFilterOptions";

interface PrescriptionFiltersSubgroupProps {
  prescriptionFiltersSubgroup: PrescriptionFiltersSubgroupDraft;
  setPrescriptionFiltersSubgroup: (
    prescriptionFiltersSubgroup: PrescriptionFiltersSubgroupDraft,
  ) => void;
}

export const PrescriptionFiltersSubgroup = ({
  prescriptionFiltersSubgroup,
  setPrescriptionFiltersSubgroup,
}: PrescriptionFiltersSubgroupProps) => {
  const [inputServiceValue, setInputServiceValue] = useState("");

  const { data: diagnosticMethodFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/diagnostic-methods",
    "diagnostic-method",
  );

  const { data: referredToMedicalOrganizationFilterOptions } =
    useMedicalOrganizationFilterOptionsQuery(
      "/med-view/filter-options/medical-organizations",
      "medical-organization",
      "SMODB18",
      "PrescriptionReferredToMedicalOrgs",
    );

  const { data: medicalCareFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/medical-care-profiles",
    "medical-care-profile",
  );

  const { data: bedProfileFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/bed-profiles",
    "bed-profile",
  );

  const { data: medicalServiceFilterOptions, isPending } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/medical-services",
      inputServiceValue,
    );

  return (
    <div className={styles.prescriptionSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Назначения</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Вид назначения"
            values={prescriptionFiltersSubgroup.prescriptionTypes}
            onChange={(newValue: string[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                prescriptionTypes: newValue,
              })
            }
            options={[
              {
                label:
                  "Направлен на консультацию в медицинскую организацию по месту прикрепления",
                value: "1",
              },
              {
                label:
                  "Направлен на консультацию в иную медицинскую организацию",
                value: "2",
              },
              {
                label: "Направлен на обследование",
                value: "3",
              },
              {
                label: "Направлен в дневной стационар",
                value: "4",
              },
              {
                label: "Направлен на госпитализацию",
                value: "5",
              },
              {
                label: "Направлен в реабилитационное отделение",
                value: "6",
              },
            ]}
          />
        </div>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Метод  диагностического исследования"
            values={prescriptionFiltersSubgroup.diagnosticMethods}
            onChange={(newValue: string[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                diagnosticMethods: newValue,
              })
            }
            options={
              diagnosticMethodFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span3}>
          <MedViewDateInput
            label="Дата направления"
            value={prescriptionFiltersSubgroup.referralDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                referralDate: newValue,
              })
            }
          />
        </div>
        <div className={styles.span9}>
          <MedViewMultipleSelectInput
            label="МО направления"
            values={prescriptionFiltersSubgroup.referredToMedicalOrganizations}
            onChange={(newValue: string[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                referredToMedicalOrganizations: newValue,
              })
            }
            options={
              referredToMedicalOrganizationFilterOptions?.map((option) => ({
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
            label="Профиль медицинской помощи"
            values={prescriptionFiltersSubgroup.medicalCareProfiles}
            onChange={(newValue: string[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                medicalCareProfiles: newValue,
              })
            }
            options={
              medicalCareFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Профиль койки"
            values={prescriptionFiltersSubgroup.bedProfiles}
            onChange={(newValue: string[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                bedProfiles: newValue,
              })
            }
            options={
              bedProfileFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>
      <div className={styles.groupLineGrid}>
        <div className={styles.span12}>
          <MedViewAutocompleteInput
            label="Услуги, указанные в направлении"
            values={prescriptionFiltersSubgroup.services}
            options={medicalServiceFilterOptions ?? []}
            inputValue={inputServiceValue}
            onInputChange={setInputServiceValue}
            onChange={(newValue: FilterOption[]) =>
              setPrescriptionFiltersSubgroup({
                ...prescriptionFiltersSubgroup,
                services: newValue,
              })
            }
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};
