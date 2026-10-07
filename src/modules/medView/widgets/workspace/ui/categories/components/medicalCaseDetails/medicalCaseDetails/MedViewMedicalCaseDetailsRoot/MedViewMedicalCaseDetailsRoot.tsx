import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useMedicalCaseDetailsQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/medicalCaseDetails/useMedicalCaseDetailsQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedicalCaseDetailsBody } from "../MedViewMedicalCaseDetailsBody/MedViewMedicalCaseDetailsBody";
import { MedicalCaseDetailsHeader } from "../MedViewMedicalCaseDetailsHeader/MedViewMedicalCaseDetailsHeader";

export const MedicalCaseDetailsRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: medicalCaseDetails,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMedicalCaseDetailsQuery(selectedMedicalCaseUid, targetDb);
  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: medicalCaseDetails === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <MedicalCaseDetailsHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о деталях медицинского случая"
          variant="empty"
        />
      ) : (
        <MedicalCaseDetailsBody
          medicalCaseDetails={medicalCaseDetails!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
