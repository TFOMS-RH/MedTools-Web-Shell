import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewPrescriptionCardsGroupRoot } from "./prescriptions/cardsGroup/MedViewPrescriptionCardsGroupRoot";
import { MedViewReferralsTableRoot } from "./referrals/table/MedViewReferralsTableRoot";
import styles from "./styles.module.scss";

const MedViewPrescriptionsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useMedViewWorkspaceStore();

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
            <MedViewPrescriptionCardsGroupRoot />
            <MedViewReferralsTableRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewPrescriptionsCategoryRoot;
