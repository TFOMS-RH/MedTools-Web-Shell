import type { SetStateAction } from "react";
import NoneFiltersGroup from "../groups/NoneFiltersGroup/NoneFiltersGroup";
import PersonFiltersGroupRoot from "../groups/PersonFiltersGroup/PersonFiltersGroup";
import MedicalCaseDetailsFiltersGroup from "../groups/MedicalCaseDetailsFiltersGroup/MedicalCaseDetailsFiltersGroup";
import OncologyFiltersGroup from "../groups/OncologyFiltersGroup/OncologyFiltersGroup";
import PrescriptionFiltersGroup from "../groups/PrescriptionFiltersGroup/PrescriptionFiltersGroup";
import ClinicalGroupFiltersGroup from "../groups/ClinicalGroupFiltersGroup/ClinicalGroupFiltersGroup";
import ProvidedServiceFiltersGroup from "../groups/ProvidedServiceFiltersGroup/ProvidedServiceFiltersGroup";
import SanctionFiltersGroup from "../groups/SanctionFiltersGroup/SanctionFiltersGroup";
import InternalServiceFiltersGroup from "../groups/InternalServiceFiltersGroup/InternalServiceFiltersGroup";
import type { FilterGroupId } from "../../../workspace/model/types/FilterId";
import type { FiltersDraft } from "../../../workspace/model/types/FiltersDraft";

interface FiltersGroupRenderProps {
  filterGroupId: FilterGroupId;
  filtersDraft: FiltersDraft;
  setFiltersDraft: React.Dispatch<SetStateAction<FiltersDraft>>;
}

export const FiltersGroupRender = ({
  filterGroupId,
  filtersDraft,
  setFiltersDraft,
}: FiltersGroupRenderProps) => {
  switch (filterGroupId) {
    case "none":
      return <NoneFiltersGroup />;
    case "persons":
      return (
        <PersonFiltersGroupRoot
          personFiltersGroupDraft={filtersDraft.person}
          setPersonFiltersGroupDraft={(person) =>
            setFiltersDraft((prev) => ({
              ...prev,
              person,
            }))
          }
        />
      );

    case "case-details":
      return (
        <MedicalCaseDetailsFiltersGroup
          medicalCaseDetailsFiltersGroupDraft={filtersDraft.medicalCaseDetails}
          setMedicalCaseDetailsFiltersGroupDraft={(medicalCaseDetails) =>
            setFiltersDraft((prev) => ({
              ...prev,
              medicalCaseDetails,
            }))
          }
        />
      );

    case "oncology":
      return (
        <OncologyFiltersGroup
          oncologyFiltersGroupDraft={filtersDraft.oncology}
          setOncologyFiltersGroupDraft={(oncology) =>
            setFiltersDraft((prev) => ({
              ...prev,
              oncology: oncology,
            }))
          }
        />
      );

    case "prescriptions":
      return (
        <PrescriptionFiltersGroup
          prescriptionFiltersGroupDraft={filtersDraft.prescription}
          setPrescriptionFiltersGroupDraft={(prescription) =>
            setFiltersDraft((prev) => ({
              ...prev,
              prescription: prescription,
            }))
          }
        />
      );

    case "clinical-groups":
      return (
        <ClinicalGroupFiltersGroup
          clinicalGroupFiltersGroup={filtersDraft.clinicalGroups}
          setClinicalGroupFiltersGroup={(clinicalGroups) =>
            setFiltersDraft((prev) => ({
              ...prev,
              clinicalGroups: clinicalGroups,
            }))
          }
        />
      );

    case "provided-services": {
      return (
        <ProvidedServiceFiltersGroup
          providedServiceDraft={filtersDraft.providedServices}
          setProvidedServiceDraft={(providedSevices) =>
            setFiltersDraft((prev) => ({
              ...prev,
              providedServices: providedSevices,
            }))
          }
        />
      );
    }

    case "sanctions": {
      return (
        <SanctionFiltersGroup
          sanctionFiltersGroupDraft={filtersDraft.sanction}
          setSanctionFiltersGroupDraft={(sanction) =>
            setFiltersDraft((prev) => ({
              ...prev,
              sanction: sanction,
            }))
          }
        />
      );
    }

    case "internal-service": {
      return (
        <InternalServiceFiltersGroup
          internalServiceFiltersGroupDraft={filtersDraft.inrernalService}
          setInternalServiceFiltersGroupDraft={(internalService) =>
            setFiltersDraft((prev) => ({
              ...prev,
              inrernalService: internalService,
            }))
          }
        />
      );
    }
  }
};
