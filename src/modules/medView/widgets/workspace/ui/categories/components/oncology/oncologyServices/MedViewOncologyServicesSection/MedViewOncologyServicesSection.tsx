import { resolveDataState } from "../../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../../shared/ui/DataState/DataState";
import { useOncologyServicesQuery } from "../../../../../../../../../rControl/widgets/workspace/model/queries/categories/oncology/useOncologyServicesQuery";
import { useMedViewFiltersStore } from "../../../../../../../filters/model/stores/useMedViewFiltersStore";
import { MedViewOncologyServicesCards } from "../MedViewOncologyServicesCards/MedViewOncologyServicesCards";

interface OncologyServicesSectionProps {
  oncologyCaseUid: number | null;
  selectedOncologyServiceUid: number | null;
  selectOncologyService: (oncologyServiceUid: number | null) => void;
}

export const MedViewOncologyServicesSection = ({
  oncologyCaseUid,
  selectedOncologyServiceUid,
  selectOncologyService,
}: OncologyServicesSectionProps) => {
  const { targetDb } = useMedViewFiltersStore();
  const {
    data: oncologyServices,
    isLoading,
    isPending,
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
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Онкологический случай не содержит онкологических услуг"
          variant="empty"
        />
      ) : (
        <MedViewOncologyServicesCards
          isPending={isPending}
          oncologyServices={oncologyServices ?? []}
          selectOncologyService={selectOncologyService}
          selectedOncologyServiceUid={selectedOncologyServiceUid}
        />
      )}
    </>
  );
};
