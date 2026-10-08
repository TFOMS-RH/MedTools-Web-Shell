import type { OncologyServiceDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetOncologyServicesResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./styles.module.scss";

interface OncologyServicesCardsProps {
  oncologyServices: OncologyServiceDto[];
  isPending: boolean;
  selectedOncologyServiceUid: number | null;
  selectOncologyService: (oncologyServiceUid: number | null) => void;
}

export const MedViewOncologyServicesCards = ({
  oncologyServices,
  isPending,
  selectedOncologyServiceUid,
  selectOncologyService,
}: OncologyServicesCardsProps) => {
  return (
    <section className={styles.oncologyServicesCards}>
      {isPending
        ? Array.from({ length: 2 }).map((_, index) => (
            <article className="cardRoot" key={index}>
              <header className="cardHeader">
                <h2>Онкологическая услуга</h2>
              </header>
              <div className="cardContent">
                <div className="cardBlock">
                  <div className="cardBlockField">
                    <CardField
                      label="Тип услуги"
                      inline={true}
                      value={<Skeleton />}
                    />
                    <CardField
                      inline={true}
                      label="Тип хирургического лечения"
                      value={<Skeleton />}
                    />
                    <CardField
                      inline={true}
                      label="Линия лекарственной терапии"
                      value={<Skeleton />}
                    />
                    <CardField
                      inline={true}
                      label="Проведение профилактики тошноты"
                      value={<Skeleton />}
                    />
                    <CardField
                      inline={true}
                      label="Тип лучевой терапии"
                      value={<Skeleton />}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))
        : oncologyServices.map((oncologyService) => (
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
                      value={formatNullableValue(
                        oncologyService.drugTherapyLine,
                      )}
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
                      value={formatNullableValue(
                        oncologyService.radiotherapyType,
                      )}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
    </section>
  );
};
