import { resolveDataState } from "../../../../../../../../shared/helpers/resolveDataState";
import { DataState } from "../../../../../../../../shared/ui/DataState/DataState";
import { useFiltersStore } from "../../../../../filters/model/store/useFiltersStore";
import { useInvoiceSummaryQuery } from "../../../../model/queries/core/useInvoiceSummaryQuery";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { RControlInvoiceSummaryCardHeader } from "./RControlInvoiceSummaryCardHeader";
import { RControlInvoiceSummaryCardBody } from "./RControlInvoiceSummaryCardBody";

export const RControlInvoiceSummaryCardRoot = () => {
  const { targetDb } = useFiltersStore();
  const { selectedInvoiceUid } = useWorkspaceStore();
  const {
    data: invoiceSummary,
    isLoading,
    isPending,
    isError,
    isSuccess,
    error,
  } = useInvoiceSummaryQuery(selectedInvoiceUid, targetDb);

  const dataState = resolveDataState({
    isEnabled: selectedInvoiceUid !== null && targetDb !== null,
    isError,
    isLoading,
    isSuccess,
    isEmpty: invoiceSummary === null && isSuccess,
  });

  return (
    <article
      className="cardRoot"
      style={{ flexDirection: "column", alignSelf: "flex-start" }}
    >
      <RControlInvoiceSummaryCardHeader />
      {dataState === "waiting" ? (
        <DataState
          title="Выберите счет"
          description="Нажмите на строку в таблице счетов для просмотра подробной информации по счету"
          variant="waiting"
        />
      ) : dataState === "error" ? (
        <DataState
          title="Ошибка данных"
          description={error?.message ?? "Неизвестная ошибка"}
          variant="error"
        />
      ) : dataState === "empty" ? (
        <DataState
          title="Данных не найдено"
          description="Подробных данных о счете не найдено"
          variant="empty"
        />
      ) : (
        <RControlInvoiceSummaryCardBody
          invoiceSummary={invoiceSummary!}
          isPending={isPending}
        />
      )}
    </article>
  );
};
