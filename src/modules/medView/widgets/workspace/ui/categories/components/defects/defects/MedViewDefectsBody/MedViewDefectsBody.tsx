import type { DefectDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/defects/GetDefectsResult";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import { TableSkeleton } from "../../../../../../../../../../shared/ui/TableSkeleton/TableSkeleton";

interface DefectsBodyProps {
  defects: DefectDto[];
  pageSize: number;
  isPending: boolean;
}

export const MedViewDefectsBody = ({
  defects,
  pageSize,
  isPending,
}: DefectsBodyProps) => {
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
