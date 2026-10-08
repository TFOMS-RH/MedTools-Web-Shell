import type { CompletedCaseListItemDto } from "../../../../../../../../shared/model/types/invoiceStructure/results/medicalCases/GetCompletedCaseListItemsResult";
import { formatCurrency } from "../../../../../../../../shared/helpers/formatCurrency";
import { formatNullableValue } from "../../../../../../../../shared/helpers/formatNullableValue";
import { TableSkeleton } from "../../../../../../../../shared/ui/TableSkeleton/TableSkeleton";

interface MedViewCompletedCasesTableBodyProps {
  completedCases: CompletedCaseListItemDto[];
  isPending: boolean;
  totalCount: number;
  selectedCompletedCaseUid: number | null;
  selectCompletedCase: (completedCaseUid: number | null) => void;
}

export const MedViewCompletedCasesTableBody = ({
  completedCases,
  isPending,
  totalCount,
  selectedCompletedCaseUid,
  selectCompletedCase,
}: MedViewCompletedCasesTableBodyProps) => {
  return (
    <div className="tableContainer">
      <table>
        <colgroup>
          <col style={{ width: "1.5rem" }} />
          <col style={{ width: "1.5rem" }} />
          <col style={{ width: "3rem" }} />
          <col style={{ width: "3rem" }} />
          <col style={{ width: "3rem" }} />
          <col style={{ width: "1.5rem" }} />
          <col style={{ width: "3rem" }} />
          <col style={{ width: "3rem" }} />
          <col style={{ width: "2rem" }} />
          <col style={{ width: "2rem" }} />
          <col style={{ width: "2rem" }} />
        </colgroup>
        <thead>
          <tr>
            <th>№ поз.</th>
            <th>№ зап.</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Усл. ок.</th>
            <th>С. полиса</th>
            <th>Н. полиса</th>
            <th>Предъявлено</th>
            <th>Принято</th>
            <th>Принято СМО</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <TableSkeleton columns={11} rows={totalCount} />
          ) : (
            completedCases.map((completedCase) => (
              <tr
                className={
                  completedCase.completedCaseUid === selectedCompletedCaseUid
                    ? "selectedRow"
                    : ""
                }
                onClick={() =>
                  selectCompletedCase(completedCase.completedCaseUid)
                }
                key={completedCase.completedCaseUid}
              >
                <td>{completedCase.entryPositionNumber}</td>
                <td>{completedCase.entryNumber}</td>
                <td>{completedCase.patientLastName}</td>
                <td>{completedCase.patientFirstName}</td>
                <td>{completedCase.patientMiddleName}</td>
                <td>{completedCase.medicalCareConditions}</td>
                <td>
                  {formatNullableValue(completedCase.insurancePolicySeries)}
                </td>
                <td>{completedCase.insurancePolicyNumber}</td>
                <td>{formatCurrency(completedCase.amountBilled)}</td>
                <td>{formatCurrency(completedCase.approvedAmount)}</td>
                <td>
                  {formatCurrency(completedCase.insuranceCompanyApprovedAmount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
