import type { PaginationState } from "../../../../../../../../shared/types/PaginationState";
import type { DataState } from "../../../../../../../../shared/types/DataState";
import { AppTablePagination } from "../../../../../../../../shared/ui/AppTablePagination/AppTablePagination";
import { useWorkspaceStore } from "../../../../model/store/useWorkspaceStore";
import { SearchInput } from "../../../../../../../../shared/ui/SearchInput/SearchInput";
import { StatusBadge } from "../../../../../../../../shared/ui/StatusBadge/StatusBadge";
import { useState } from "react";
import styles from "./styles.module.scss";

interface RControlCompletedCasesTableHeaderProps {
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

export const RControlCompletedCasesTableHeader = ({
  totalCount,
  state,
  pagination,
  onRowsPerPageChange,
  onPageChange,
  isLoading,
  disabled,
}: RControlCompletedCasesTableHeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { setCompletedCasesSearch } = useWorkspaceStore();

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    setCompletedCasesSearch(searchValue);
  };

  return (
    <header className={styles.completedCasesTableHeader}>
      <div className={styles.titleGroup}>
        <h2>Законченные случаи</h2>
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
