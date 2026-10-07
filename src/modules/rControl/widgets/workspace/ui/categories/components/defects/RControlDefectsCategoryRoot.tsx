import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { RControlMedicalSanctionCardsGroupRoot } from "./medicalSanctions/cardsGroup/RControlMedicalSanctionCardsGroupRoot";
import { RControlDefectsTableRoot } from "./defects/table/RControlDefectsTableRoot";
import styles from "./styles.module.scss";

const RControlDefectsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useWorkspaceStore();

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
            <RControlDefectsTableRoot />
            <RControlMedicalSanctionCardsGroupRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default RControlDefectsCategoryRoot;
