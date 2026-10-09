import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

const CategoryFallback = () => {
  return (
    <div className={styles.fallback}>
      <div className={styles.loaderContainer}>
        <CircularProgress
          size={30}
          aria-label="Загрузка категории ..."
          sx={{ color: "black" }}
        />
      </div>
      <p className={styles.loaderText}>Пытаемся отобразить категорию ... </p>
    </div>
  );
};

export default CategoryFallback;
