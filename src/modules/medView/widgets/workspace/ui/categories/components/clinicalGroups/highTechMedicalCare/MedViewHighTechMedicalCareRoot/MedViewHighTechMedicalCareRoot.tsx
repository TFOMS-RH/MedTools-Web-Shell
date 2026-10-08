import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useHighTechMedicalCareQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/clinicalGroups/useHighTechMedicalCareQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewHighTechMedicalCareBody } from "../MedViewHighTechMedicalCareBody/MedViewHighTechMedicalCareBody";
import { MedViewHighTechMedicalCareHeader } from "../MedViewHighTechMedicalCareHeader/MedViewHighTechMedicalCareHeader";

export const MedViewHighTechMedicalCareRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: highTechMedicalCare,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useHighTechMedicalCareQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: highTechMedicalCare === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <MedViewHighTechMedicalCareHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о ВМП"
          variant="empty"
        />
      ) : (
        <MedViewHighTechMedicalCareBody
          highTechMedicalCare={highTechMedicalCare!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
