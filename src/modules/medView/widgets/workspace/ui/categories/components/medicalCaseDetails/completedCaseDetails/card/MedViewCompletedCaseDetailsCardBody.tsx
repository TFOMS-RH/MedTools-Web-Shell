import type { CompletedCaseDetailsDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/medicalCases/GetCompletedCaseDetailsResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatDate } from "../../../../../../../../../../shared/helpers/formatDate";
import dayjs from "dayjs";

interface MedViewCompletedCaseDetailsCardBodyProps {
  completedCaseDetails: CompletedCaseDetailsDto;
  isPending: boolean;
}

export const MedViewCompletedCaseDetailsCardBody = ({
  completedCaseDetails,
  isPending,
}: MedViewCompletedCaseDetailsCardBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ЛПУ И НАПРАВЛЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Код ЛПУ" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование ЛПУ"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Код направившей МО"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование направившей МО"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата направления"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>МЕД. ПОМОЩЬ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Вид медицинской помощи"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Форма медицинской помощи"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Условия оказания мед. помощи"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Способ оплаты"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ЛЕЧЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Период лечения"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Койко-дни / пациенто-дни"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Внутрибольничный перевод"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>РЕЗУЛЬТАТ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField label="Результат" value={<Skeleton />} inline={true} />
              <CardField label="Исход" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Результат диспансеризации"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Отказ от диспансеризации"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Мобильная бригада"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ЛПУ И НАПРАВЛЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Код ЛПУ"
                value={completedCaseDetails.medicalOrganizationCode}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование ЛПУ"
                value={completedCaseDetails.medicalOrganizationName}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Код направившей МО"
                value={formatNullableValue(
                  completedCaseDetails.referringMedicalOrganizationCode,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование направившей МО"
                value={formatNullableValue(
                  completedCaseDetails.referringMedicalOrganizationName,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата направления"
                value={formatDate(completedCaseDetails.referralDate)}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>МЕД. ПОМОЩЬ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Вид медицинской помощи"
                value={completedCaseDetails.medicalCareType}
                inline={true}
              />
              <CardField
                label="Форма медицинской помощи"
                value={completedCaseDetails.medicalCareForm}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Условия оказания мед. помощи"
                value={completedCaseDetails.careConditions}
                inline={true}
              />
              <CardField
                label="Способ оплаты"
                value={completedCaseDetails.paymentMethodCode}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ЛЕЧЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Период лечения"
                value={`${dayjs(completedCaseDetails.treatmentStartDate).format(
                  "DD.MM.YYYY",
                )} — ${dayjs(completedCaseDetails.treatmentEndDate).format(
                  "DD.MM.YYYY",
                )}`}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Койко-дни / пациенто-дни"
                value={formatNullableValue(
                  completedCaseDetails.hospitalizationDuration,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Внутрибольничный перевод"
                value={
                  completedCaseDetails.isIntrahospitalTransfer === null
                    ? "—"
                    : completedCaseDetails.isIntrahospitalTransfer
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>РЕЗУЛЬТАТ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Результат"
                value={completedCaseDetails.hospitalizationOutcome}
                inline={true}
              />
              <CardField
                label="Исход"
                value={completedCaseDetails.diseaseOutcome}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Результат диспансеризации"
                value={formatNullableValue(
                  completedCaseDetails.screeningResult,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Отказ от диспансеризации"
                value={
                  completedCaseDetails.isRefusal === null
                    ? "—"
                    : completedCaseDetails.isRefusal
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
              <CardField
                label="Мобильная бригада"
                value={
                  completedCaseDetails.isMobileTeam === null
                    ? "—"
                    : completedCaseDetails.isMobileTeam
                      ? "Да"
                      : "Нет"
                }
                inline={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
