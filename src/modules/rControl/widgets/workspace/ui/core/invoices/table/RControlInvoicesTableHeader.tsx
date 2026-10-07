import type { DataState } from "../../../../../../../../shared/types/DataState";
import type { PaginationState } from "../../../../../../../../shared/types/PaginationState";
import { AppTablePagination } from "../../../../../../../../shared/ui/AppTablePagination/AppTablePagination";
import { SearchInput } from "../../../../../../../../shared/ui/SearchInput/SearchInput";
import { StatusBadge } from "../../../../../../../../shared/ui/StatusBadge/StatusBadge";
import { useRControlWorkspaceStore } from "../../../../model/store/useRControlWorkspaceStore";
import { useState } from "react";
import styles from "./styles.module.scss";

interface RControlInvoicesTableHeaderProps {
  totalCount: number;
  state: DataState;
  pagination: PaginationState;
  onRowsPerPageChange: (
    _event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onPageChange: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const RControlInvoicesTableHeader = ({
  totalCount,
  state,
  pagination,
  onRowsPerPageChange,
  onPageChange,
  isLoading,
  disabled,
}: RControlInvoicesTableHeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { setInvoicesSearch } = useRControlWorkspaceStore();

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    setInvoicesSearch(searchValue);
  };

  return (
    <header className={styles.invoicesTableHeader}>
      <div className={styles.titleGroup}>
        <h2>Счета</h2>
        <StatusBadge state={state} />
      </div>
      <SearchInput
        searchValue={searchValue}
        onChange={onChangeSearchValue}
        onSearch={onSearch}
      />
      <AppTablePagination
        pagination={pagination}
        totalCount={totalCount}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
        isLoading={isLoading}
        disabled={disabled}
      />
    </header>
  );
};
