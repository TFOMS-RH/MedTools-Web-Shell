import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { RControlProvidedServiceCardsGroupRoot } from "./providedServices/cardsGroup/RControlProvidedServiceCardsGroupRoot";
import { RControlMedicalDevicesTableRoot } from "./medicalDevices/table/RControlMedicalDevicesTableRoot";
import styles from "./styles.module.scss";

const RControlProvidedServicesCategoryRoot = () => {
  const { selectedProvidedServiceUid, selectedMedicalCaseUid } =
    useWorkspaceStore();

  return (
    <section className={styles.providedServicesRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных об оказанных услугах"
            variant="waiting"
          />
        ) : (
          <RControlProvidedServiceCardsGroupRoot />
        )}
      </div>
      <Divider />
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={2}
          title="Данные по оказанной услуге"
          description="Все, что относится к оказанной услуге в рамках категории"
        />
        {selectedProvidedServiceUid === null ? (
          <DataState
            title="Выберите оказанную услугу"
            description="Нажмите на карточку оказанной услуги для отображения данных о медицинских изделиях"
            variant="waiting"
          />
        ) : (
          <RControlMedicalDevicesTableRoot />
        )}
      </div>
    </section>
  );
};

export default RControlProvidedServicesCategoryRoot;
