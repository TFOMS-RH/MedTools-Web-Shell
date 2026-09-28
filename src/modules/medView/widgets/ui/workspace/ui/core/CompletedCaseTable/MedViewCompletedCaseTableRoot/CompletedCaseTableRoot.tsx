import { Divider } from "../../../../../../../../../components/ui/Divider/Divider";
import { resolveDataState } from "../../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../../shared/ui/DataState/DataState";
import { useCompletedCasesQuery } from "../../../../../../model/queries/useCompletedCasesQuery";
import { useMedViewStore } from "../../../../../../model/stores/useMedViewStore";
import { MedViewCompletedCaseTableBody } from "../MedViewCompletedCaseTableBody/MedViewCompletedCaseTableBody";
import { MedViewCompletedCaseTableHeader } from "../MedViewCompletedCaseTableHeader/MedViewCompletedCaseTableHeader";
import styles from "./styles.module.scss";

export const MedViewCompletedCaseTableRoot = () => {
  const {
    appliedFilters,
    completedCasePaginationState,
    setCompletedCasesTablePagination,
  } = useMedViewStore();
  const {
    data: getCompletedCasesResult,
    isPending,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
  } = useCompletedCasesQuery(appliedFilters);

  const completedCases = getCompletedCasesResult?.completedCases ?? [];

  const dataState = resolveDataState({
    isEnabled: appliedFilters !== null,
    isEmpty: completedCases.length === 0,
    isError: isError,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isFetching: isFetching,
  });

  const onPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    if (page >= 0) {
      setCompletedCasesTablePagination({
        page: page,
      });
    }
  };

  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setCompletedCasesTablePagination({
      pageSize: newPageSize,
      page: 0,
    });
  };

  return (
    <section className={styles.CompletedCasesTableRoot}>
      <MedViewCompletedCaseTableHeader
        totalCount={0}
        pagination={completedCasePaginationState}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        disabled={isFetching}
        isLoading={isLoading}
      />
      <Divider />

      {dataState === "waiting" ? (
        <DataState
          variant="waiting"
          title="Примените фильтры"
          description="Просто укажите по каким полям будем искать случаи"
        />
      ) : dataState === "error" ? (
        <DataState
          variant="error"
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
        />
      ) : dataState === "empty" ? (
        <DataState
          variant="empty"
          title="Данных не найдено"
          description="Законченные случаи не найдены по выбранному счету"
        />
      ) : (
        <MedViewCompletedCaseTableBody
          isPending={isPending}
          completedCases={completedCases}
        />
      )}
    </section>
  );
};
