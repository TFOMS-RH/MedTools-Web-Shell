import { Divider } from "../../../components/ui/Divider/Divider";
import { CategoriesWorkspaceFilterPanel } from "../widgets/filters/ui/CategoriesWorkspaceFilterPanel/CategoriesWorkspaceFilterPanel";
import { WorkspaceFilterPanel } from "../widgets/filters/ui/WorkspaceFilterPanel/WorkspaceFilterPanel";
import { RControlCategoryRender } from "../widgets/workspace/ui/categories/RControlCategoryRender";
import { RControlWorkspace } from "../widgets/workspace/ui/core/RControlWorkspace";
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
        <CategoriesWorkspaceFilterPanel />
        <RControlCategoryRender />
      </div>
    </>
  );
};
