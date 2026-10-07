import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useRControlWorkspaceStore } from "../../../../model/store/useRControlWorkspaceStore";
import { useRControlWorkspacePanelStore } from "../../../../model/store/useRControlWorkspacePanelStore";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { useClinicalGroupQuery } from "../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useClinicalGroupQuery";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { RControlClassificationCriterionChipsGroupRoot } from "./сlassificationCriteria/chipsGroup/RControlClassificationCriterionChipsGroupRoot";
import { RControlTreatmentCoefficientsListRoot } from "./treatmentCoefficients/list/RControlTreatmentCoefficientsListRoot";
import { RControlHighTechMedicalCareCardRoot } from "./highTechMedicalCare/card/RControlHighTechMedicalCareCardRoot";
import { RControlClinicalGroupCardRoot } from "./clinicalGroup/card/RControlClinicalGroupCardRoot";
import styles from "./styles.module.scss";

const ClinicalGroupsCategoryRoot = () => {
  const { targetDb } = useRControlWorkspacePanelStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
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
            <RControlClinicalGroupCardRoot />
            <RControlHighTechMedicalCareCardRoot />
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
            <RControlClassificationCriterionChipsGroupRoot
              clinicalGroupUid={clinicalGroupUid}
            />
            <RControlTreatmentCoefficientsListRoot
              clinicalGroupUid={clinicalGroupUid}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ClinicalGroupsCategoryRoot;
