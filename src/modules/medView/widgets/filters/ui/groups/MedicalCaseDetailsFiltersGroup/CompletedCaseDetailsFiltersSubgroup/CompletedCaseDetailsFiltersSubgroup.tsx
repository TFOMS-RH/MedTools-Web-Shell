import type { Dayjs } from "dayjs";
import { MedViewDateInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDateInput/MedViewDateInput";
import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import styles from "../styles.module.scss";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import type { CompletedCaseDetailsFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useMedicalOrganizationFilterOptionsQuery } from "../../../../model/queries/useMedicalOrganizationFilterOptions";

interface CompletedCaseDetailsFiltersSubgroupProps {
  completedCaseDetailsFiltersSubgroupDraft: CompletedCaseDetailsFiltersSubgroupDraft;
  setCompletedCaseDetailsFiltersSubgroupDraft: (
    completedCaseDetailsFiltersSubgroupDraft: CompletedCaseDetailsFiltersSubgroupDraft,
  ) => void;
}

export const CompletedCaseDetailsFiltersSubgroup = ({
  completedCaseDetailsFiltersSubgroupDraft,
  setCompletedCaseDetailsFiltersSubgroupDraft,
}: CompletedCaseDetailsFiltersSubgroupProps) => {
  const { data: careConditionFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/care-conditions",
    "care-condition",
  );

  const { data: medicalCareTypeFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/medical-care-types",
    "medical-care-type",
  );

  const { data: medicalCareFormFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/medical-care-forms",
    "medical-care-form",
  );

  const { data: medicalOrgsInCompletedCaseFilterOptions } =
    useMedicalOrganizationFilterOptionsQuery(
      "/med-view/filter-options/medical-organizations",
      "medical-organization",
      "SMODB18",
      "CompletedCaseMedicalOrgs",
    );

  const { data: referringMedicalOrgsInCompletedCaseFilterOptions } =
    useMedicalOrganizationFilterOptionsQuery(
      "/med-view/filter-options/medical-organizations",
      "medical-organization",
      "SMODB18",
      "ReferralMedicalOrgs",
    );

  const { data: diseaseOutcomeFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/disease-outcomes",
    "disease-outcome",
  );

  const { data: screeningResultFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/screening-results",
    "screening-result",
  );

  const { data: hospitalizationOutcomeFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/hospitalization-outcomes",
    "hospitalization-outcome",
  );

  const { data: paymentMethodFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/payment-methods",
    "payment-method",
  );

  return (
    <div className={styles.medicalCaseDetailsSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Детали законченного случая</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Условия оказания медицинской помощи"
            values={completedCaseDetailsFiltersSubgroupDraft.careConditions}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                careConditions: newValue,
              })
            }
            options={
              careConditionFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>

        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Форма оказания медицинской помощи"
            values={completedCaseDetailsFiltersSubgroupDraft.careForms}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                careForms: newValue,
              })
            }
            options={
              medicalCareFormFilterOptions?.map((option) => ({
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
            label="Вид медицинской помощи"
            values={completedCaseDetailsFiltersSubgroupDraft.medicalCareTypes}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                medicalCareTypes: newValue,
              })
            }
            options={
              medicalCareTypeFilterOptions?.map((option) => ({
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
            label="Медицинская организация"
            values={
              completedCaseDetailsFiltersSubgroupDraft.medicalOrganizations
            }
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                medicalOrganizations: newValue,
              })
            }
            options={
              medicalOrgsInCompletedCaseFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>

        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Направившая медицинская организация"
            values={
              completedCaseDetailsFiltersSubgroupDraft.referringMedicalOrganizations
            }
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                referringMedicalOrganizations: newValue,
              })
            }
            options={
              referringMedicalOrgsInCompletedCaseFilterOptions?.map(
                (option) => ({
                  label: option.label,
                  value: option.value,
                }),
              ) ?? []
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span3}>
          <MedViewDateInput
            value={completedCaseDetailsFiltersSubgroupDraft.treatmentStartDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                treatmentStartDate: newValue,
              })
            }
            label="Начало лечения"
          />
        </div>

        <div className={styles.span3}>
          <MedViewDateInput
            value={completedCaseDetailsFiltersSubgroupDraft.treatmentEndDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                treatmentEndDate: newValue,
              })
            }
            label="Окончание лечения"
          />
        </div>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Исход заболевания"
            values={completedCaseDetailsFiltersSubgroupDraft.diseaseOutcomes}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                diseaseOutcomes: newValue,
              })
            }
            options={
              diseaseOutcomeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span4}>
          <MedViewMultipleSelectInput
            label="Результат диспансеризации"
            values={completedCaseDetailsFiltersSubgroupDraft.screeningResults}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                screeningResults: newValue,
              })
            }
            options={
              screeningResultFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
        <div className={styles.span4}>
          <MedViewMultipleSelectInput
            label="Результат обращения / госпитализации"
            values={
              completedCaseDetailsFiltersSubgroupDraft.hospitalizationOutcomes
            }
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                hospitalizationOutcomes: newValue,
              })
            }
            options={
              hospitalizationOutcomeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
        <div className={styles.span4}>
          <MedViewMultipleSelectInput
            label="Код способа оплаты"
            values={completedCaseDetailsFiltersSubgroupDraft.paymentMethods}
            onChange={(newValue: string[]) =>
              setCompletedCaseDetailsFiltersSubgroupDraft({
                ...completedCaseDetailsFiltersSubgroupDraft,
                paymentMethods: newValue,
              })
            }
            options={
              paymentMethodFilterOptions?.map((option) => ({
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
