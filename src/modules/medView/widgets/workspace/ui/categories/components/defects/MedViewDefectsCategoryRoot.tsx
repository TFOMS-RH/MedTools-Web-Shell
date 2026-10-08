import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewDefectsRoot } from "./defects/MedViewDefectsRoot/MedViewDefectsRoot";
import { MedViewMedicalSanctionsSection } from "./medicalSanctions/MedViewMedicalSanctionsSection/MedViewMedicalSanctionsSection";
import styles from "./styles.module.scss";

const MedViewDefectsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewStore();

  return (
    <section className={styles.defectsRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных о дефектах и санкциях"
            variant="waiting"
          />
        ) : (
          <div className={styles.defectsGroup}>
            <MedViewDefectsRoot />
            <MedViewMedicalSanctionsSection />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewDefectsCategoryRoot;
