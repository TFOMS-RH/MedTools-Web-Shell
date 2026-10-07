import type { InjectionDto } from "../../../../../../../model/types/categories/oncology/GetInjectionsResult";
import { TableSkeleton } from "../../../../../../../../../../../shared/ui/TableSkeleton/TableSkeleton";
import { formatNullableValue } from "../../../../../../../../../../../shared/helpers/formatNullableValue";
import { formatCurrency } from "../../../../../../../../../../../shared/helpers/formatCurrency";
import { formatDate } from "../../../../../../../../../../../shared/helpers/formatDate";

interface RControlInjectionsTableBodyProps {
  injections: InjectionDto[];
  isPending: boolean;
}

export const RControlInjectionsTableBody = ({
  injections,
  isPending,
}: RControlInjectionsTableBodyProps) => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Дата инъекции</th>
            <th>Количество в. л. п.</th>
            <th>Количество и. л. п.</th>
            <th>Факт. стоимость л.п.</th>
            <th>Стоимость в. л. п.</th>
            <th>Стоимость и. л. п.</th>
            <th>Редукция применялась</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <TableSkeleton columns={7} rows={5} />
          ) : (
            injections.map((injection) => (
              <tr key={injection.injectionUid} className="noneHover">
                <td>{formatDate(injection.administrationDate)}</td>
                <td>{formatNullableValue(injection.administeredQuantity)}</td>
                <td>{formatNullableValue(injection.consumedQuantity)}</td>
                <td>{formatCurrency(injection.unitCost)}</td>
                <td>{formatCurrency(injection.administeredCost)}</td>
                <td>{formatCurrency(injection.consumedCost)}</td>
                <td>
                  {injection.isReductionApplied === null
                    ? "-"
                    : injection.isReductionApplied
                      ? "Да"
                      : "Нет"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
