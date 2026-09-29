import type { PaginationState } from "../../../../../../../shared/types/PaginationState";
import { AppTablePagination } from "../../../../../../../shared/ui/AppTablePagination/AppTablePagination";
import styles from "./styles.module.scss";

interface MedViewCompletedCaseTableHeaderProps {
  totalCount: number;
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

export const MedViewCompletedCaseTableHeader = ({
  totalCount,
  pagination,
  onRowsPerPageChange,
  onPageChange,
  isLoading,
  disabled,
}: MedViewCompletedCaseTableHeaderProps) => {
  return (
    <header className={styles.completedCasesTableHeader}>
      <div className={styles.titleGroup}>
        <h2>Законченные случаи</h2>
      </div>
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
