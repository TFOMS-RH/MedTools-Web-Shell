import { CardField } from "../../../../../../../../shared/ui/CardField/CardField";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.scss";

export const MedViewMedicalCasesCardsSkeleton = () => {
  return (
    <section className={styles.medicalCasesCards}>
      {Array.from({ length: 4 }).map((_, index) => (
        <article className="cardRoot" key={index}>
          <header className="cardHeader">
            <h2>Медицинский случай</h2>
          </header>
          <div className="cardContent">
            <div className="cardBlock">
              <div className="cardBlockField">
                <CardField label="Профиль" inline={true} value={<Skeleton />} />

                <CardField
                  inline={true}
                  label="Специальность"
                  value={<Skeleton />}
                />
                <CardField inline={true} label="Диагноз" value={<Skeleton />} />
              </div>

              <div className="cardBlockField">
                <CardField
                  inline={true}
                  label="Период лечения"
                  value={<Skeleton />}
                />

                <CardField
                  inline={true}
                  label="Категория"
                  value={<Skeleton />}
                />
              </div>
            </div>

            <Divider />

            <div className="cardBlock">
              <div className="cardBlockField">
                <CardField inline={true} label="Тариф" value={<Skeleton />} />
                <CardField
                  inline={true}
                  label="Количество"
                  value={<Skeleton />}
                />
              </div>

              <div className="cardBlockField">
                <CardField
                  inline={true}
                  spaceBetween={true}
                  label="Предъявлено"
                  value={<Skeleton />}
                />
                <CardField
                  inline={true}
                  spaceBetween={true}
                  label="Принято"
                  value={<Skeleton />}
                />
                <CardField
                  inline={true}
                  spaceBetween={true}
                  label="Принято СМО"
                  value={<Skeleton />}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
