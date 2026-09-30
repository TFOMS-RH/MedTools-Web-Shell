import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useInsuranceQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/patient/useInsuranceQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";

import { InsuranceBody } from "../InsuranceBody/InsuranceBody";
import { InsuranceHeader } from "../InsuranceHeader/InsuranceHeader";

export const InsuranceRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: insurance,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useInsuranceQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: insurance === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <InsuranceHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о СМО"
          variant="empty"
        />
      ) : (
        <InsuranceBody insurance={insurance!} isPending={isPending} />
      )}
    </article>
  );
};
