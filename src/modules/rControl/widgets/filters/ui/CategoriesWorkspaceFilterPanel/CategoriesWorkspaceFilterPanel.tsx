import type { RControlCategoryId } from "../../../workspace/model/types/categories/CategoryId";
import styles from "./styles.module.scss";
import { AppSelect } from "../../../../../../components/ui/Select/AppSelect";
import { useWorkspaceStore } from "../../../workspace/model/store/useWorkspaceStore";

export const CategoriesWorkspaceFilterPanel = () => {
  const { setTargetCategory, targetCategory } = useWorkspaceStore();
  return (
    <section className={styles.categoryPanelRoot}>
      <p className={styles.title}>Категории данных</p>
      <AppSelect
        label="Категория"
        value={targetCategory === "default" ? "" : targetCategory}
        disabled={false}
        onChange={(value: string) =>
          setTargetCategory(value as RControlCategoryId)
        }
        options={[
          { label: "Пациент", value: "patient" },
          { label: "Детали случая", value: "case-details" },
          { label: "Онкология", value: "oncology" },
          { label: "Назначения / направления", value: "prescriptions" },
          { label: "КСГ / ВМП", value: "clinical-groups" },
          { label: "Оказанные услуги", value: "provided-services" },
          { label: "Дефекты / Санкции", value: "defects" },
        ]}
      />
    </section>
  );
};
