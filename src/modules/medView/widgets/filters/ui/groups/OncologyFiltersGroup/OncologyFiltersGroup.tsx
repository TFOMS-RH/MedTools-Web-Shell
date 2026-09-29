import { OncologyCaseFiltersSubgroup } from "./OncologyCaseFiltersSubgroup/OncologyCaseFiltersSubgroup";
import { OncologyServiceFiltersSubgroup } from "./OncologyServiceFiltersSubgroup/OncologyServiceFiltersSubgroup";
import { MedicationFiltersSubgroup } from "./OncologyMedicationFiltersSubgroup/MedicationFiltersSubgroup";
import styles from "./styles.module.scss";
import type { OncologyFiltersGroupDraft } from "../../../../workspace/model/types/FiltersDraft";

interface OncologyFiltersGroupProps {
  oncologyFiltersGroupDraft: OncologyFiltersGroupDraft;
  setOncologyFiltersGroupDraft: (
    oncologyFiltersGroupDraft: OncologyFiltersGroupDraft,
  ) => void;
}

const OncologyFiltersGroup = ({
  oncologyFiltersGroupDraft,
  setOncologyFiltersGroupDraft,
}: OncologyFiltersGroupProps) => {
  return (
    <section className={styles.oncologyFiltersGroup}>
      <header className={styles.oncologyFiltersGroupHeader}>
        <div className={styles.titleGroup}>
          <h2>Фильтрация по онкологии</h2>
          <p className={styles.description}>
            Все поля, которые относятся к онкологии
          </p>
        </div>
      </header>

      <OncologyCaseFiltersSubgroup
        oncologyCaseFiltersSubgroupDraft={
          oncologyFiltersGroupDraft.oncologyCase
        }
        setOncologyCaseFiltersSubgroupDraft={(oncologyCase) =>
          setOncologyFiltersGroupDraft({
            ...oncologyFiltersGroupDraft,
            oncologyCase: oncologyCase,
          })
        }
      />

      <OncologyServiceFiltersSubgroup
        oncologyServiceFiltersSubgroupDraft={
          oncologyFiltersGroupDraft.oncologyService
        }
        setOncologyServiceFiltersSubgroupDraft={(oncologyService) =>
          setOncologyFiltersGroupDraft({
            ...oncologyFiltersGroupDraft,
            oncologyService: oncologyService,
          })
        }
      />

      <MedicationFiltersSubgroup
        medicationFiltersSubgroupDraft={oncologyFiltersGroupDraft.medication}
        setMedicationFiltersSubgroupDraft={(medication) =>
          setOncologyFiltersGroupDraft({
            ...oncologyFiltersGroupDraft,
            medication: medication,
          })
        }
      />
    </section>
  );
};

export default OncologyFiltersGroup;
