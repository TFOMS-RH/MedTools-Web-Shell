import type { RControlCategoryId } from "../../../../../../../shared/model/types/CategoryId";
import styles from "./styles.module.scss";

interface RControlCategoryOptionCardProps {
  label: string;
  optionValue: RControlCategoryId;
  currentCategory: RControlCategoryId;
  setOption: (categoryId: RControlCategoryId) => void;
  defaultIcon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export const RControlCategoryOptionCard = ({
  label,
  optionValue,
  currentCategory,
  defaultIcon,
  selectedIcon,
  setOption,
}: RControlCategoryOptionCardProps) => {
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
