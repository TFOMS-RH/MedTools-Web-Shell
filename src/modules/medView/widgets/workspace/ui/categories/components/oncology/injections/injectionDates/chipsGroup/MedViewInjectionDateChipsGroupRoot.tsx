import { resolveDataState } from "../../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../../shared/ui/DataState/DataState";
import { useInjectionDatesQuery } from "../../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useInjectionDatesQuery";
import { useMedViewFiltersStore } from "../../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewWorkspaceStore } from "../../../../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewInjectionDateChipsGroupHeader } from "./MedViewInjectionDateChipsGroupHeader";
import { MedViewInjectionDateChips } from "./MedViewInjectionDateChips";

export const MedViewInjectionDateChipsGroupRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicationUid } = useMedViewWorkspaceStore();
  const {
    data: injectionDates,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useInjectionDatesQuery(selectedMedicationUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicationUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: injectionDates?.length === 0 && isSuccess,
  });

  return (
    <section className="cardRoot">
      <MedViewInjectionDateChipsGroupHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Лекарственный препарат не содержит сведений о датах введения"
          variant="empty"
        />
      ) : (
        <MedViewInjectionDateChips injectionDates={injectionDates ?? []} />
      )}
    </section>
  );
};
