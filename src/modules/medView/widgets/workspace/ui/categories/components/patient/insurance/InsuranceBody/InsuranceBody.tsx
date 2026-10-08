import type { InsuranceDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/patient/GetInsuranceResult";
import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";

interface InsuranceBodyProps {
  insurance: InsuranceDto;
  isPending: boolean;
}

export const InsuranceBody = ({ insurance, isPending }: InsuranceBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Реестровый номер СМО"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование СМО"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField label="ОГРН" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="ОКАТО" value={<Skeleton />} inline={true} />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер полиса (старый)"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер полиса (новый)"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Серия полиса"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Тип полиса"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Реестровый номер СМО"
                value={formatNullableValue(insurance.insuranceCompanyCode)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Наименование СМО"
                value={formatNullableValue(insurance.insuranceCompanyName)}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="ОГРН"
                value={formatNullableValue(insurance.ogrn)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="ОКАТО"
                value={formatNullableValue(insurance.okato)}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер полиса (старый)"
                value={formatNullableValue(
                  insurance.insurancePolicyUnifiedNumber,
                )}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер полиса (новый)"
                value={formatNullableValue(insurance.insurancePolicyNumber)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Серия полиса"
                value={formatNullableValue(insurance.insurancePolicySeries)}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Тип полиса"
                value={`${insurance.insurancePolicyTypeCode} : ${insurance.insurancePolicyTypeName}`}
                inline={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
