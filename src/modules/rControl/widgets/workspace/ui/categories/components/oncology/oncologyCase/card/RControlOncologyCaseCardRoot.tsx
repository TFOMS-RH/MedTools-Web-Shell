import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useOncologyCaseQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useOncologyCaseQuery";
import { useRControlWorkspaceStore } from "../../../../../../model/store/useRControlWorkspaceStore";
import { RControlOncologyCaseCardBody } from "./RControlOncologyCaseCardBody";
import { RControlOncologyCaseCardHeader } from "./RControlOncologyCaseCardHeader";

export const RControlOncologyCaseCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedMedicalCaseUid } = useRControlWorkspaceStore();
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
      <RControlOncologyCaseCardHeader />
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
        <RControlOncologyCaseCardBody
          oncologyCase={oncologyCase!}
          isPending={isPending}
        />
      )}
    </section>
  );
};
