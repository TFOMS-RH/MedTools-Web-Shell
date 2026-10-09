import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewMedicalDevicesTableRoot } from "./medicalDevices/table/MedViewMedicalDevicesTableRoot";
import { MedViewProvidedServiceCardsGroupRoot } from "./providedServices/cardsGroup/MedViewProvidedServiceCardsGroupRoot";
import styles from "./styles.module.scss";

const MedViewProvidedServicesCategoryRoot = () => {
  const { selectedProvidedServiceUid, selectedMedicalCaseUid } =
    useMedViewWorkspaceStore();

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
          <MedViewProvidedServiceCardsGroupRoot />
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
          <MedViewMedicalDevicesTableRoot />
        )}
      </div>
    </section>
  );
};

export default MedViewProvidedServicesCategoryRoot;
