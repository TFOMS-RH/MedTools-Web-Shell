import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../model/stores/useMedViewStore";
import { useClinicalGroupQuery } from "../../../../../../../rControl/widgets/workspace/model/queries/categories/clinicalGroups/useClinicalGroupQuery";
import { MedViewClinicalGroupRoot } from "./clinicalGroup/MedViewClinicalGroupRoot/MedViewClinicalGroupRoot";
import { MedViewHighTechMedicalCareRoot } from "./highTechMedicalCare/MedViewHighTechMedicalCareRoot/MedViewHighTechMedicalCareRoot";
import { MedViewClassificationCriteriaRoot } from "./сlassificationCriteria/MedViewClassificationCriteriaRoot/MedViewClassificationCriteriaRoot";
import styles from "./styles.module.scss";
import { MedViewTreatmentComplexityCoefficientsRoot } from "./treatmentComplexityCoefficients/MedViewTreatmentComplexityCoefficientsRoot/MedViewTreatmentComplexityCoefficientsRoot";

const MedViewClinicalGroupsCategoryRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
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
            <MedViewClinicalGroupRoot />
            <MedViewHighTechMedicalCareRoot />
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
            <MedViewClassificationCriteriaRoot
              clinicalGroupUid={clinicalGroupUid}
            />
            <MedViewTreatmentComplexityCoefficientsRoot
              clinicalGroupUid={clinicalGroupUid}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewClinicalGroupsCategoryRoot;
