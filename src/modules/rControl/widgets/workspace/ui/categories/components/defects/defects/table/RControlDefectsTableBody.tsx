import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { TableSkeleton } from "../../../../../../../../../../shared/ui/TableSkeleton/TableSkeleton";
import type { DefectDto } from "../../../../../../../../../../shared/model/types/invoiceStructure/results/defects/GetDefectsResult";

interface RControlDefectsTableBodyProps {
  defects: DefectDto[];
  pageSize: number;
  isPending: boolean;
}

export const RControlDefectsTableBody = ({
  defects,
  pageSize,
  isPending,
}: RControlDefectsTableBodyProps) => {
  return (
    <div className="cardContent">
      <div className="tableContainer">
        <table>
          <colgroup>
            <col style={{ width: "10rem" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Код</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <TableSkeleton columns={2} rows={pageSize} />
            ) : (
              defects.map((defect) => (
                <tr key={defect.defectUid} className="noneHover">
                  <td>{formatNullableValue(defect.code)}</td>
                  <td>{defect.comment}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
