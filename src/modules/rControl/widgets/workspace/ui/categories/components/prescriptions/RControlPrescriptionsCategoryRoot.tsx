import { RControlReferralsTableRoot } from "./referrals/table/RControlReferralsTableRoot";
import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import styles from "./styles.module.scss";

const RControlPrescriptionsCategoryRoot = () => {
  const { selectedMedicalCaseUid } = useWorkspaceStore();

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
            <RControlPrescriptionsCategoryRoot />
            <RControlReferralsTableRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default RControlPrescriptionsCategoryRoot;
