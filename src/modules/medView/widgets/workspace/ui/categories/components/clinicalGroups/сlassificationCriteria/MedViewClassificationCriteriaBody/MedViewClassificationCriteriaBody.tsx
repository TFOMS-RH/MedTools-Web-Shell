import { Chip, Skeleton } from "@mui/material";
import styles from "./styles.module.scss";
import type { ClassificationCriterionDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/clinicalGroup/GetClassificationCriteriaResult";

interface ClassificationCriteriaBodyProps {
  classificationCriteria: ClassificationCriterionDto[];
  isPending: boolean;
}

export const MedViewClassificationCriteriaBody = ({
  classificationCriteria,
  isPending,
}: ClassificationCriteriaBodyProps) => {
  return (
    <div className="cardContent">
      <div className="cardBlock">
        {isPending ? (
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
        ) : (
          <div className={styles.classificationCriteriaChips}>
            {classificationCriteria.map((classificationCriterion) => (
              <Chip
                key={classificationCriterion.classificationCriterionUid}
                size="medium"
                variant="filled"
                color="default"
                label={classificationCriterion.classificationCriterion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
