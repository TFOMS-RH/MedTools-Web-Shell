import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import dayjs from "dayjs";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import type { MedicalCaseDetailsDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/medicalCases/GetMedicalCaseDetailsResult";

interface MedicalCaseDetailsBodyProps {
  medicalCaseDetails: MedicalCaseDetailsDto;
  isPending: boolean;
}

export const MedicalCaseDetailsBody = ({
  medicalCaseDetails,
  isPending,
}: MedicalCaseDetailsBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ОСНОВНОЕ</h3>
            </header>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Профиль" value={<Skeleton />} inline={true} />
              <CardField
                label="Специальность"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Номер истории"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Код лечащего врача"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Количество"
                value={<Skeleton />}
                inline={true}
              />
              <CardField label="Категория" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Цель посещения"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Уровень ЛПУ"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ЛЕЧЕНИЕ</h3>
            </header>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Период лечения"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Профиль койки"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Масса тела (кг)"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Реабилитация"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Подозрение на ЗНО"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Поступление или перевод"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ДИАГНОЗ</h3>
            </header>

            <div className="cardBlockLineOneGrid">
              <CardField
                label="Основной диагноз"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Первичный диагноз"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Характер основного заболевания"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ДОПОЛНИТЕЛЬНО</h3>
            </header>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Подразделение"
                value={<Skeleton />}
                inline={true}
              />
              <CardField label="Отделение" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Комментарий"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cardLineGroup">
          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ОСНОВНОЕ</h3>
            </header>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Профиль"
                value={medicalCaseDetails.medicalProfile}
                inline={true}
              />
              <CardField
                label="Специальность"
                value={medicalCaseDetails.physicianSpecialty}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Номер истории"
                value={medicalCaseDetails.medicalRecordNumber}
                inline={true}
              />
              <CardField
                label="Код лечащего врача"
                value={medicalCaseDetails.physicianCode}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Количество"
                value={formatNullableValue(medicalCaseDetails.paidUnits)}
                inline={true}
              />
              <CardField
                label="Категория"
                value={medicalCaseDetails.isPediatric ? "Ребенок" : "Взрослый"}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Цель посещения"
                value={formatNullableValue(medicalCaseDetails.visitPurpose)}
                inline={true}
              />
              <CardField
                label="Уровень ЛПУ"
                value={formatNullableValue(medicalCaseDetails.facilityLevel)}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ЛЕЧЕНИЕ</h3>
            </header>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Период лечения"
                value={`${dayjs(medicalCaseDetails.treatmentStartDate).format(
                  "DD.MM.YYYY",
                )} — ${dayjs(medicalCaseDetails.treatmentEndDate).format(
                  "DD.MM.YYYY",
                )}`}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Профиль койки"
                value={formatNullableValue(medicalCaseDetails.bedProfile)}
                inline={true}
              />
              <CardField
                label="Масса тела (кг)"
                value={formatNullableValue(medicalCaseDetails.weight)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Реабилитация"
                value={
                  medicalCaseDetails.isRehabilitation === null
                    ? "—"
                    : medicalCaseDetails.isRehabilitation
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
              <CardField
                label="Подозрение на ЗНО"
                value={
                  medicalCaseDetails.isOncologySuspicion === null
                    ? "—"
                    : medicalCaseDetails.isOncologySuspicion
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Поступление или перевод"
                value={
                  medicalCaseDetails.isAdmissionTransfer === null
                    ? "—"
                    : medicalCaseDetails.isAdmissionTransfer
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ДИАГНОЗ</h3>
            </header>

            <div className="cardBlockLineOneGrid">
              <CardField
                label="Основной диагноз"
                value={medicalCaseDetails.primaryDiagnosis}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Первичный диагноз"
                value={formatNullableValue(medicalCaseDetails.initialDiagnosis)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Характер основного заболевания"
                value={formatNullableValue(medicalCaseDetails.diseaseCharacter)}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <header className="cardLineHeader">
              <h3>ДОПОЛНИТЕЛЬНО</h3>
            </header>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Подразделение"
                value={formatNullableValue(medicalCaseDetails.department)}
                inline={true}
              />
              <CardField
                label="Отделение"
                value={formatNullableValue(medicalCaseDetails.departmentCode)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Комментарий"
                value={formatNullableValue(medicalCaseDetails.internalComment)}
                inline={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
