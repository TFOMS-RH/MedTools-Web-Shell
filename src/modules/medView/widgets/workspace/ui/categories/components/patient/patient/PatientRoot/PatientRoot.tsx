import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { usePatientQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/patient/usePatientQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";

import { PatientBody } from "../PatientBody/PatientBody";
import { PatientHeader } from "../PatientHeader/PatientHeader";

export const PatientRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();

  const {
    data: patient,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = usePatientQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: patient === null && isSuccess,
  });

  return (
    <article className="cardRoot">
      <PatientHeader />

      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации о пациенте"
          variant="empty"
        />
      ) : (
        <PatientBody patient={patient!} isPending={isPending} />
      )}
    </article>
  );
};
