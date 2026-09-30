import type { ConsultationDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/oncology/GetConsultationsResult";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import styles from "./styles.module.scss";

interface ConsultationsListBodyProps {
  consultations: ConsultationDto[];
  isPending: boolean;
}

export const MedViewConsultationsListBody = ({
  consultations,
  isPending,
}: ConsultationsListBodyProps) => {
  return (
    <section className={styles.consultationsListBodyRoot}>
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
        : consultations.map((consultation, _index) => (
            <div className={styles.listRow} key={consultation.consultationUid}>
              <div className={styles.number}>
                <p>{_index + 1}</p>
              </div>
              <div className={styles.listRowContent}>
                <p className={styles.date}>
                  {consultation.consultationDate
                    ? dayjs(consultation.consultationDate).format("DD.MM.YYYY")
                    : "Дата неизвестна"}
                </p>
                <p className={styles.description}>
                  {consultation.consultationPurpose}
                </p>
              </div>
            </div>
          ))}
    </section>
  );
};
