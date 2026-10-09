import { Outlet, useLocation } from "react-router";
import { AppHeader } from "../../widgets/AppHeader/AppHeader";
import { AppFooter } from "../../widgets/AppFooter/AppFooter";
import styles from "./styles.module.scss";
import { resolveCurrentModule } from "../../../shared/helpers/resolveCurrentModule";

export const AppLayout = () => {
  const location = useLocation();

  return (
    <main className={styles.appRoot}>
      <AppHeader currentModule={resolveCurrentModule(location.pathname)} />

      <div className={styles.contentRoot}>
        <Outlet />
      </div>

      <AppFooter />
    </main>
  );
};
