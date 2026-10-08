import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useProvidedServicesQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/providedServices/useProvidedServicesQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewProvidedServicesCards } from "../MedViewProvidedServicesCards/MedViewProvidedServicesCards";

export const MedViewProvidedServicesSection = () => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    selectedMedicalCaseUid,
    selectedProvidedServiceUid,
    selectProvidedService,
  } = useMedViewStore();
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
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о предоставленных услугах"
          variant="empty"
        />
      ) : (
        <MedViewProvidedServicesCards
          isPending={isPending}
          providedSevices={providedServices ?? []}
          selectedProvidedServiceUid={selectedProvidedServiceUid}
          selectProvidedService={selectProvidedService}
        />
      )}
    </>
  );
};
