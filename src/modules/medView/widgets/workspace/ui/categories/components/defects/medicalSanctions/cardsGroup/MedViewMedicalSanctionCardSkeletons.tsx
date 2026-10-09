import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import styles from "./styles.module.scss";

export const MedViewMedicalSanctionCardSkeletons = () => {
  return (
    <section className={styles.medicalSanctionsCards}>
      {Array.from({ length: 2 }).map((_, index) => (
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
                  <CardField label="Месяц" value={<Skeleton />} inline={true} />
                  <CardField label="Год" value={<Skeleton />} inline={true} />
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
      ))}
    </section>
  );
};
