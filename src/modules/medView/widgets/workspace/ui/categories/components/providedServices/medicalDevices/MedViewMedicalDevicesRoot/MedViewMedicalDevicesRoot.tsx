import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedicalDevicesQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/providedServices/useMedicalDevicesQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewWorkspaceStore";
import { MedViewMedicalDevicesBody } from "../MedViewMedicalDevicesBody/MedViewMedicalDevicesBody";
import { MedViewMedicalDevicesHeader } from "../MedViewMedicalDevicesHeader/MedViewMedicalDevicesHeader";

export const MedViewMedicalDevicesRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedProvidedServiceUid } = useMedViewStore();
  const {
    data: medicalDevices,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMedicalDevicesQuery(selectedProvidedServiceUid, targetDb);
  const dataState = resolveDataState({
    isEnabled: selectedProvidedServiceUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: medicalDevices?.length === 0 && isSuccess,
  });

  return (
    <div className="cardRoot">
      <MedViewMedicalDevicesHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Оказанная услуга не содержит информации о медицинских изделиях"
          variant="empty"
        />
      ) : (
        <MedViewMedicalDevicesBody
          isPending={isPending}
          medicalDevices={medicalDevices ?? []}
        />
      )}
    </div>
  );
};
