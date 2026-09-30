import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { MedicalCaseDetailsRoot } from "./medicalCaseDetails/MedViewMedicalCaseDetailsRoot/MedViewMedicalCaseDetailsRoot";
import { CompletedCaseDetailsRoot } from "./completedCaseDetails/MedViewCompletedCaseDetailsRoot/MedViewCompletedCaseDetailsRoot";
import { useMedViewStore } from "../../../../model/stores/useMedViewStore";
import styles from "./styles.module.scss";

const MedViewMedicalCaseDetailsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewStore();

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
            <MedicalCaseDetailsRoot />
            <CompletedCaseDetailsRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewMedicalCaseDetailsCategoryRoot;
