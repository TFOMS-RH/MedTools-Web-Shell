import type { Dayjs } from "dayjs";
import { MedViewDateInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDateInput/MedViewDateInput";
import { MedViewDefaultInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDefaultInput/MedViewDefaultInput";
import { MedViewSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewSelectInput/MedViewSelectInput";
import styles from "../styles.module.scss";
import type { RepresentativeFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import type { Sex } from "../../../../../workspace/model/types/Sex";

interface RepresentativeFiltersSubgroupProps {
  representativeFiltersSubgroupDraft: RepresentativeFiltersSubgroupDraft;
  setRepresentativeFiltersSubgroupDraft: (
    representativeFilters: RepresentativeFiltersSubgroupDraft,
  ) => void;
}

export const RepresentativeFiltersSubgroup = ({
  representativeFiltersSubgroupDraft,
  setRepresentativeFiltersSubgroupDraft,
}: RepresentativeFiltersSubgroupProps) => {
  return (
    <div className={styles.representativeSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Представитель</h3>
      </header>

      <div className={styles.groupLineGrid}>
        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Фамилия"
            placeholder="Иванов"
            value={representativeFiltersSubgroupDraft.lastName}
            handleInputChange={(newValue: string) =>
              setRepresentativeFiltersSubgroupDraft({
                ...representativeFiltersSubgroupDraft,
                lastName: newValue,
              })
            }
          />
        </div>
        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Имя"
            placeholder="Иван"
            value={representativeFiltersSubgroupDraft.firstName}
            handleInputChange={(newValue: string) =>
              setRepresentativeFiltersSubgroupDraft({
                ...representativeFiltersSubgroupDraft,
                firstName: newValue,
              })
            }
          />
        </div>
        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Отчество"
            placeholder="Иванович"
            value={representativeFiltersSubgroupDraft.middleName}
            handleInputChange={(newValue: string) =>
              setRepresentativeFiltersSubgroupDraft({
                ...representativeFiltersSubgroupDraft,
                middleName: newValue,
              })
            }
          />
        </div>
      </div>

      <div className={styles.groupLineGrid}>
        <div className={styles.span2}>
          <MedViewDateInput
            label="Дата рождения"
            value={representativeFiltersSubgroupDraft.birthDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setRepresentativeFiltersSubgroupDraft({
                ...representativeFiltersSubgroupDraft,
                birthDate: newValue,
              })
            }
          />
        </div>

        <div className={styles.span2}>
          <MedViewSelectInput
            label="Пол"
            value={representativeFiltersSubgroupDraft.sex ?? ""}
            onChange={(newValue: Sex | null) =>
              setRepresentativeFiltersSubgroupDraft({
                ...representativeFiltersSubgroupDraft,
                sex: newValue,
              })
            }
            options={[
              { label: "Мужской", value: "male" },
              { label: "Женский", value: "female" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
