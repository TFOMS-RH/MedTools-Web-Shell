import { resolveDataState } from "../../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../../shared/ui/DataState/DataState";
import { useInjectionsQuery } from "../../../../../../../../../../rControl/widgets/workspace/model/queries/categories/oncology/useInjectionsQuery";
import { useMedViewFiltersStore } from "../../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../../model/stores/useMedViewStore";
import { MedViewInjectionsBody } from "../MedViewInjectionsBody/MedViewInjectionsBody";
import { MedViewInjectionsHeader } from "../MedViewInjectionsHeader/MedViewInjectionsHeader";

export const MedViewInjectionsRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicationUid } = useMedViewStore();
  const {
    data: injections,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useInjectionsQuery(selectedMedicationUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicationUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: injections?.length === 0 && isSuccess,
  });

  return (
    <section className="cardRoot">
      <MedViewInjectionsHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Лекарственный препарат не содержит информации о инъекциях"
          variant="empty"
        />
      ) : (
        <MedViewInjectionsBody
          injections={injections ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
