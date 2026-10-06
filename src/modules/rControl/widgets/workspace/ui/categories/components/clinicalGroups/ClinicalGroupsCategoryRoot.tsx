import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { useFiltersStore } from "../../../../../filters/model/store/useFiltersStore";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { ClinicalGroupRoot } from "./clinicalGroup/ClinicalGroupRoot/ClinicalGroupRoot";
import { useClinicalGroupQuery } from "../../../../model/queries/categories/clinicalGroups/useClinicalGroupQuery";
import { HighTechMedicalCareRoot } from "./highTechMedicalCare/HighTechMedicalCareRoot/HighTechMedicalCareRoot";
import { ClassificationCriteriaRoot } from "./сlassificationCriteria/ClassificationCriteriaRoot/ClassificationCriteriaRoot";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import styles from "./styles.module.scss";
import { TreatmentComplexityCoefficientsRoot } from "./treatmentComplexityCoefficients/TreatmentComplexityCoefficientsRoot/TreatmentComplexityCoefficientsRoot";

const ClinicalGroupsCategoryRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useWorkspaceStore();
  const { data: clinicalGroup } = useClinicalGroupQuery(
    selectedMedicalCaseUid,
    targetDb,
  );

  const clinicalGroupUid = clinicalGroup?.clinicalGroupUid ?? null;

  return (
    <section className={styles.clinicalGroupsRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных о КСГ/КПГ и ВМП"
            variant="waiting"
          />
        ) : (
          <div className={styles.twoGridLine}>
            <ClinicalGroupRoot />
            <HighTechMedicalCareRoot />
          </div>
        )}
      </div>
      <Divider />
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={2}
          title="Данные по клинической группе"
          description="Все, что относится к клинической группе в рамках категории"
        />
        {clinicalGroupUid === null ? (
          <DataState
            title="Получение клинической группы"
            description="После получения данных станут доступны классификационные критерии и КСЛП"
            variant="waiting"
          />
        ) : (
          <div className={styles.classificationCriteriaGroup}>
            <ClassificationCriteriaRoot clinicalGroupUid={clinicalGroupUid} />
            <TreatmentComplexityCoefficientsRoot
              clinicalGroupUid={clinicalGroupUid}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ClinicalGroupsCategoryRoot;
