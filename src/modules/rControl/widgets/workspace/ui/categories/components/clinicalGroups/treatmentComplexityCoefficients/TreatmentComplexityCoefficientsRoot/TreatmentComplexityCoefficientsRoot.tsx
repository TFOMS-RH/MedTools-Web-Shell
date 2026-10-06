import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../../../../../medView/widgets/filters/model/stores/useMedViewFiltersStore";
import { useTreatmentComplexityCoefficientsQuery } from "../../../../../../model/queries/categories/clinicalGroups/useTreatmentComplexityCoefficientsQuery";
import { TreatmentComplexityCoefficientsBody } from "../TreatmentComplexityCoefficientsBody/TreatmentComplexityCoefficientsBody";
import { TreatmentComplexityCoefficientsHeader } from "../TreatmentComplexityCoefficientsHeader/TreatmentComplexityCoefficientsHeader";

interface TreatmentComplexityCoefficientsRootProps {
  clinicalGroupUid: number | null;
}

export const TreatmentComplexityCoefficientsRoot = ({
  clinicalGroupUid,
}: TreatmentComplexityCoefficientsRootProps) => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: treatmentComplexityCoefficients,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useTreatmentComplexityCoefficientsQuery(clinicalGroupUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: clinicalGroupUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: treatmentComplexityCoefficients?.length === 0 && isSuccess,
  });

  return (
    <article className="cardRoot">
      <TreatmentComplexityCoefficientsHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Клиническая группа не содержит информации о КСЛП"
          variant="empty"
        />
      ) : (
        <TreatmentComplexityCoefficientsBody
          treatmentComplexityCoefficients={
            treatmentComplexityCoefficients ?? []
          }
          isPending={isPending}
        />
      )}
    </article>
  );
};
