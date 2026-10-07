import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useRControlWorkspaceStore } from "../../../../model/store/useRControlWorkspaceStore";
import { RControlInsuranceCardRoot } from "./insurance/card/RControlInsuranceCardRoot";
import { RControlPatientCardRoot } from "./patient/card/RControlPatientCardRoot";
import styles from "./styles.module.scss";

const RControlPatientCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();

  return (
    <section className={styles.patientCategoryRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных о пациенте и СМО"
            variant="waiting"
          />
        ) : (
          <div className={styles.patientInsuranceGroup}>
            <RControlPatientCardRoot />
            <RControlInsuranceCardRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default RControlPatientCategoryRoot;
