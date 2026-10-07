import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { RControlMedicalCaseDetailsCardRoot } from "./medicalCaseDetails/card/RControlMedicalCaseDetailsCardRoot";
import { CompletedCaseDetailsRoot } from "./completedCaseDetails/card/RControlCompletedCaseDetailsCardRoot";
import styles from "./styles.module.scss";

const RControlMedicalCaseDetailsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useWorkspaceStore();

  return (
    <section className={styles.medicalCaseDetailsRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных о деталях законченного и медицинского случаев"
            variant="waiting"
          />
        ) : (
          <div className={styles.medicalCaseDetailsGroup}>
            <RControlMedicalCaseDetailsCardRoot />
            <CompletedCaseDetailsRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default RControlMedicalCaseDetailsCategoryRoot;
