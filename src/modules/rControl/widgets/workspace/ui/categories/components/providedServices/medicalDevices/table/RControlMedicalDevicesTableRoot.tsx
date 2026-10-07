import { RControlMedicalDevicesTableHeader } from "./RControlMedicalDevicesTableHeader";
import { RControlMedicalDevicesTableBody } from "./RControlMedicalDevicesTableBody";
import { useMedicalDevicesQuery } from "../../../../../../model/queries/categories/providedServices/useMedicalDevicesQuery";
import { useWorkspaceStore } from "../../../../../../model/store/useWorkspaceStore";
import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";

export const RControlMedicalDevicesTableRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedProvidedServiceUid } = useWorkspaceStore();
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
