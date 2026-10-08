import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedViewFiltersStore } from "../../../../../../../../../medView/widgets/filters/model/stores/useMedViewFiltersStore";
import { useTreatmentComplexityCoefficientsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useTreatmentComplexityCoefficientsQuery";
import { RControlTreatmentCoefficientsListBody } from "./RControlTreatmentCoefficientsListBody";
import { RControlTreatmentCoefficientsListHeader } from "./RControlTreatmentCoefficientsListHeader";

interface RControlTreatmentCoefficientsListRootProps {
  clinicalGroupUid: number | null;
}

export const RControlTreatmentCoefficientsListRoot = ({
  clinicalGroupUid,
}: RControlTreatmentCoefficientsListRootProps) => {
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
      <RControlTreatmentCoefficientsListHeader />
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
        <RControlTreatmentCoefficientsListBody
          treatmentComplexityCoefficients={
            treatmentComplexityCoefficients ?? []
          }
          isPending={isPending}
        />
      )}
    </article>
  );
};
