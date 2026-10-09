import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useMedViewFiltersStore } from "../../../../../filters/model/stores/useMedViewFiltersStore";
import { useOncologyCaseQuery } from "../../../../../../../../shared/model/queries/invoiceStructure/oncology/useOncologyCaseQuery";
import { useMedViewWorkspaceStore } from "../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewDiagnosticsListRoot } from "./diagnostics/list/MedViewDiagnosticsListRoot";
import { MedViewContraindicationsListRoot } from "./contraindications/list/MedViewContraindicationsListRoot";
import { MedViewConsultationsListRoot } from "./сonsultations/list/MedViewConsultationsListRoot";
import { MedViewInjectionDateChipsGroupRoot } from "./injections/injectionDates/chipsGroup/MedViewInjectionDateChipsGroupRoot";
import { MedViewInjectionsTableRoot } from "./injections/injections/table/MedViewInjectionsTableRoot";
import { MedViewMedicationCardsGroupRoot } from "./medications/cardsGroup/MedViewMedicationCardsGroupRoot";
import { MedViewOncologyCaseCardRoot } from "./oncologyCase/card/MedViewOncologyCaseCardRoot";
import { MedViewOncologyServiceCardsGroupRoot } from "./oncologyServices/cardsGroup/MedViewOncologyServiceCardsGroupRoot";
import styles from "./styles.module.scss";

const MedViewOncologyRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    selectedMedicalCaseUid,
    selectedOncologyServiceUid,
    selectedMedicationUid,
    selectOncologyService,
  } = useMedViewWorkspaceStore();
  const { data: oncologyCase } = useOncologyCaseQuery(
    selectedMedicalCaseUid,
    targetDb,
  );

  const oncologyCaseUid = oncologyCase?.oncologyCaseUid ?? null;

  return (
    <section className={styles.oncologyRoot}>
      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={1}
          title="Данные по медицинскому случаю"
          description="Все, что относится к медицинскому случаю в рамках категории"
        />
        {selectedMedicalCaseUid === null ? (
          <DataState
            title="Выберите медицинский случай"
            description="Нажмите на карточку медицинского случая для отображения данных об онкологическом случае и проведенных консилиумах"
            variant="waiting"
          />
        ) : (
          <div className={styles.medicalCaseOncologyDetailsLine}>
            <MedViewOncologyCaseCardRoot />
            <MedViewConsultationsListRoot />
          </div>
        )}
      </div>

      <Divider />

      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={2}
          title="Данные по онкологическому случаю"
          description="Все, что относится к онкологическому случаю в рамках категории"
        />

        {oncologyCaseUid === null ? (
          <DataState
            title="Получение онкологического случая"
            description="После получения данных станут доступны диагностика, противопоказания и онкологические услуги"
            variant="waiting"
          />
        ) : (
          <>
            <div className={styles.diagnosticsGroupLine}>
              <MedViewDiagnosticsListRoot oncologyCaseUid={oncologyCaseUid} />
              <MedViewContraindicationsListRoot
                oncologyCaseUid={oncologyCaseUid}
              />
            </div>

            <Divider />

            <MedViewOncologyServiceCardsGroupRoot
              oncologyCaseUid={oncologyCaseUid}
              selectOncologyService={selectOncologyService}
              selectedOncologyServiceUid={selectedOncologyServiceUid}
            />
          </>
        )}
      </div>

      <Divider />

      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={3}
          title="Данные по онкологической услуге"
          description="Все, что относится к онкологической услуге в рамках категории"
        />
        {selectedOncologyServiceUid === null ? (
          <DataState
            title="Выберите онкологическую услугу"
            description="Нажмите на карточку онкологической услуги для отображения данных по лекарственным препаратам"
            variant="waiting"
          />
        ) : (
          <MedViewMedicationCardsGroupRoot />
        )}
      </div>

      <Divider />

      <div className={styles.categoryLine}>
        <CategoryLineHeader
          number={4}
          title="Данные по лекарственному препарату"
          description="Все, что относится к лекарственному препарату в рамках категории"
        />

        {selectedMedicationUid === null ? (
          <DataState
            title="Выберите лекарственный препарат"
            description="Нажмите на карточку лекарственного препарата для отображения данных о датах введения препарата и инъекциях"
            variant="waiting"
          />
        ) : (
          <div className={styles.injectionsGroup}>
            <MedViewInjectionDateChipsGroupRoot />
            <MedViewInjectionsTableRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default MedViewOncologyRoot;
