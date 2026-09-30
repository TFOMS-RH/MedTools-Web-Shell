import type { Dayjs } from "dayjs";
import { MedViewDateInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDateInput/MedViewDateInput";
import { MedViewDefaultInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewDefaultInput/MedViewDefaultInput";
import { MedViewSelectInput } from "../../../../../../../../shared/ui/medView/inputs/MedViewSelectInput/MedViewSelectInput";
import styles from "../styles.module.scss";
import type { PatientFiltersSubgroupDraft } from "../../../../../workspace/model/types/FiltersDraft";
import type { Sex } from "../../../../../workspace/model/types/Sex";

interface PatientFiltersSubgroupProps {
  patientFiltersSubgroupDraft: PatientFiltersSubgroupDraft;
  setPatientFiltersSubgroupDraft: (
    patientFilters: PatientFiltersSubgroupDraft,
  ) => void;
}

export const PatientFiltersSubgroup = ({
  patientFiltersSubgroupDraft,
  setPatientFiltersSubgroupDraft,
}: PatientFiltersSubgroupProps) => {
  return (
    <div className={styles.patientSubgroup}>
      <header className={styles.subgroupHeader}>
        <h3>Пациент</h3>
      </header>

      <div className={styles.groupLineGrid}>
        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Фамилия"
            placeholder="Иванов"
            value={patientFiltersSubgroupDraft.lastName}
            handleInputChange={(newValue: string) =>
              setPatientFiltersSubgroupDraft({
                ...patientFiltersSubgroupDraft,
                lastName: newValue,
              })
            }
          />
        </div>

        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Имя"
            placeholder="Иван"
            value={patientFiltersSubgroupDraft.firstName}
            handleInputChange={(newValue: string) =>
              setPatientFiltersSubgroupDraft({
                ...patientFiltersSubgroupDraft,
                firstName: newValue,
              })
            }
          />
        </div>

        <div className={styles.span4}>
          <MedViewDefaultInput
            label="Отчество"
            placeholder="Иванович"
            value={patientFiltersSubgroupDraft.middleName}
            handleInputChange={(newValue: string) =>
              setPatientFiltersSubgroupDraft({
                ...patientFiltersSubgroupDraft,
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
            value={patientFiltersSubgroupDraft.birthDate}
            handleDateInputChange={(newValue: Dayjs | null) =>
              setPatientFiltersSubgroupDraft({
                ...patientFiltersSubgroupDraft,
                birthDate: newValue,
              })
            }
          />
        </div>

        <div className={styles.span2}>
          <MedViewSelectInput
            label="Пол"
            value={patientFiltersSubgroupDraft.sex ?? ""}
            onChange={(newValue: Sex | null) =>
              setPatientFiltersSubgroupDraft({
                ...patientFiltersSubgroupDraft,
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
