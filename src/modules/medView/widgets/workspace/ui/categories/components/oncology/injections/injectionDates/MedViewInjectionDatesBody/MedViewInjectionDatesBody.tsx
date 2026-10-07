import { Chip, Skeleton } from "@mui/material";
import { formatDate } from "../../../../../../../../../../../shared/helpers/formatDate";
import type { InjectionDateDto } from "../../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetInjectionDatesResult";
import styles from "./styles.module.scss";

interface InjectionDatesBodyProps {
  injectionDates: InjectionDateDto[];
  isPending: boolean;
}

export const MedViewInjectionDatesBody = ({
  injectionDates,
  isPending,
}: InjectionDatesBodyProps) => {
  return (
    <div className="cardContent">
      <div className="cardBlock">
        {isPending ? (
          <div className={styles.injectionDateChips}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Chip
                key={index}
                variant="filled"
                label={<Skeleton width={100} />}
                size="small"
                color="default"
                sx={{
                  fontSize: "var(--fs-body2)",
                }}
              />
            ))}
          </div>
        ) : (
          <div className={styles.injectionDateChips}>
            {injectionDates.map((injectionDate) => (
              <Chip
                key={injectionDate.injectionDateUid}
                variant="filled"
                label={formatDate(injectionDate.administrationDate)}
                size="small"
                color="default"
                sx={{
                  fontSize: "var(--fs-body2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
