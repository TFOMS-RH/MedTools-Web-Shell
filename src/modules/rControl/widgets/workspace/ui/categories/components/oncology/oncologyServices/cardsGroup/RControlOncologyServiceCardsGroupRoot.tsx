import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../../../filters/model/store/useFiltersStore";
import { useOncologyServicesQuery } from "../../../../../../../../../../shared/model/queries/invoiceStructure/oncology/useOncologyServicesQuery";
import { RControlOncologyServiceCards } from "./RControlOncologyServiceCards";
import { RControlOncologyServiceCardSkelentons } from "./RControlOncologyServiceCardSkelentons";

interface RControlOncologyServiceCardsGroupRootProps {
  oncologyCaseUid: number | null;
  selectedOncologyServiceUid: number | null;
  selectOncologyService: (oncologyServiceUid: number | null) => void;
}

export const RControlOncologyServiceCardsGroupRoot = ({
  oncologyCaseUid,
  selectedOncologyServiceUid,
  selectOncologyService,
}: RControlOncologyServiceCardsGroupRootProps) => {
  const { targetDb } = useFiltersStore();
  const {
    data: oncologyServices,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useOncologyServicesQuery(oncologyCaseUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: oncologyCaseUid !== null && targetDb !== null,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    isEmpty: oncologyServices?.length === 0 && isSuccess,
  });

  return (
    <>
      {dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : isLoading ? (
        <RControlOncologyServiceCardSkelentons />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Онкологический случай не содержит онкологических услуг"
          variant="empty"
        />
      ) : (
        <RControlOncologyServiceCards
          oncologyServices={oncologyServices ?? []}
          selectOncologyService={selectOncologyService}
          selectedOncologyServiceUid={selectedOncologyServiceUid}
        />
      )}
    </>
  );
};
