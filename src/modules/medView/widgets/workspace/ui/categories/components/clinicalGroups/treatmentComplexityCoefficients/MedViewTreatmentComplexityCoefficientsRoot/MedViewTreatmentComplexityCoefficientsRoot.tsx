import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useTreatmentComplexityCoefficientsQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/clinicalGroups/useTreatmentComplexityCoefficientsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { MedViewTreatmentComplexityCoefficientsBody } from "../MedViewTreatmentComplexityCoefficientsBody/MedViewTreatmentComplexityCoefficientsBody";
import { MedViewTreatmentComplexityCoefficientsHeader } from "../MedViewTreatmentComplexityCoefficientsHeader/MedViewTreatmentComplexityCoefficientsHeader";

interface TreatmentComplexityCoefficientsRootProps {
  clinicalGroupUid: number | null;
}

export const MedViewTreatmentComplexityCoefficientsRoot = ({
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
      <MedViewTreatmentComplexityCoefficientsHeader />
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
        <MedViewTreatmentComplexityCoefficientsBody
          treatmentComplexityCoefficients={
            treatmentComplexityCoefficients ?? []
          }
          isPending={isPending}
        />
      )}
    </article>
  );
};
