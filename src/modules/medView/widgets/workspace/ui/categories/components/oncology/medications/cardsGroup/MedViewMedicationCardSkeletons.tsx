import { Skeleton } from "@mui/material";
import styles from "./styles.module.scss";

export const MedViewMedicationCardSkeletons = () => {
  return (
    <section className={styles.medicationsCards}>
      {Array.from({ length: 4 }).map((_, index) => (
        <article className={"cardRoot"} key={index}>
          <header className="cardHeader">
            <h2>Препарат</h2>
          </header>
          <div className="cardContent">
            <div className="cardBlock">
              <div className="cardBlockField">
                <p className={styles.drugIdentifier}>
                  <Skeleton />
                </p>
                <p className={styles.therapyRegimenCode}>
                  <Skeleton />
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
