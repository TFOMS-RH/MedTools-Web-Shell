import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewCompletedCaseDetailsCardRoot } from "./completedCaseDetails/card/MedViewCompletedCaseDetailsCardRoot";
import { MedViewMedicalCaseDetailsCardRoot } from "./medicalCaseDetails/card/MedViewMedicalCaseDetailsCardRoot";
import styles from "./styles.module.scss";

const MedViewMedicalCaseDetailsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewWorkspaceStore();

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
            <MedViewMedicalCaseDetailsCardRoot />
            <MedViewCompletedCaseDetailsCardRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewMedicalCaseDetailsCategoryRoot;
