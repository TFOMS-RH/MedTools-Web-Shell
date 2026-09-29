import { Divider } from "../../../components/ui/Divider/Divider";
import { FiltersRoot } from "../widgets/filters/ui/FiltersRoot/FiltersRoot";
import { MedViewWorkspace } from "../widgets/workspace/ui/MedViewWorkspace";

export const MedView = () => {
  return (
    <>
      <FiltersRoot />
      <Divider />
      <MedViewWorkspace />
      <Divider />
    </>
  );
};
