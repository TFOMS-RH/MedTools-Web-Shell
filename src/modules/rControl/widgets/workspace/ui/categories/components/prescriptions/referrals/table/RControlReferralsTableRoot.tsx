import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useReferralsQuery } from "../../../../../../model/queries/categories/prescriptions/useReferralsQuery";
import { useWorkspaceStore } from "../../../../../../model/store/useWorkspaceStore";
import { RControlReferralsTableBody } from "./RControlReferralsTableBody";
import { RControlReferralsTableHeader } from "./RControlReferralsTableHeader";

export const RControlReferralsTableRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useWorkspaceStore();
  const {
    data: referrals,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useReferralsQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: referrals?.length === 0 && isSuccess,
  });

  return (
    <section className="cardRoot">
      <RControlReferralsTableHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о направлениях"
          variant="empty"
        />
      ) : (
        <RControlReferralsTableBody
          referrals={referrals ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
