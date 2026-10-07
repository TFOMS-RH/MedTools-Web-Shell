import type { InvoiceSummaryDto } from "../../../../../../../../shared/model/types/invoiceStructure/results/invoices/GetInvoiceSummaryResult";
import { formatCurrency } from "../../../../../../../../shared/helpers/formatCurrency";
import { formatDate } from "../../../../../../../../shared/helpers/formatDate";
import { CardField } from "../../../../../../../../shared/ui/CardField/CardField";
import { Divider } from "../../../../../../../../components/ui/Divider/Divider";
import { Skeleton } from "@mui/material";

interface RControlInvoiceSummaryCardBodyProps {
  invoiceSummary: InvoiceSummaryDto;
  isPending: boolean;
}

export const RControlInvoiceSummaryCardBody = ({
  invoiceSummary,
  isPending,
}: RControlInvoiceSummaryCardBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <>
          <div className="cardLineGroup">
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Предъявлено"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Принято ТФОМС"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Принято СМО"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято МЭК"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято МЭЭ"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято ЭКМР"
                  value={<Skeleton />}
                  inline={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято МЭК"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято МЭЭ"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято ЭКМР"
                  value={<Skeleton />}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="cardLineGroup">
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Имя файла"
                  value={<Skeleton />}
                  inline={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Дата выгрузки"
                  value={<Skeleton />}
                  inline={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="UID счета"
                  value={<Skeleton />}
                  inline={true}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cardLineGroup">
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Предъявлено"
                  value={formatCurrency(invoiceSummary.invoiceAmount)}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Принято ТФОМС"
                  value={formatCurrency(invoiceSummary.approvedAmount)}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Принято СМО"
                  value={formatCurrency(
                    invoiceSummary.insuranceCompanyApprovedAmount,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято МЭК"
                  value={formatCurrency(
                    invoiceSummary.medicalEconomicControlPenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято МЭЭ"
                  value={formatCurrency(
                    invoiceSummary.medicalEconomicExpertisePenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="ТФОМС снято ЭКМР"
                  value={formatCurrency(
                    invoiceSummary.medicalCareQualityExpertisePenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято МЭК"
                  value={formatCurrency(
                    invoiceSummary.insuranceCompanyMedicalEconomicControlPenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято МЭЭ"
                  value={formatCurrency(
                    invoiceSummary.insuranceCompanyMedicalEconomicExpertisePenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="СМО снято ЭКМР"
                  value={formatCurrency(
                    invoiceSummary.insuranceCompanyMedicalCareQualityExpertisePenalty,
                  )}
                  inline={true}
                  spaceBetween={true}
                />
              </div>
            </div>
          </div>
          <Divider />
          <div className="cardLineGroup">
            <div className="cardLine">
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Имя файла"
                  value={invoiceSummary.filename}
                  inline={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="Дата выгрузки"
                  value={formatDate(invoiceSummary.invoiceUploadDate)}
                  inline={true}
                />
              </div>
              <div className="cardBlockLineOneGrid">
                <CardField
                  label="UID счета"
                  value={invoiceSummary.invoiceUid}
                  inline={true}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
