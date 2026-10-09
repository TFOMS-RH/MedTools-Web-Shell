import type { MedicationDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetMedicationsResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./styles.module.scss";

interface MedViewMedicationCardsProps {
  medications: MedicationDto[];
  isPending: boolean;
  selectedMedicationUid: number | null;
  selectMedication: (medicationUid: number | null) => void;
}

export const MedViewMedicationCards = ({
  medications,
  selectedMedicationUid,
  selectMedication,
}: MedViewMedicationCardsProps) => {
  return (
    <section className={styles.medicationsCards}>
      {medications.map((medication) => (
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
