import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { MedViewProvidedServicesSection } from "./providedServices/MedViewProvidedServicesSection/MedViewProvidedServicesSection";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { useMedViewStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewMedicalDevicesRoot } from "./medicalDevices/MedViewMedicalDevicesRoot/MedViewMedicalDevicesRoot";
import styles from "./styles.module.scss";

const MedViewProvidedServicesCategoryRoot = () => {
  const { selectedProvidedServiceUid, selectedMedicalCaseUid } =
    useMedViewStore();

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
          <MedViewProvidedServicesSection />
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
          <MedViewMedicalDevicesRoot />
        )}
      </div>
    </section>
  );
};

export default MedViewProvidedServicesCategoryRoot;
