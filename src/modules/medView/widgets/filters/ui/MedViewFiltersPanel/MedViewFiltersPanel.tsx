import type { FiltersDraft } from "../../../workspace/model/types/FiltersDraft";
import { countActiveFilters } from "../../../../../../shared/helpers/isFilterActive";
import { Divider } from "../../../../../../components/ui/Divider/Divider";
import { MedViewButton } from "../../../../../../shared/ui/medView/buttons/MedViewButton";
import { useMedViewFiltersStore } from "../../model/stores/useMedViewFiltersStore";
import { useMedViewStore } from "../../../workspace/model/stores/useMedViewStore";
import { TargetDbToggle } from "../../../../../../shared/ui/TargetDbToggle/TargetDbToggle";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";

interface FiltersPanelProps {
  filtersDraft: FiltersDraft;
}

export const MedViewFiltersPanel = ({ filtersDraft }: FiltersPanelProps) => {
  const { resetWorkspace } = useMedViewStore();
  const {
    applyFilters,
    selectFilterGroup,
    selectTargetDb,
    selectedfilterGroupId,
    targetDb,
  } = useMedViewFiltersStore();

  const personalGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.person,
  );

  const medicalCaseDetailsGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.medicalCaseDetails,
  );

  const oncologyGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.oncology,
  );

  const prescriptionGroupActiveFilters = countActiveFilters(
    filtersDraft.prescription,
  );

  const clinicalGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.clinicalGroups,
  );

  const providedServicesGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.providedServices,
  );

  const sanctionGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.sanction,
  );

  const internalGroupActiveFiltersCount = countActiveFilters(
    filtersDraft.inrernalService,
  );

  const handleToggleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    if (newValue === "SMODB18" || newValue === "INOGOROD18") {
      resetWorkspace();
      selectTargetDb(newValue);
    }
  };

  return (
    <section className={styles.filtersPanelRoot}>
      <div className={styles.sourceToggle}>
        <header className={styles.sourceToggleHeader}>
          <h2>Источник данных</h2>
        </header>
        <TargetDbToggle value={targetDb ?? ""} onChange={handleToggleChange} />
      </div>
      <Divider />
      <div className={styles.filtersList}>
        <header className={styles.filtersListHeader}>
          <h2>Группы фильтров</h2>
        </header>
        <ul>
          <li
            className={
              selectedfilterGroupId === "persons"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("persons")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Персональные данные</p>
            </div>
            {personalGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {personalGroupActiveFiltersCount}
              </div>
            )}
          </li>

          <li
            className={
              selectedfilterGroupId === "case-details"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("case-details")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Детали медицинского случая</p>
            </div>
            {medicalCaseDetailsGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {medicalCaseDetailsGroupActiveFiltersCount}
              </div>
            )}
          </li>

          <li
            className={
              selectedfilterGroupId === "oncology"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("oncology")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Онкология</p>
            </div>
            {oncologyGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {oncologyGroupActiveFiltersCount}
              </div>
            )}
          </li>
          <li
            className={
              selectedfilterGroupId === "prescriptions"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("prescriptions")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Назначения и направления</p>
            </div>
            {prescriptionGroupActiveFilters > 0 && (
              <div className={styles.counter}>
                {prescriptionGroupActiveFilters}
              </div>
            )}
          </li>
          <li
            className={
              selectedfilterGroupId === "clinical-groups"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("clinical-groups")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Клинические группы и ВМП</p>
            </div>
            {clinicalGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {clinicalGroupActiveFiltersCount}
              </div>
            )}
          </li>
          <li
            className={
              selectedfilterGroupId === "provided-services"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("provided-services")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Оказанные услуги</p>
            </div>
            {providedServicesGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {providedServicesGroupActiveFiltersCount}
              </div>
            )}
          </li>
          <li
            className={
              selectedfilterGroupId === "sanctions"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("sanctions")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Санкции</p>
            </div>
            {sanctionGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {sanctionGroupActiveFiltersCount}
              </div>
            )}
          </li>
          <li
            className={
              selectedfilterGroupId === "ICD"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("ICD")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>МКБ</p>
            </div>
          </li>
          <li
            className={
              selectedfilterGroupId === "internal-service"
                ? styles.selectedRow
                : styles.noneSelected
            }
            onClick={() => selectFilterGroup("internal-service")}
          >
            <div className={styles.namingGroup}>
              <AddIcon />
              <p>Служебная информация</p>
            </div>
            {internalGroupActiveFiltersCount > 0 && (
              <div className={styles.counter}>
                {internalGroupActiveFiltersCount}
              </div>
            )}
          </li>
        </ul>
      </div>
      <Divider />
      <div className={styles.actions}>
        <div className={styles.actionsField}>
          <MedViewButton
            text="Применить фильтры"
            variant="outlined"
            onClick={() => {
              resetWorkspace();
              applyFilters(filtersDraft);
            }}
            disabled={targetDb === null}
          />
        </div>
      </div>
    </section>
  );
};
