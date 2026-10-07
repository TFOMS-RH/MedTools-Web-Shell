import { Chip, Skeleton } from "@mui/material";
import styles from "./styles.module.scss";

export const RControlInjectionDateChipSkeletons = () => {
  return (
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
  );
};
