import { useHealthTrackAuthStore } from "../../stores/healthTrackAuthStore";
import styles from "./styles.module.scss";

export const HTDashboard = () => {
  const user = useHealthTrackAuthStore((s) => s.user);

  return (
    <section className={styles.dashboardRoot}>
      <header>
        <h1>HealthTrack</h1>
        <p className={styles.subtitle}>
          Здравствуйте, {user?.fullName || "пользователь"}!
        </p>
      </header>

      <div className={styles.placeholder}>
        <p>Здесь будет дашборд со статистикой и переходами в разделы.</p>
      </div>
    </section>
  );
};