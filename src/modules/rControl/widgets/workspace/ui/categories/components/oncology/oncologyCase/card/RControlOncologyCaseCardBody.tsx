import type { OncologyCaseDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/oncology/GetOncologyCaseResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";

interface RControlOncologyCaseCardBodyProps {
  oncologyCase: OncologyCaseDto;
  isPending: boolean;
}

export const RControlOncologyCaseCardBody = ({
  oncologyCase,
  isPending,
}: RControlOncologyCaseCardBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardBlock">
          <div className="cardBlockField">
            <CardField
              label="Повод обращения"
              value={<Skeleton />}
              inline={true}
            />
            <CardField
              label="Стадия заболевания"
              value={<Skeleton />}
              inline={true}
            />
          </div>
          <div className="cardBlockField">
            <CardField
              label="Значение Tumor"
              value={<Skeleton />}
              inline={true}
            />
            <CardField
              label="Значение Nodus"
              value={<Skeleton />}
              inline={true}
            />
            <CardField
              label="Значение Metastatsis"
              value={<Skeleton />}
              inline={true}
            />
          </div>
          <div className="cardBlockField">
            <CardField
              label="Выявления метастазов"
              value={<Skeleton />}
              inline={true}
            />
            <CardField
              label="Суммарная очаговая доза"
              value={<Skeleton />}
              inline={true}
            />
          </div>
        </div>
      ) : (
        <div className="cardBlock">
          <div className="cardBlockField">
            <CardField
              label="Повод обращения"
              value={formatNullableValue(oncologyCase.referralReason)}
              inline={true}
            />
            <CardField
              label="Стадия заболевания"
              value={formatNullableValue(oncologyCase.stage)}
              inline={true}
            />
          </div>
          <div className="cardBlockField">
            <CardField
              label="Значение Tumor"
              value={formatNullableValue(oncologyCase.tumorValue)}
              inline={true}
            />
            <CardField
              label="Значение Nodus"
              value={formatNullableValue(oncologyCase.nodusValue)}
              inline={true}
            />
            <CardField
              label="Значение Metastatsis"
              value={formatNullableValue(oncologyCase.metastasisValue)}
              inline={true}
            />
          </div>
          <div className="cardBlockField">
            <CardField
              label="Выявления метастазов"
              value={
                oncologyCase.isMetastasisDetected === null
                  ? "—"
                  : oncologyCase.isMetastasisDetected
                    ? "Да"
                    : "Нет"
              }
              inline={true}
            />
            <CardField
              label="Суммарная очаговая доза"
              value={formatNullableValue(oncologyCase.totalFocusDose)}
              inline={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};
