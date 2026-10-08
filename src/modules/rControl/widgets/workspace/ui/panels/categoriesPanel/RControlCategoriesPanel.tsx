import { useRControlWorkspaceStore } from "../../../model/store/useRControlWorkspaceStore";
import { RControlCategoryOptionCard } from "./RControlCategoryOptionCard";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import AirlineSeatFlatAngledOutlinedIcon from "@mui/icons-material/AirlineSeatFlatAngledOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PersonalInjuryOutlinedIcon from "@mui/icons-material/PersonalInjuryOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import styles from "./styles.module.scss";

export const RControlCategoriesPanel = () => {
  const { targetCategory, setTargetCategory } = useRControlWorkspaceStore();

  return (
    <section className={styles.categoriesPanelRoot}>
      <RControlCategoryOptionCard
        label="Пациент"
        optionValue="patient"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <PersonalInjuryOutlinedIcon
            style={{ color: "var(--text-secondary)" }}
          />
        }
        selectedIcon={
          <PersonalInjuryOutlinedIcon style={{ color: "AccentColorText" }} />
        }
      />

      <RControlCategoryOptionCard
        label="Детали случая"
        optionValue="case-details"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <MedicalServicesOutlinedIcon
            style={{ color: "var(--text-secondary)" }}
          />
        }
        selectedIcon={
          <MedicalServicesOutlinedIcon style={{ color: "AccentColorText" }} />
        }
      />

      <RControlCategoryOptionCard
        label="Онкология"
        optionValue="oncology"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <VaccinesOutlinedIcon style={{ color: "var(--text-secondary" }} />
        }
        selectedIcon={
          <VaccinesOutlinedIcon style={{ color: "AccentColorText" }} />
        }
      />

      <RControlCategoryOptionCard
        label="Назначения / направления"
        optionValue="prescriptions"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <DescriptionOutlinedIcon style={{ color: "var(--text-secondary" }} />
        }
        selectedIcon={
          <DescriptionOutlinedIcon style={{ color: "AccentColorText" }} />
        }
      />

      <RControlCategoryOptionCard
        label="КСГ / ВМП"
        optionValue="clinical-groups"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <AirlineSeatFlatAngledOutlinedIcon
            style={{ color: "var(--text-secondary" }}
          />
        }
        selectedIcon={
          <AirlineSeatFlatAngledOutlinedIcon
            style={{ color: "AccentColorText" }}
          />
        }
      />

      <RControlCategoryOptionCard
        label="Оказанные услуги"
        optionValue="provided-services"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <MedicalInformationOutlinedIcon
            style={{ color: "var(--text-secondary" }}
          />
        }
        selectedIcon={
          <MedicalInformationOutlinedIcon
            style={{ color: "AccentColorText" }}
          />
        }
      />

      <RControlCategoryOptionCard
        label="Дефекты / санкции"
        optionValue="defects"
        setOption={setTargetCategory}
        currentCategory={targetCategory}
        defaultIcon={
          <DisabledByDefaultOutlinedIcon
            style={{ color: "var(--text-secondary" }}
          />
        }
        selectedIcon={
          <DisabledByDefaultOutlinedIcon style={{ color: "AccentColorText" }} />
        }
      />
    </section>
  );
};
