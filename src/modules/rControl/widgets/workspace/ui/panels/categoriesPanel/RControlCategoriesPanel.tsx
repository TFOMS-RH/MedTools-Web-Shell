import { useRControlWorkspaceStore } from "../../../model/store/useRControlWorkspaceStore";
import { RControlCategoryOptionCard } from "./RControlCategoryOptionCard";
import styles from "./styles.module.scss";
import AccessibleIcon from "@mui/icons-material/Accessible";

export const RControlCategoriesPanel = () => {
  const { targetCategory, setTargetCategory } = useRControlWorkspaceStore();

  return (
    <section className={styles.categoriesPanelRoot}>
      <RControlCategoryOptionCard
        label="Пациент"
        optionValue="patient"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <AccessibleIcon style={{ color: "var(--text-secondary)" }} />
        }
        selectedIcon={
          <AccessibleIcon style={{ color: "var(--text-primary)" }} />
        }
      />

      {/* <RControlCategoryOptionCard
        label="Детали случая"
        optionValue="case-details"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      />

      <RControlCategoryOptionCard
        label="Онкология"
        optionValue="oncology"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      />

      <RControlCategoryOptionCard
        label="Назначения / направления"
        optionValue="prescriptions"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      />

      <RControlCategoryOptionCard
        label="КСГ / ВМП"
        optionValue="clinical-groups"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      />

      <RControlCategoryOptionCard
        label="Оказанные услуги"
        optionValue="provided-services"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      />

      <RControlCategoryOptionCard
        label="Дефекты / санкции"
        optionValue="defects"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
      /> */}
    </section>
  );
};
