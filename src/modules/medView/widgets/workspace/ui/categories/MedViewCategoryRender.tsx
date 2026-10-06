import type { MedViewCategoryId } from "../../../../../rControl/widgets/workspace/model/types/categories/CategoryId";
import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import CategoryFallback from "../../../../../rControl/widgets/workspace/ui/categories/components/default/CategoryFallback/CategoryFallback";

const DefaultCategory = lazy(
  () =>
    import("../../../../../rControl/widgets/workspace/ui/categories/components/default/DefaultCategory/DefaultCategory"),
);

const Patient = lazy(
  () => import("../categories/components/patient/MedViewPatientCategoryRoot"),
);

const MedicalCaseDetails = lazy(
  () =>
    import("../categories/components/medicalCaseDetails/MedViewMedicalCaseDetailsCategoryRoot"),
);

const Oncology = lazy(
  () => import("../categories/components/oncology/MedViewOncologyRoot"),
);

const Referral = lazy(
  () =>
    import("../categories/components/prescriptions/MedViewPrescriptionsCategoryRoot"),
);

const ClinicalGroup = lazy(
  () =>
    import("../categories/components/clinicalGroups/MedViewClinicalGroupsCategoryRoot"),
);

const ProvidedService = lazy(
  () =>
    import("../categories/components/providedServices/MedViewProvidedServicesCategoryRoot"),
);

const Defects = lazy(
  () => import("../categories/components/defects/MedViewDefectsCategoryRoot"),
);

const categoryMap = {
  default: DefaultCategory,
  patient: Patient,
  "case-details": MedicalCaseDetails,
  oncology: Oncology,
  prescriptions: Referral,
  "clinical-groups": ClinicalGroup,
  "provided-services": ProvidedService,
  defects: Defects,
} satisfies Record<MedViewCategoryId, LazyExoticComponent<ComponentType>>;

interface CategoryRenderProps {
  targetCategory: MedViewCategoryId;
}

export const MedViewCategoryRender = ({
  targetCategory,
}: CategoryRenderProps) => {
  const CategoryComponent = categoryMap[targetCategory];

  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryComponent />
    </Suspense>
  );
};
