import { resolveDataState } from "../../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../model/store/useRControlWorkspacePanelStore";
import { useInjectionDatesQuery } from "../../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useInjectionDatesQuery";
import { useRControlWorkspaceStore } from "../../../../../../../model/store/useRControlWorkspaceStore";
import { RControlInjectionDateChipsGroupHeader } from "./RControlInjectionDateChipsGroupHeader";
import { RControlInjectionDateChips } from "./RControlInjectionDateChips";
import { RControlInjectionDateChipSkeletons } from "./RControlInjectionDateChipSkeletons";

export const RControlInjectionDateChipsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicationUid } = useRControlWorkspaceStore();
  const {
    data: injectionDates,
    isLoading,
    isPending,
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
      <RControlInjectionDateChipsGroupHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : isLoading ? (
        <RControlInjectionDateChipSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Лекарственный препарат не содержит сведений о датах введения"
          variant="empty"
        />
      ) : (
        <RControlInjectionDateChips
          injectionDates={injectionDates ?? []}
          isPending={isPending}
        />
      )}
    </section>
  );
};
