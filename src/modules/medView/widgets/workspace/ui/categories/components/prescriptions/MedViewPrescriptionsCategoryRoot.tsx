import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewPrescriptionsSection } from "./prescriptions/MedViewPrescriptionsSection/MedViewPrescriptionsSection";
import { MedViewReferralsRoot } from "./referrals/MedViewReferralsRoot/MedViewReferralsRoot";
import styles from "./styles.module.scss";

const MedViewPrescriptionsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewStore();

  return (
    <section className={styles.prescriptionsRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных о назначениях и направлениях"
            variant="waiting"
          />
        ) : (
          <div className={styles.prescriptionsGroup}>
            <MedViewPrescriptionsSection />
            <MedViewReferralsRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewPrescriptionsCategoryRoot;
