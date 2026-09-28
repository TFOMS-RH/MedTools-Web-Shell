import { Divider } from "../../../components/ui/Divider/Divider";
import { FiltersRoot } from "../widgets/ui/filters/FiltersRoot/FiltersRoot";
import { CompletedCaseTable } from "../widgets/ui/workspace/ui/core/CompletedCaseTable/CompletedCaseTable";

export const MedView = () => {
  return (
    <>
      <FiltersRoot />
      <Divider />
      <CompletedCaseTable />
    </>
  );
};
