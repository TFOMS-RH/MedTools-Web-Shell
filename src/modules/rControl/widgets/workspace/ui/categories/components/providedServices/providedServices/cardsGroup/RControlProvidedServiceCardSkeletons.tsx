import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Divider } from "../../../../../../../../../../components/ui/Divider/Divider";
import styles from "./styles.module.scss";

export const RControlProvidedServiceCardSkeletons = () => {
  return (
    <section className={styles.providedServicesCards}>
      {Array.from({ length: 2 }).map((_) => (
        <article className="cardRoot">
          <header className="cardHeader">
            <h2>Оказанная услуга </h2>
          </header>
          <div className="cardContent">
            <div className="cardLineGroup">
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Наименование услуги"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Вид медицинского вмешательства"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineTwoGrid">
                  <CardField
                    label="Профиль"
                    value={<Skeleton />}
                    inline={true}
                  />
                  <CardField
                    label="Специальность"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Категория"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Диагноз"
                    value={<Skeleton />}
                    inline={true}
                  />
                </div>
              </div>
              <div className="cardLine">
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Период"
                    value={<Skeleton />}
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
                    value={<Skeleton />}
                    inline={true}
                    spaceBetween={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Тариф"
                    value={<Skeleton />}
                    inline={true}
                    spaceBetween={true}
                  />
                </div>
                <div className="cardBlockLineOneGrid">
                  <CardField
                    label="Сумма"
                    value={<Skeleton />}
                    inline={true}
                    spaceBetween={true}
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
        </article>
      ))}
    </section>
  );
};
