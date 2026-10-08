import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useOncologyCaseQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useOncologyCaseQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewOncologyCaseBody } from "../MedViewOncologyCaseBody/MedViewOncologyCaseBody";
import { MedViewOncologyCaseHeader } from "../MedViewOncologyCaseHeader/MedViewOncologyCaseHeader";

export const MedViewOncologyCaseRoot = () => {
  const { targetDb } = useMedViewFiltersStore();
  const { selectedMedicalCaseUid } = useMedViewStore();
  const {
    data: oncologyCase,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useOncologyCaseQuery(selectedMedicalCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedMedicalCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: oncologyCase === null && isSuccess,
  });

  return (
    <section className="cardRoot">
      <MedViewOncologyCaseHeader />
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Медицинский случай не содержит информации об онкологическом случае"
          variant="empty"
        />
      ) : (
        <MedViewOncologyCaseBody
          oncologyCase={oncologyCase!}
          isPending={isPending}
        />
      )}
    </section>
  );
};
