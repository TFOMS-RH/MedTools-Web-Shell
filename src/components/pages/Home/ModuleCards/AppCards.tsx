import { ChevronRight } from "../../../ui/Icons/ChevronRight";
import { AppButton } from "../../../ui/AppButton/AppButton";
import { Badge } from "../../../ui/Badge/Badge";
import { useNavigate } from "react-router";

import styles from "./styles.module.scss";
import projects from "../../../../../projects.json";

export const AvailableApps = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.availableAppsRoot}>
      <article className={styles.appCard}>
        <header className={styles.appCardHeader}>
          <div className={styles.logo}>RC</div>

          <div className={styles.description}>
            <header className={styles.appCardDescriptionHeader}>
              <h2>{projects.RControl.DisplayName}</h2>

              <Badge size="sm" text={`v${projects.RControl.Version}`} />
            </header>
            <p>{projects.RControl.Description}</p>
          </div>
        </header>

        <section className={styles.appCardActions}>
          <AppButton
            onClick={() => navigate("/rcontrol")}
            variant="secondary"
            size="md"
            toExpand={true}
          >
            Открыть
            <ChevronRight />
          </AppButton>
        </section>
      </article>

      <article className={styles.appCard}>
        <header className={styles.appCardHeader}>
          <div className={styles.logo}>MDV</div>

          <div className={styles.description}>
            <header className={styles.appCardDescriptionHeader}>
              <h2>{projects.MedView.DisplayName}</h2>

              <Badge size="sm" text={`v${projects.MedView.Version}`} />
            </header>
            <p>{projects.MedView.Description}</p>
          </div>
        </header>

        <section className={styles.appCardActions}>
          <AppButton variant="secondary" size="md" toExpand={true}>
            Открыть
            <ChevronRight />
          </AppButton>
        </section>
      </article>
    </section>
  );
};
