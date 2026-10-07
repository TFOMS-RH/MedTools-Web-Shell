import type { RControlCategoryId } from "../../model/types/categories/CategoryId";
import { useWorkspaceStore } from "../../model/store/useWorkspaceStore";
import CategoryFallback from "./components/default/CategoryFallback/CategoryFallback";
import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

const DefaultCategoryComponent = lazy(
  () => import("./components/default/DefaultCategory/DefaultCategory"),
);

const PatientCategoryComponent = lazy(
  () => import("./components/patient/RControlPatientCategoryRoot"),
);

const MedicalCaseDetailsCategoryComponent = lazy(
  () =>
    import("./components/medicalCaseDetails/RControlMedicalCaseDetailsCategoryRoot"),
);

const OncologyCategoryComponent = lazy(
  () => import("./components/oncology/RControlOncologyCategoryRoot"),
);

const PrescriptionsCategoryComponent = lazy(
  () => import("./components/prescriptions/RControlPrescriptionsCategoryRoot"),
);

const ClinicalGroupsCategoryComponent = lazy(
  () => import("./components/clinicalGroups/ClinicalGroupsCategoryRoot"),
);

const ProvidedServicesCategoryComponent = lazy(
  () => import("./components/providedServices/RControlProvidedServicesCategoryRoot"),
);

const DefectsCategoryComponent = lazy(
  () => import("./components/defects/RControlDefectsCategoryRoot"),
);

const categoryMap = {
  default: DefaultCategoryComponent,
  patient: PatientCategoryComponent,
  "case-details": MedicalCaseDetailsCategoryComponent,
  oncology: OncologyCategoryComponent,
  prescriptions: PrescriptionsCategoryComponent,
  "clinical-groups": ClinicalGroupsCategoryComponent,
  "provided-services": ProvidedServicesCategoryComponent,
  defects: DefectsCategoryComponent,
} satisfies Record<RControlCategoryId, LazyExoticComponent<ComponentType>>;

export const RControlCategoryRender = () => {
  const { targetCategory } = useWorkspaceStore();
  const CategoryComponent = categoryMap[targetCategory];

  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryComponent />
    </Suspense>
  );
};
