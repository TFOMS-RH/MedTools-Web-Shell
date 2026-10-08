import { Divider } from "../../../components/ui/Divider/Divider";
import { MedViewFiltersRoot } from "../widgets/filters/ui/MedViewFiltersRoot/MedViewFiltersRoot";
import { MedViewCategoryRender } from "../widgets/workspace/ui/categories/MedViewCategoryRender";
import { MedViewWorkspace } from "../widgets/workspace/ui/core/MedViewWorkspace";
import { MedViewCategoriesPanel } from "../widgets/workspace/ui/panels/categoriesPanel/MedViewCategoriesPanel";

export const MedView = () => {
  return (
    <>
      <MedViewFiltersRoot />
      <Divider />
      <MedViewWorkspace />
      <Divider />
      <MedViewCategoriesPanel />
      <MedViewCategoryRender />
    </>
  );
};
