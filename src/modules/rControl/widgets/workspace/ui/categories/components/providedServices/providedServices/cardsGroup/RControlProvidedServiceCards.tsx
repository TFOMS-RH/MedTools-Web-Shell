import type { ProvidedServiceDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/providedServices/GetProvidedServicesResult";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatCurrency } from "../../../../../../../../../../shared/helpers/formatCurrency";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Divider } from "../../../../../../../../../../components/ui/Divider/Divider";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

interface RControlProvidedServiceCardsProps {
  providedSevices: ProvidedServiceDto[];
  selectedProvidedServiceUid: number | null;
  selectProvidedService: (providedServiceUid: number | null) => void;
}

export const RControlProvidedServiceCards = ({
  providedSevices,
  selectedProvidedServiceUid,
  selectProvidedService,
}: RControlProvidedServiceCardsProps) => {
  return (
    <section className={styles.providedServicesCards}>
      {providedSevices.map((providedService) => (
        <article
          onClick={() =>
            selectProvidedService(providedService.providedServiceUid)
          }
          className={`cardRoot selectedCardRoot ${selectedProvidedServiceUid === providedService.providedServiceUid ? "selectedCard" : ""}`}
          key={providedService.providedServiceUid}
        >
          <header className="cardHeader">
            <h2>Оказанная услуга — {providedService.serviceCode}</h2>
            {selectedProvidedServiceUid ===
            providedService.providedServiceUid ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </header>
          <div className="cardContent">
            <div className="cardLineGroup">
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Наименование услуги"
                    value={formatNullableValue(providedService.service)}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Вид медицинского вмешательства"
                    value={formatNullableValue(
                      providedService.medicalInterventionType,
                    )}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineTwoGrid">
                  <CardField
                    label="Профиль"
                    value={`${providedService.medicalProfileCode} : ${providedService.medicalProfile}`}
                    inline={true}
                  />
                  <CardField
                    label="Специальность"
                    value={`${providedService.physicianSpecialtyCode} : ${providedService.physicianSpecialty}`}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Категория"
                    value={providedService.isPediatric ? "Ребенок" : "Взрослый"}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Диагноз"
                    value={providedService.diagnosis}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Период"
                    value={`${dayjs(providedService.serviceStartDate).format(
                      "DD.MM.YYYY",
                    )} — ${dayjs(providedService.serviceEndDate).format("DD.MM.YYYY")}`}
                    inline={true}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="cardLineGroup">
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Количество"
                    value={providedService.serviceQuantity}
                    inline={true}
                    spaceBetween={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Тариф"
                    value={formatCurrency(providedService.unitRate)}
                    inline={true}
                    spaceBetween={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Сумма"
                    value={formatCurrency(providedService.amountBilled)}
                    inline={true}
                    spaceBetween={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Комментарий"
                    value={formatNullableValue(providedService.internalComment)}
                    inline={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
