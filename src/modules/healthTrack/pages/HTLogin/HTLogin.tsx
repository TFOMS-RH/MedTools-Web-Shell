// ==========================================
// modules/healthTrack/pages/HTLogin/HTLogin.tsx
// ==========================================
import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoginIcon from "@mui/icons-material/Login";

import { AppButton } from "../../../../components/ui/AppButton/AppButton";
import { AppInput } from "../../../../components/ui/AppInput/AppInput";
import { Divider } from "../../../../components/ui/Divider/Divider";

import { htAuthService } from "../../api/htAuthService";
import { useHealthTrackAuthStore } from "../../stores/healthTrackAuthStore";
import { isHTProblemDetails } from "../../types/htAuth";

import logoUrl from "../../../../content/logo/healthTrack-logo.svg";
import styles from "./styles.module.scss";

/**
 * Страница логина HealthTrack.
 *
 * Дизайн:
 *  - сверху: логотип-сердце + заголовок «Добро пожаловать» + subtitle
 *  - карточка формы: Email, Пароль, «Запомнить меня», кнопка «Войти»
 *  - футер карточки: подсказка про отдел ИАО
 *
 * При успехе — редирект на /health-track (HTMain).
 * Ошибки бэка (ProblemDetails) показываются под формой.
 */
export const HTLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setSession = useHealthTrackAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await htAuthService.login({ email, password, rememberMe });

      // Кладём сессию в Zustand — дальше роутер сам пропустит.
      setSession(data.accessToken, {
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        hospitalCode: data.user.hospitalCode,
        regionCode: data.user.regionCode,
        roles: data.user.roles,
      });

      navigate("/health-track");
    } catch (err: unknown) {
      // Пытаемся вытащить сообщение из ProblemDetails.
      // Если структура не та — показываем общее сообщение.
      let message = "Не удалось войти. Проверьте данные и попробуйте снова.";

      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: unknown } }).response;
        const data = response?.data;

        if (isHTProblemDetails(data)) {
          message =
            data.errors?.join("; ") ??
            data.title ??
            "Не удалось войти. Проверьте данные и попробуйте снова.";
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.loginRoot}>
      {/* ============================== */}
      {/* Hero: логотип + заголовок */}
      {/* ============================== */}
      <header className={styles.hero}>
        <img
          src={logoUrl}
          alt="HealthTrack"
          className={styles.logo}
          draggable={false}
        />

        <h1 className={styles.heroTitle}>Добро пожаловать в HealthTrack</h1>

        <p className={styles.heroSubtitle}>
          Система управления информированием и регистрами граждан!
        </p>
      </header>

      {/* ============================== */}
      {/* Форма логина */}
      {/* ============================== */}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <header className={styles.loginFormHeader}>
          <h2>Вход в ваш аккаунт</h2>
          <p className={styles.formSubtitle}>
            Введите почту и пароль, выданные для вашей организации.
          </p>
        </header>

        <section className={styles.inputs}>
          <AppInput
            label="Email"
            variant="md"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            autoComplete="username"
            disabled={loading}
          />

          <AppInput
            label="Пароль"
            variant="md"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            autoComplete="current-password"
            disabled={loading}
          />

          {/* Чекбокс «Запомнить меня» — в стиле MUI */}
          <label className={styles.rememberRow}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
              disabled={loading}
            />
            <span>Запомнить меня</span>
          </label>
        </section>

        {error && <p className={styles.errorText}>{error}</p>}

        <Divider />

        <section className={styles.actions}>
          <AppButton
            size="md"
            variant="primary"
            type="submit"
            disabled={loading}
            toExpand
          >
            <LoginIcon
              sx={{ fontSize: 20, color: "var(--white)" }}
            />
            {loading ? "Вход..." : "Войти"}
          </AppButton>
        </section>

        {/* Футер формы — подсказка */}
        <footer className={styles.formFooter}>
          Нет аккаунта? Обратитесь в отдел ИАО ТФОМС РХ!
        </footer>
      </form>
    </section>
  );
};