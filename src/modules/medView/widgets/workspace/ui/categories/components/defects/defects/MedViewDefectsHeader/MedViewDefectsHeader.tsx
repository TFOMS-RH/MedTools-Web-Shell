import { AppTablePagination } from "../../../../../../../../../../shared/ui/AppTablePagination/AppTablePagination";
import styles from "./styles.module.scss";

interface DefectsHeaderProps {
  page: number;
  pageSize: number;
  totalCount: number;
  isFetching: boolean;
  onPageChange: (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const MedViewDefectsHeader = ({
  page,
  pageSize,
  totalCount,
  isFetching,
  onPageChange,
  onRowsPerPageChange,
}: DefectsHeaderProps) => {
  return (
    <header className={styles.defectsHeader}>
      <h2>Дефекты</h2>
      <AppTablePagination
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        pagination={{
          page: page,
          pageSize: pageSize,
        }}
        totalCount={totalCount}
        disabled={isFetching}
      />
    </header>
  );
};
