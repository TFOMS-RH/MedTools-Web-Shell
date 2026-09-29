import { DataState } from "../../../../../../../shared/ui/DataState/DataState";
import styles from "./styles.module.scss";

const NoneFiltersGroup = () => {
  return (
    <section className={styles.noneFiltersGroup}>
      <DataState
        variant="waiting"
        title="Выберите группу фильтров"
        description="Для отображения фильтров выберите группу в списке слева"
      />
    </section>
  );
};

export default NoneFiltersGroup;
