import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../filters/model/stores/useMedViewFiltersStore";
import { useClinicalGroupQuery } from "../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useClinicalGroupQuery";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewClinicalGroupCardRoot } from "./clinicalGroup/card/MedViewClinicalGroupCardRoot";
import { MedViewHighTechMedicalCareCardRoot } from "./highTechMedicalCare/card/MedViewHighTechMedicalCareCardRoot";
import { MedViewTreatmentCoefficientsListRoot } from "./treatmentCoefficients/list/MedViewTreatmentCoefficientsListRoot";
import styles from "./styles.module.scss";
import { MedViewClassificationCriterionChipsGroupRoot } from "./сlassificationCriteria/chipsGroup/MedViewClassificationCriterionChipsGroupRoot";

const MedViewClinicalGroupsCategoryRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewWorkspaceStore();
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
            <MedViewClinicalGroupCardRoot />
            <MedViewHighTechMedicalCareCardRoot />
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
            <MedViewClassificationCriterionChipsGroupRoot
              clinicalGroupUid={clinicalGroupUid}
            />
            <MedViewTreatmentCoefficientsListRoot
              clinicalGroupUid={clinicalGroupUid}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewClinicalGroupsCategoryRoot;
