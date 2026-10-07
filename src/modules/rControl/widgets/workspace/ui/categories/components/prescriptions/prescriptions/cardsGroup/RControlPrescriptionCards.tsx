import type { PrescriptionDto } from "../../../../../../model/types/categories/prescriptions/GetPrescriptionsResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import styles from "./styles.module.scss";

interface RControlPrescriptionCardsProps {
  prescriptions: PrescriptionDto[];
}

export const RControlPrescriptionCards = ({
  prescriptions,
}: RControlPrescriptionCardsProps) => {
  return (
    <section className={styles.prescriptionsCards}>
      {prescriptions.map((prescription) => (
        <article className="cardRoot" key={prescription.perscriptionUid}>
          <header className="cardHeader">
            <h2>Назначение №{prescription.sequenceNumber}</h2>
          </header>
          <div className="cardContent">
            <div className="cardLineGroup">
              <div className="cardLine">
                <div className="cardLineHeader">
                  <h3>НАЗНАЧЕНИЕ</h3>
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Вид назначения"
                    value={prescription.prescriptionType}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Метод диагностического лечения"
                    value={formatNullableValue(prescription.diagnosticMethod)}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Медицинская услуга в направление"
                    value={formatNullableValue(prescription.serviceCode)}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardLineHeader">
                  <h3>НАПРАВЛЕНИЕ</h3>
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Дата направления"
                    value={formatNullableValue(prescription.referralDate)}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Медицинская организация назначения"
                    value={formatNullableValue(prescription.referredToMoCode)}
                    inline={true}
                  />
                </div>
              </div>

              <div className="cardLine">
                <div className="cardLineHeader">
                  <h3>ПРОФИЛЬ</h3>
                </div>
                <div className="cardBlockLineTwoGrid">
                  <CardField
                    label="Профиль МП"
                    value={formatNullableValue(prescription.medicalCareProfile)}
                    inline={true}
                  />
                  <CardField
                    label="Профиль койки"
                    value={formatNullableValue(prescription.bedProfile)}
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
