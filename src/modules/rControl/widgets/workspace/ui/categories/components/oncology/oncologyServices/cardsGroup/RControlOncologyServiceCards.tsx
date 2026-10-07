import type { OncologyServiceDto } from "../../../../../../model/types/categories/oncology/GetOncologyServicesResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./styles.module.scss";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";

interface RControlOncologyServiceCardsProps {
  oncologyServices: OncologyServiceDto[];
  selectedOncologyServiceUid: number | null;
  selectOncologyService: (oncologyServiceUid: number | null) => void;
}

export const RControlOncologyServiceCards = ({
  oncologyServices,
  selectedOncologyServiceUid,
  selectOncologyService,
}: RControlOncologyServiceCardsProps) => {
  return (
    <section className={styles.oncologyServicesCards}>
      {oncologyServices.map((oncologyService) => (
        <article
          key={oncologyService.oncologyServiceUid}
          onClick={() =>
            selectOncologyService(oncologyService.oncologyServiceUid)
          }
          className={`cardRoot selectedCardRoot ${selectedOncologyServiceUid === oncologyService.oncologyServiceUid ? "selectedCard" : ""}`}
        >
          <header className="cardHeader">
            <h2>Онкологическая услуга</h2>
            {selectedOncologyServiceUid ===
            oncologyService.oncologyServiceUid ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </header>
          <div className="cardContent">
            <div className="cardBlock">
              <div className="cardBlockField">
                <CardField
                  label="Тип услуги"
                  inline={true}
                  value={formatNullableValue(oncologyService.serviceType)}
                />
                <CardField
                  inline={true}
                  label="Тип хирургического лечения"
                  value={formatNullableValue(
                    oncologyService.surgicalTreatmentType,
                  )}
                />
                <CardField
                  inline={true}
                  label="Линия лекарственной терапии"
                  value={formatNullableValue(oncologyService.drugTherapyLine)}
                />
                <CardField
                  inline={true}
                  label="Проведение профилактики тошноты"
                  value={
                    oncologyService.isAntiemeticProphylaxis === null
                      ? "—"
                      : oncologyService.isAntiemeticProphylaxis
                        ? "Да"
                        : "Нет"
                  }
                />
                <CardField
                  inline={true}
                  label="Тип лучевой терапии"
                  value={formatNullableValue(oncologyService.radiotherapyType)}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
