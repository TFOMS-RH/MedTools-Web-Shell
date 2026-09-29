import { Divider } from "../../../components/ui/Divider/Divider";
import { MedViewFiltersRoot } from "../widgets/filters/ui/MedViewFiltersRoot/MedViewFiltersRoot";
import { MedViewWorkspace } from "../widgets/workspace/ui/MedViewWorkspace";

export const MedView = () => {
  return (
    <>
      <MedViewFiltersRoot />
      <Divider />
      <MedViewWorkspace />
      <Divider />
    </>
  );
};
