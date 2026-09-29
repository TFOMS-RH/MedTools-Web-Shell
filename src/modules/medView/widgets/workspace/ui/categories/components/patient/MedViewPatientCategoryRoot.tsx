import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewStore } from "../../../../model/stores/useMedViewStore";
import { InsuranceRoot } from "./insurance/InsuranceRoot/InsuranceRoot";
import { PatientRoot } from "./patient/PatientRoot/PatientRoot";
import styles from "./styles.module.scss";

const Patient = () => {
  const { selectedMedicalCaseUid } = useMedViewStore();

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
            <PatientRoot />
            <InsuranceRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default Patient;
