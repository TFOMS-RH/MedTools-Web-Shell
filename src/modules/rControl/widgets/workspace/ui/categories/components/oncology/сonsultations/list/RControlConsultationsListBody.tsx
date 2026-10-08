import type { ConsultationDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetConsultationsResult";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { Skeleton } from "@mui/material";

interface RControlConsultationsListBodyProps {
  consultations: ConsultationDto[];
  isPending: boolean;
}

export const RControlConsultationsListBody = ({
  consultations,
  isPending,
}: RControlConsultationsListBodyProps) => {
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
