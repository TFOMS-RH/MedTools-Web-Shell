import styles from "./styles.module.scss";
import config from "../../../../package.json";

export const AppFooter = () => {
  return (
    <footer className={styles.appFooterRoot}>
      <p>MedTools Web v{config.version}</p>
      <p>Developed by nikitkadev х sheferonskedev</p>
    </footer>
  );
};
