import { useNavigate } from "react-router";
import { Badge } from "../../../../ui/Badge/Badge";
import styles from "./styles.module.scss";
import { MedToolsButton } from "../../../../../shared/ui/medTools/buttons/MedToolsButton";

interface ModuleCardProps {
  displayName: string;
  moduleVersion: string;
  moduleDescription: string;
  navigatePath: string;
  avatarText?: string;
}

export const ModuleCard = ({
  displayName,
  moduleVersion,
  moduleDescription,
  navigatePath,
  avatarText = "UNK",
}: ModuleCardProps) => {
  const navigate = useNavigate();

  return (
    <article className={styles.moduleCard}>
      <header className={styles.moduleCardHeader}>
        <div className={styles.logo}>{avatarText}</div>

        <div className={styles.description}>
          <header className={styles.appCardDescriptionHeader}>
            <h2>{displayName}</h2>
            <Badge size="sm" text={`v${moduleVersion}`} />
          </header>

          <p>{moduleDescription}</p>
        </div>
      </header>

      <section className={styles.appCardActions}>
        <MedToolsButton
          text="Открыть"
          onClick={() => navigate(navigatePath)}
          variant="outlined"
          size="large"
        />
      </section>
    </article>
  );
};
