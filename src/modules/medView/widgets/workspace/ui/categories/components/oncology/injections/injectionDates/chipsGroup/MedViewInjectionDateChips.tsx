import type { InjectionDateDto } from "../../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetInjectionDatesResult";
import { Chip } from "@mui/material";
import { formatDate } from "../../../../../../../../../../../shared/helpers/formatDate";
import styles from "./styles.module.scss";

interface MedViewInjectionDateChipsProps {
  injectionDates: InjectionDateDto[];
}

export const MedViewInjectionDateChips = ({
  injectionDates,
}: MedViewInjectionDateChipsProps) => {
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
