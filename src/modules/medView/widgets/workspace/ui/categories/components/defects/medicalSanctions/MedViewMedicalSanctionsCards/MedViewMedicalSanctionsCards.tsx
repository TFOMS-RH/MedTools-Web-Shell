import type { MedicalSanctionDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/defects/GetMedicalSanctionsResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatCurrency } from "../../../../../../../../../../shared/helpers/formatCurrency";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatDate } from "../../../../../../../../../../shared/helpers/formatDate";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

interface MedicalSanctionsBodyProps {
  medicalSanctions: MedicalSanctionDto[];
  isPending: boolean;
}

export const MedViewMedicalSanctionsCards = ({
  medicalSanctions,
  isPending,
}: MedicalSanctionsBodyProps) => {
  return (
    <section className={styles.medicalSanctionsCards}>
      {isPending
        ? Array.from({ length: 2 }).map((_, index) => (
            <div className="cardRoot" key={index}>
              <header className="cardHeader">
                <h2>Санкции</h2>
              </header>
              <div className="cardContent">
                <div className="cardLineGroup">
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ОСНОВНОЕ</h3>
                      <div className="cardBlockLineOneGrid">
                        <CardField
                          label="Тип санкции"
                          value={<Skeleton />}
                          inline={true}
                        />
                      </div>
                      <div className="cardBlockLineTwoGrid">
                        <CardField
                          label="Сумма"
                          value={<Skeleton />}
                          inline={true}
                        />
                        <CardField
                          label="Количество"
                          value={<Skeleton />}
                          inline={true}
                        />
                      </div>
                      <div className="cardBlockLineOneGrid">
                        <CardField
                          label="Код отказа"
                          value={<Skeleton />}
                          inline={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>АКТ</h3>
                    </div>
                    <div className="cardBlockLineTwoGrid">
                      <CardField
                        label="Номер акта"
                        value={<Skeleton />}
                        inline={true}
                      />
                      <CardField
                        label="Дата акта"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ВЫГРУЗКА</h3>
                    </div>
                    <div className="cardBlockLineTwoGrid">
                      <CardField
                        label="Месяц"
                        value={<Skeleton />}
                        inline={true}
                      />
                      <CardField
                        label="Год"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Дата загрузки"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Имя файла"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ДОПОЛНИТЕЛЬНО</h3>
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Код врача"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Комментарий"
                        value={<Skeleton />}
                        inline={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : medicalSanctions.map((medicalSanction) => (
            <div className="cardRoot" key={medicalSanction.medicalSanctionUid}>
              <header className="cardHeader">
                <h2>Санкции</h2>
              </header>
              <div className="cardContent">
                <div className="cardLineGroup">
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ОСНОВНОЕ</h3>
                      <div className="cardBlockLineOneGrid">
                        <CardField
                          label="Тип санкции"
                          value={medicalSanction.sanctionCode}
                          inline={true}
                        />
                      </div>
                      <div className="cardBlockLineTwoGrid">
                        <CardField
                          label="Сумма"
                          value={formatCurrency(medicalSanction.sanctionAmount)}
                          inline={true}
                        />
                        <CardField
                          label="Количество"
                          value={`${medicalSanction.unitsRemoved}`}
                          inline={true}
                        />
                      </div>
                      <div className="cardBlockLineOneGrid">
                        <CardField
                          label="Код отказа"
                          value={medicalSanction.refusalReasonCode}
                          inline={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>АКТ</h3>
                    </div>
                    <div className="cardBlockLineTwoGrid">
                      <CardField
                        label="Номер акта"
                        value={medicalSanction.expertiseActNumber}
                        inline={true}
                      />
                      <CardField
                        label="Дата акта"
                        value={dayjs(medicalSanction.expertiseActDate).format(
                          "DD.MM.YYYY",
                        )}
                        inline={true}
                      />
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ВЫГРУЗКА</h3>
                    </div>
                    <div className="cardBlockLineTwoGrid">
                      <CardField
                        label="Месяц"
                        value={formatNullableValue(medicalSanction.month)}
                        inline={true}
                      />
                      <CardField
                        label="Год"
                        value={formatNullableValue(medicalSanction.year)}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Дата загрузки"
                        value={formatDate(medicalSanction.uploadDate)}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Имя файла"
                        value={medicalSanction.filename}
                        inline={true}
                      />
                    </div>
                  </div>
                  <div className="cardLine">
                    <div className="cardLineHeader">
                      <h3>ДОПОЛНИТЕЛЬНО</h3>
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Код врача"
                        value={formatNullableValue(medicalSanction.expertCode)}
                        inline={true}
                      />
                    </div>
                    <div className="cardBlockLineOneGrid">
                      <CardField
                        label="Комментарий"
                        value={formatNullableValue(medicalSanction.comment)}
                        inline={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
};
