import type { MedicationDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetMedicationsResult";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.scss";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";

interface MedicationsCardsProps {
  medications: MedicationDto[];
  isPending: boolean;
  selectedMedicationUid: number | null;
  selectMedication: (medicationUid: number | null) => void;
}

export const MedicationsCards = ({
  medications,
  isPending,
  selectedMedicationUid,
  selectMedication,
}: MedicationsCardsProps) => {
  return (
    <section className={styles.medicationsCards}>
      {isPending
        ? Array.from({ length: 4 }).map((_, index) => (
            <article className={"cardRoot"} key={index}>
              <header className="cardHeader">
                <h2>Препарат</h2>
              </header>
              <div className="cardContent">
                <div className="cardBlock">
                  <div className="cardBlockField">
                    <p className={styles.drugIdentifier}>
                      <Skeleton />
                    </p>
                    <p className={styles.therapyRegimenCode}>
                      <Skeleton />
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))
        : medications.map((medication) => (
            <article
              key={medication.medicamentUid}
              onClick={() => selectMedication(medication.medicamentUid)}
              className={`cardRoot selectedCardRoot ${selectedMedicationUid === medication.medicamentUid ? "selectedCard" : ""}`}
            >
              <header className="cardHeader">
                <h2>Лекарственный препарат</h2>
                {selectedMedicationUid === medication.medicamentUid ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </header>
              <div className="cardContent">
                <div className="cardBlock">
                  <div className="cardBlockField">
                    <CardField
                      label="Регистрационный номер"
                      value={medication.drugIdentifier}
                      inline={true}
                    />
                    <CardField
                      label="Схема терапии"
                      value={formatNullableValue(medication.therapyRegimenCode)}
                      inline={true}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
    </section>
  );
};
