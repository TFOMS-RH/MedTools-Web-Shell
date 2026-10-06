// ==========================================
// modules/healthTrack/pages/HTNotFound/HTNotFound.tsx
// ==========================================
import { useNavigate } from "react-router";
import { AppButton } from "../../../../components/ui/AppButton/AppButton";
import styles from "./styles.module.scss";

/**
 * Страница 404 — «Страница не найдена».
 *
 * Рендерится внутри AppLayout Никитки.
 * Показывается для любого URL вида /health-track/*,
 * не совпавшего ни с одним из известных роутов модуля.
 *
 * Пример: пользователь вручную вбил /health-track/xxx
 * или перешёл по устаревшей ссылке.
 */
export const HTNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.notFoundRoot}>
      <h1>404</h1>

      <p className={styles.subtitle}>
        Страница, которую вы ищете, не найдена. Проверьте адрес или вернитесь на
        главную.
      </p>

      <AppButton
        variant="secondary"
        size="md"
        onClick={() => navigate("/health-track")}
      >
        На главную
      </AppButton>
    </section>
  );
};