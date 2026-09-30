import type { Dayjs } from "dayjs";
import { MedViewDateInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDateInput/MedViewDateInput";
import { MedViewMultipleSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewMultipleSelectInput/MedViewMultipleSelectInput";
import { MedViewAutocompleteInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewAutocompleteInput/MedViewAutocompleteInput";
import { useState } from "react";
import styles from "../styles.module.scss";
import { useFilterOptionsQuery } from "../../../../model/queries/useFilterOptionsQuery";
import type { ReferralFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import { useAutocompleteFilterOptionsQuery } from "../../../../model/queries/useAutocompleteFilterOptionsQuery";
import { useMedicalOrganizationFilterOptionsQuery } from "../../../../model/queries/useMedicalOrganizationFilterOptions";
import type { FilterOption } from "../../../../../workspace/model/types/FilterOptions";

interface ReferralFiltersSubgroupProps {
  referralsFiltersSubgroupDraft: ReferralFiltersSubgroupDraft;
  setReferralsFiltersSubgroupDraft: (
    referralsFiltersSubgroupDraft: ReferralFiltersSubgroupDraft,
  ) => void;
}

export const ReferralFiltersSubgroup = ({
  referralsFiltersSubgroupDraft,
  setReferralsFiltersSubgroupDraft,
}: ReferralFiltersSubgroupProps) => {
  const [inputServiceValue, setInputServiceValue] = useState("");

  const { data: referralTypeFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/referral-types",
    "referral-type",
  );

  const { data: diagnosticMethodFilterOptions } = useFilterOptionsQuery(
    "/med-view/filter-options/diagnostic-methods",
    "diagnostic-method",
  );

  const { data: referralMedicalOrganizationFilterOptions } =
    useMedicalOrganizationFilterOptionsQuery(
      "/med-view/filter-options/medical-organizations",
      "medical-organization",
      "SMODB18",
      "ReferralMedicalOrgs",
    );

  const { data: medicalServiceFilterOptions, isPending } =
    useAutocompleteFilterOptionsQuery(
      "/med-view/filter-options/medical-services",
      inputServiceValue,
    );

  return (
    <div className={styles.referralSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Направления</h3>
      </header>
      <div className={styles.groupLineGrid}>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Вид направления"
            values={referralsFiltersSubgroupDraft.refferalTypes}
            onChange={(newValue: string[]) =>
              setReferralsFiltersSubgroupDraft({
                ...referralsFiltersSubgroupDraft,
                refferalTypes: newValue,
              })
            }
            options={
              referralTypeFilterOptions?.map((option) => ({
                label: option.label,
                value: option.value,
              })) ?? []
            }
          />
        </div>
        <div className={styles.span6}>
          <MedViewMultipleSelectInput
            label="Метод  диагностического исследования"
            values={referralsFiltersSubgroupDraft.diagnosticMethods}
            onChange={(newValue: string[]) =>
              setReferralsFiltersSubgroupDraft({
                ...referralsFiltersSubgroupDraft,
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
            value={referralsFiltersSubgroupDraft.referralDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setReferralsFiltersSubgroupDraft({
                ...referralsFiltersSubgroupDraft,
                referralDate: newValue,
              })
            }
          />
        </div>
        <div className={styles.span9}>
          <MedViewMultipleSelectInput
            label="МО направления"
            values={
              referralsFiltersSubgroupDraft.referredToMedicalOrganizations
            }
            onChange={(newValue: string[]) =>
              setReferralsFiltersSubgroupDraft({
                ...referralsFiltersSubgroupDraft,
                referredToMedicalOrganizations: newValue,
              })
            }
            options={
              referralMedicalOrganizationFilterOptions?.map((option) => ({
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
            values={referralsFiltersSubgroupDraft.referredServices}
            options={medicalServiceFilterOptions ?? []}
            inputValue={inputServiceValue}
            onInputChange={setInputServiceValue}
            onChange={(newValue: FilterOption[]) =>
              setReferralsFiltersSubgroupDraft({
                ...referralsFiltersSubgroupDraft,
                referredServices: newValue,
              })
            }
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};
