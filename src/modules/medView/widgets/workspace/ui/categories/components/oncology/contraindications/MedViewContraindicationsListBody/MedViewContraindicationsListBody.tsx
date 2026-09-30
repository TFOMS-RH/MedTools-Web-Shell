import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { Skeleton } from "@mui/material";
import type { ContraindicationDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/oncology/GetContraindicationsResult";

interface ContraindicationsListBody {
  contraindications: ContraindicationDto[];
  isPending: boolean;
}

export const MedViewContraindicationsListBody = ({
  contraindications,
  isPending,
}: ContraindicationsListBody) => {
  return (
    <section className={styles.contraindicationsListBody}>
      {isPending
        ? Array.from({ length: 3 }).map((_, index) => (
            <div className={styles.listRow} key={index}>
              <Skeleton variant="rounded" width={40} height={40} />
              <div className={styles.listRowContent}>
                <p className={styles.date}>
                  <Skeleton />
                </p>
                <p className={styles.description}>
                  <Skeleton animation="wave" height={25} />
                </p>
              </div>
            </div>
          ))
        : contraindications.map((contraindication, _index) => (
            <div
              className={styles.listRow}
              key={contraindication.contraindicationUid}
            >
              <div className={styles.number}>
                <p>{_index + 1}</p>
              </div>
              <div className={styles.listRowContent}>
                <p className={styles.date}>
                  {dayjs(contraindication.contraindicationDate).format(
                    "DD.MM.YYYY",
                  )}
                </p>
                <p className={styles.description}>
                  {`${contraindication.contraindicationCode} : ${contraindication.contraindication}`}
                </p>
              </div>
            </div>
          ))}
    </section>
  );
};
