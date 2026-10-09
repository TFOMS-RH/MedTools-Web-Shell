import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewMedicalSanctionCardsGroupRoot } from "./medicalSanctions/cardsGroup/MedViewMedicalSanctionCardsGroupRoot";
import { MedViewDefectsTableRoot } from "./defects/table/MedViewDefectsTableRoot";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import styles from "./styles.module.scss";

const MedViewDefectsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewWorkspaceStore();

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
            <MedViewDefectsTableRoot />
            <MedViewMedicalSanctionCardsGroupRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewDefectsCategoryRoot;
