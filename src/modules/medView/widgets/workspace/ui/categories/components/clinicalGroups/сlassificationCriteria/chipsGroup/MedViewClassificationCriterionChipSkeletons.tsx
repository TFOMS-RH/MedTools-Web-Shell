import { Chip, Skeleton } from "@mui/material";
import styles from "./styles.module.scss";

export const MedViewClassificationCriterionChipSkeletons = () => {
  return (
    <div className={styles.classificationCriteriaChips}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Chip
          key={index}
          size="medium"
          variant="outlined"
          color="default"
          label={<Skeleton width={10} />}
        />
      ))}
    </div>
  );
};
