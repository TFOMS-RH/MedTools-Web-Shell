import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import type { ClinicalGroupDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/clinicalGroup/GetClinicalGroupResult";

interface ClinicalGroupBodyProps {
  clinicalGroup: ClinicalGroupDto;
  isPending: boolean;
}

export const MedViewClinicalGroupBody = ({
  clinicalGroup,
  isPending,
}: ClinicalGroupBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField label="КСГ" value={<Skeleton />} inline={true} />
              <CardField label="КСГ" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="КПГ" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Модель определения КСГ"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Использование подгруппы КСГ"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент затратоемскости"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент управления"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент дифференциации"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент уровня"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Базовая ставка"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Использование КСЛП"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Примененный КСЛП"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="КСГ"
                value={clinicalGroup.clinicalStatisticalGroupNumber}
                inline={true}
              />
              <CardField
                label="КСГ"
                value={
                  clinicalGroup.calculatedClinicalStatisticalGroupNumber ?? "—"
                }
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="КПГ"
                value={clinicalGroup.clinicalProfileGroupNumber ?? "—"}
                inline={true}
              />
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Модель определения КСГ"
                value={clinicalGroup.clinicalStatisticalGroupModelVersion}
                inline={true}
              />
              <CardField
                label="Использование подгруппы КСГ"
                value={clinicalGroup.isCsgSubgroupUsed ? "Да" : "Нет"}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент затратоемскости"
                value={clinicalGroup.costCoefficient}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент управления"
                value={clinicalGroup.managementCoefficient}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент дифференциации"
                value={clinicalGroup.differentiationCoefficient}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Коэффициент уровня"
                value={clinicalGroup.levelCoefficient}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Базовая ставка"
                value={clinicalGroup.baseRate}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Использование КСЛП"
                value={clinicalGroup.isClspUsed ? "Да" : "Нет"}
                inline={true}
              />
              <CardField
                label="Примененный КСЛП"
                value={clinicalGroup.complexityCoefficient ?? "—"}
                inline={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
