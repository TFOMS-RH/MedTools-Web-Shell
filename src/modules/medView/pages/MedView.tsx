import { Divider } from "../../../components/ui/Divider/Divider";
import { MedViewFiltersRoot } from "../widgets/filters/ui/MedViewFiltersRoot/MedViewFiltersRoot";
import { MedViewWorkspaceCategoriesFiltersPanel } from "../widgets/filters/ui/MedViewWorkspaceCategoriesFiltersPanel/MedViewWorkspaceCategoriesFiltersPanel";
import { useMedViewStore } from "../widgets/workspace/model/stores/useMedViewWorkspaceStore";
import { MedViewCategoryRender } from "../widgets/workspace/ui/categories/MedViewCategoryRender";
import { MedViewWorkspace } from "../widgets/workspace/ui/core/MedViewWorkspace";

export const MedView = () => {
  const { targetCategory } = useMedViewStore();

  return (
    <>
      <MedViewFiltersRoot />
      <Divider />
      <MedViewWorkspace />
      <Divider />
      <MedViewWorkspaceCategoriesFiltersPanel />
      <MedViewCategoryRender targetCategory={targetCategory} />
    </>
  );
};
