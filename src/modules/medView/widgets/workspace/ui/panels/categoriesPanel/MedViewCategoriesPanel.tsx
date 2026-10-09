import { MedViewCategoryOptionCard } from "./MedViewCategoryOptionCard";
import { useMedViewWorkspaceStore } from "../../../model/stores/useMedViewWorkspaceStore";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import AirlineSeatFlatAngledOutlinedIcon from "@mui/icons-material/AirlineSeatFlatAngledOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PersonalInjuryOutlinedIcon from "@mui/icons-material/PersonalInjuryOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./styles.module.scss";

export const MedViewCategoriesPanel = () => {
  const { targetCategory, setTargetCategory } = useMedViewWorkspaceStore();

  return (
    <section className={styles.categoriesPanelRoot}>
      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
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

      <MedViewCategoryOptionCard
        label="Экспорт"
        optionValue="export"
        currentCategory={targetCategory}
        setOption={setTargetCategory}
        defaultIcon={
          <IosShareIcon style={{ color: "var(--text-secondary)" }} />
        }
        selectedIcon={<IosShareIcon style={{ color: "AccentColorText" }} />}
      />
    </section>
  );
};
