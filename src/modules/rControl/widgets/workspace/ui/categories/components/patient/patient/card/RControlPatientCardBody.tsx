import type { PatientDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/patient/GetPatientResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatDate } from "../../../../../../../../../../shared/helpers/formatDate";

interface PatientBodyProps {
  patient: PatientDto;
  isPending: boolean;
}

export const RControlPatientCardBody = ({ patient, isPending }: PatientBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ОСНОВНОЕ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Фамилия" value={<Skeleton />} inline={true} />
              <CardField
                label="Фамилия представителя"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Имя" value={<Skeleton />} inline={true} />
              <CardField
                label="Имя представителя"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Отчество" value={<Skeleton />} inline={true} />
              <CardField
                label="Отчество представителя"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Дата рождения"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Дата рождения представителя"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Пол" value={<Skeleton />} inline={true} />
              <CardField
                label="Пол представителя"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ДОКУМЕНТ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Тип" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Серия" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Номер" value={<Skeleton />} inline={true} />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата выдачи"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Кем выдан" value={<Skeleton />} inline={true} />
            </div>
          </div>
        </div>
      ) : (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Фамилия"
                value={patient.patientLastName}
                inline={true}
              />
              <CardField
                label="Фамилия представителя"
                value={formatNullableValue(
                  patient.patientRepresentativeLastName,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Имя"
                value={patient.patientFirstName}
                inline={true}
              />
              <CardField
                label="Имя представителя"
                value={formatNullableValue(
                  patient.patientRepresentativeFirstName,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Отчество"
                value={patient.patientMiddleName}
                inline={true}
              />
              <CardField
                label="Отчество представителя"
                value={formatNullableValue(
                  patient.patientRepresentativeMiddleName,
                )}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Дата рождения"
                value={formatDate(patient.patientBirthDate)}
                inline={true}
              />
              <CardField
                label="Дата рождения представителя"
                value={formatDate(patient.patientRepresentativeBirthday)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Пол" value={patient.patientSex} inline={true} />
              <CardField
                label="Пол представителя"
                value={formatNullableValue(patient.patientRepresentativeSex)}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ДОКУМЕНТ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Тип"
                value={`${formatNullableValue(patient.documentTypeCode)} ${patient.documentTypeName}`}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Серия"
                value={formatNullableValue(patient.documentSeries)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер"
                value={formatNullableValue(patient.documentNumber)}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата выдачи"
                value={formatDate(patient.documentIssueDate)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Кем выдан"
                value={formatNullableValue(patient.issuedBy)}
                inline={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
