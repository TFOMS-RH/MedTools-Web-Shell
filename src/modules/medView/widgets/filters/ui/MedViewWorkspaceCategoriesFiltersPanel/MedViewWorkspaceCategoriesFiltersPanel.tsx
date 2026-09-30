import type { MedViewCategoryId } from "../../../../../rControl/widgets/workspace/model/types/categories/CategoryId";
import { AppSelect } from "../../../../../../components/ui/Select/AppSelect";
import { useMedViewStore } from "../../../workspace/model/stores/useMedViewStore";

import styles from "./styles.module.scss";

export const MedViewWorkspaceCategoriesFiltersPanel = () => {
  const { setTargetCategory, targetCategory } = useMedViewStore();
  return (
    <section className={styles.categoryPanelRoot}>
      <p className={styles.title}>Категории данных</p>
      <AppSelect
        label="Категория"
        value={targetCategory === "default" ? "" : targetCategory}
        disabled={false}
        onChange={(value: string) =>
          setTargetCategory(value as MedViewCategoryId)
        }
        options={[
          { label: "Пациент", value: "patient" },
          { label: "Детали случая", value: "case-details" },
          { label: "Онкология", value: "oncology" },
          { label: "Назначения / направления", value: "referrals" },
          { label: "КСГ / ВМП", value: "clinical-groups" },
          { label: "Оказанные услуги", value: "provided-services" },
          { label: "Дефекты / Санкции", value: "defects" },
        ]}
      />
    </section>
  );
};
