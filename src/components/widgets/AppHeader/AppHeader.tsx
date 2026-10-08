import { Link } from "react-router";
import styles from "./styles.module.scss";

interface AppHeaderProps {
  currentModule: string;
}

export const AppHeader = ({ currentModule }: AppHeaderProps) => {
  const title = currentModule
    ? `MedTools Web / ${currentModule}`
    : "MedTools Web";

  return (
    <header className={styles.appHeaderRoot}>
      <Link to="/" className={styles.logo}>
        <h1>{title}</h1>
      </Link>
    </header>
  );
};
