import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useWorkspaceStore } from "../../../../../../model/store/useWorkspaceStore";
import { useProvidedServicesQuery } from "../../../../../../model/queries/categories/providedServices/useProvidedServicesQuery";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { RControlProvidedServiceCards } from "./RControlProvidedServiceCards";
import { RControlProvidedServiceCardSkeletons } from "./RControlProvidedServiceCardSkeletons";

export const RControlProvidedServiceCardsGroupRoot = () => {
  const { targetDb } = useFiltersStore();
  const {
    selectedMedicalCaseUid,
    selectedProvidedServiceUid,
    selectProvidedService,
  } = useWorkspaceStore();
  const {
    data: providedServices,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useProvidedServicesQuery(selectedMedicalCaseUid, targetDb);
  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: providedServices?.length === 0 && isSuccess,
  });

  return (
    <>
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизсвестная ошибка"}
          variant="error"
        />
      ) : isLoading ? (
        <RControlProvidedServiceCardSkeletons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о предоставленных услугах"
          variant="empty"
        />
      ) : (
        <RControlProvidedServiceCards
          isPending={isPending}
          providedSevices={providedServices ?? []}
          selectedProvidedServiceUid={selectedProvidedServiceUid}
          selectProvidedService={selectProvidedService}
        />
      )}
    </>
  );
};
