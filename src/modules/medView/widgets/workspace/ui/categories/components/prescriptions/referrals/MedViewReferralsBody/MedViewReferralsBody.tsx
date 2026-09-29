import type { ReferralDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/prescriptions/GetReferralsResult";
import { TableSkeleton } from "../../../../../../../../../../shared/ui/TableSkeleton/TableSkeleton";
import { formatNullableValue } from "../../../../../../../../../../shared/helpers/formatNullableValue";
import dayjs from "dayjs";

interface ReferralsBodyProps {
  referrals: ReferralDto[];
  isPending: boolean;
}

export const ReferralsBody = ({ referrals, isPending }: ReferralsBodyProps) => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr className="noneHover">
            <th>Медицинская организация</th>
            <th>Дата направления</th>
            <th>Вид направления</th>
            <th>Метод диагностического лечения</th>
            <th>Мед. услуга в направлении</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <TableSkeleton columns={5} rows={5} />
          ) : (
            referrals.map((referral) => (
              <tr key={referral.referralUid} className="noneHover">
                <td>{formatNullableValue(referral.referredToMoCode)}</td>
                <td>{dayjs(referral.referralDate).format("DD.MM.YYYY")}</td>
                <td>{referral.referralType}</td>
                <td>{formatNullableValue(referral.diagnosticMethod)}</td>
                <td>{formatNullableValue(referral.referredService)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
