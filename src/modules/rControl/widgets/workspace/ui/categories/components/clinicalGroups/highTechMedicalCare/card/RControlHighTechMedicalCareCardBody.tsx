import type { HighTechMedicalCareDto } from "../../../../../../model/types/categories/clinicalGroup/GetHighTechMedicalCareResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";

interface RControlHighTechMedicalCareCardBodyProps {
  highTechMedicalCare: HighTechMedicalCareDto;
  isPending: boolean;
}

export const RControlHighTechMedicalCareCardBody = ({
  highTechMedicalCare,
  isPending,
}: RControlHighTechMedicalCareCardBodyProps) => {
  return (
    <div className="cardContent">
      {isPending ? (
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField label="Вид" value={<Skeleton />} inline={true} />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField label="Метод" value={<Skeleton />} inline={true} />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата выдачи талона"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер талона"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата планируемой госпитализации"
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
                label="Вид"
                value={highTechMedicalCare.highTechCareTypeCode ?? "—"}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Метод"
                value={highTechMedicalCare.highTechCareMethodCode ?? "—"}
                inline={true}
              />
            </div>
          </div>
          <div className="cardLine">
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата выдачи талона"
                value={
                  highTechMedicalCare.voucherIssueDate
                    ? dayjs(highTechMedicalCare.voucherIssueDate).format(
                        "DD.MM.YYYY",
                      )
                    : "—"
                }
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Номер талона"
                value={highTechMedicalCare.voucherNumber ?? "—"}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата планируемой госпитализации"
                value={
                  highTechMedicalCare.plannedAdmissionDate
                    ? dayjs(highTechMedicalCare.plannedAdmissionDate).format(
                        "DD.MM.YYYY",
                      )
                    : "—"
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
