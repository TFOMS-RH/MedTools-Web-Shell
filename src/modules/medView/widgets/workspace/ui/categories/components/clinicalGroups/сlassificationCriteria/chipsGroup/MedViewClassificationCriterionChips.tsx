import type { ClassificationCriterionDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/clinicalGroup/GetClassificationCriteriaResult";
import { Chip } from "@mui/material";
import styles from "./styles.module.scss";

interface ClassificationCriteriaBodyProps {
  classificationCriteria: ClassificationCriterionDto[];
}

export const MedViewClassificationCriterionChips = ({
  classificationCriteria,
}: ClassificationCriteriaBodyProps) => {
  return (
    <div className="cardContent">
      <div className="cardBlock">
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
      </div>
    </div>
  );
};
