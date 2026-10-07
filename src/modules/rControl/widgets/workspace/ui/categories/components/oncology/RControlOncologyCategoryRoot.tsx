import { RControlOncologyServiceCardsGroupRoot } from "./oncologyServices/cardsGroup/RControlOncologyServiceCardsGroupRoot";
import { RControlConsultationsListRoot } from "./сonsultations/list/RControlConsultationsListRoot";
import { RControlOncologyCaseCardRoot } from "./oncologyCase/card/RControlOncologyCaseCardRoot";
import { useOncologyCaseQuery } from "../../../../model/queries/categories/oncology/useOncologyCaseQuery";
import { CategoryLineHeader } from "../../../../../../../../shared/ui/CategoryLineHeader/CategoryLineHeader";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { useFiltersStore } from "../../../../../filters/model/store/useFiltersStore";
import { RControlInjectionsTableRoot } from "./injections/injections/table/RControlInjectionsTableRoot";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { RControlMedicationCardsGroupRoot } from "./medications/cardsGroup/RControlMedicationCardsGroupRoot";
import { RControlInjectionDateChipsGroupRoot } from "./injections/injectionDates/chipsGroup/RControlInjectionDateChipsGroupRoot";
import { RControlDiagnosticsListRoot } from "./diagnostics/list/RControlDiagnosticsListRoot";
import { RControlContraindicationsListRoot } from "./contraindications/list/RControlContraindicationsListRoot";
import styles from "./styles.module.scss";

const RControlOncologyCategoryRoot = () => {
  const { targetDb } = useFiltersStore();
  const {
    selectedMedicalCaseUid,
    selectedOncologyServiceUid,
    selectedMedicationUid,
    selectOncologyService,
  } = useWorkspaceStore();
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
            <RControlOncologyCaseCardRoot />
            <RControlConsultationsListRoot />
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
              <RControlDiagnosticsListRoot oncologyCaseUid={oncologyCaseUid} />
              <RControlContraindicationsListRoot
                oncologyCaseUid={oncologyCaseUid}
              />
            </div>

            <Divider />

            <RControlOncologyServiceCardsGroupRoot
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
          <RControlMedicationCardsGroupRoot />
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
            <RControlInjectionDateChipsGroupRoot />
            <RControlInjectionsTableRoot />
          </div>
        )}
      </div>
    </section>
  );
};

export default RControlOncologyCategoryRoot;
