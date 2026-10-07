import type { InjectionDateDto } from "../../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetInjectionDatesResult";
import { formatDate } from "../../../../../../../../../../../shared/helpers/formatDate";
import { Chip } from "@mui/material";
import styles from "./styles.module.scss";

interface RControlInjectionDateChipsProps {
  injectionDates: InjectionDateDto[];
  isPending: boolean;
}

export const RControlInjectionDateChips = ({
  injectionDates,
}: RControlInjectionDateChipsProps) => {
  return (
    <div className="cardContent">
      <div className="cardBlock">
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
      </div>
    </div>
  );
};
