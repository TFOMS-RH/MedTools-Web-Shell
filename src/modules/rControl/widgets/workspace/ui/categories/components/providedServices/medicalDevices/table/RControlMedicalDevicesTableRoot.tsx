import { RControlMedicalDevicesTableHeader } from "./RControlMedicalDevicesTableHeader";
import { RControlMedicalDevicesTableBody } from "./RControlMedicalDevicesTableBody";
import { useMedicalDevicesQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/providedServices/useMedicalDevicesQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { useFiltersStore } from "../../../../../../model/store/useRControlWorkspacePanelStore";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";

export const RControlMedicalDevicesTableRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedProvidedServiceUid } = useRControlWorkspaceStore();
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
      <RControlMedicalDevicesTableHeader />
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
        <RControlMedicalDevicesTableBody
          isPending={isPending}
          medicalDevices={medicalDevices ?? []}
        />
      )}
    </div>
  );
};
