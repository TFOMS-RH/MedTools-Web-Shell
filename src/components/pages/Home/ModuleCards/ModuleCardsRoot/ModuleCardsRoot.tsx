import { ModuleCard } from "../ModuleCard/ModuleCard";
import projects from "../../../../../../projects.json";
import styles from "./styles.module.scss";

export const ModuleCardsRoot = () => {
  return (
    <section className={styles.availableAppsRoot}>
      <ModuleCard
        displayName={projects.RControl.DisplayName}
        moduleDescription={projects.RControl.Description}
        moduleVersion={projects.RControl.Version}
        navigatePath="/rcontrol"
        avatarText="RC"
      />

      <ModuleCard
        displayName={projects.MedView.DisplayName}
        moduleDescription={projects.MedView.Description}
        moduleVersion={projects.MedView.Version}
        navigatePath="/med-view"
        avatarText="MDV"
      />

      <ModuleCard
        displayName={projects.HealthTrack.DisplayName}
        moduleDescription={projects.HealthTrack.Description}
        moduleVersion={projects.HealthTrack.Version}
        navigatePath="/health-track"
        avatarText="HT"
      />
    </section>
  );
};
