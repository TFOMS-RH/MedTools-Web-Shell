import { Divider } from "../../../components/ui/Divider/Divider";
import { WorkspaceFilterPanel } from "../widgets/filters/ui/WorkspaceFilterPanel/WorkspaceFilterPanel";
import { RControlCategoryRender } from "../widgets/workspace/ui/categories/RControlCategoryRender";
import { RControlWorkspace } from "../widgets/workspace/ui/core/RControlWorkspace";
import { RControlCategoriesPanel } from "../widgets/workspace/ui/panels/categoriesPanel/RControlCategoriesPanel";
import styles from "./styles.module.scss";

export const RControl = () => {
  return (
    <>
      <div className={styles.workspaceGroup}>
        <WorkspaceFilterPanel />
        <RControlWorkspace />
      </div>
      <Divider />
      <div className={styles.workspaceGroup}>
        <RControlCategoriesPanel />
        <RControlCategoryRender />
      </div>
    </>
  );
};
