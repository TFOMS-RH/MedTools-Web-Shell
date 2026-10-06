import { useWorkspaceStore } from "../../model/store/useWorkspaceStore";
import { CategoryRender } from "./CategoryRender";
import styles from "./styles.module.scss";

export const CategoriesWorkspace = () => {
  const { targetCategory } = useWorkspaceStore();

  return (
    <section className={styles.categoriesRoot}>
      <CategoryRender targetCategory={targetCategory} />
    </section>
  );
};
