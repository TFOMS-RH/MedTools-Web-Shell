import type { RControlCategoryId } from "../../../../../../shared/model/types/CategoryId";
import { AppSelect } from "../../../../../../components/ui/Select/AppSelect";
import { useRControlWorkspaceStore } from "../../../workspace/model/store/useRControlWorkspaceStore";
import styles from "./styles.module.scss";

export const CategoriesWorkspaceFilterPanel = () => {
  const { setTargetCategory, targetCategory } = useRControlWorkspaceStore();
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
