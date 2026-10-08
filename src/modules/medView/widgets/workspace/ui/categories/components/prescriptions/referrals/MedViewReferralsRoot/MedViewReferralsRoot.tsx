import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useReferralsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/prescriptions/useReferralsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewReferralsHeader } from "../MedViewReferralsHeader/MedViewReferralsHeader";
import { ReferralsBody } from "../MedViewReferralsBody/MedViewReferralsBody";

export const MedViewReferralsRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
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
      <MedViewReferralsHeader />
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
        <ReferralsBody referrals={referrals ?? []} isPending={isPending} />
      )}
    </section>
  );
};
