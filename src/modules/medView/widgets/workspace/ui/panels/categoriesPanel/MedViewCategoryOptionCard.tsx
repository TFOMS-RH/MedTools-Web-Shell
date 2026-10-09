import type { MedViewCategoryId } from "../../../../../../../shared/model/types/CategoryId";
import styles from "./styles.module.scss";

interface MedViewCategoryOptionCardProps {
  label: string;
  optionValue: MedViewCategoryId;
  currentCategory: MedViewCategoryId;
  setOption: (categoryId: MedViewCategoryId) => void;
  defaultIcon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export const MedViewCategoryOptionCard = ({
  label,
  optionValue,
  currentCategory,
  defaultIcon,
  selectedIcon,
  setOption,
}: MedViewCategoryOptionCardProps) => {
  const selected = optionValue === currentCategory;

  return (
    <article
      className={`${styles.optionCard} ${selected ? styles.selectedOption : ""}`}
      onClick={() => setOption(optionValue)}
    >
      <div className={styles.icon}>{selected ? selectedIcon : defaultIcon}</div>
      <div className={styles.textField}>
        <p className={styles.label}>{label}</p>
      </div>
    </article>
  );
};
