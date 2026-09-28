import { Divider } from "../../../components/ui/Divider/Divider";
import { FiltersRoot } from "../widgets/ui/filters/FiltersRoot/FiltersRoot";
import { MedViewWorkspace } from "../widgets/ui/workspace/ui/core/MedViewWorkspace";

export const MedView = () => {
  return (
    <>
      <FiltersRoot />
      <Divider />
      <MedViewWorkspace />
    </>
  );
};
