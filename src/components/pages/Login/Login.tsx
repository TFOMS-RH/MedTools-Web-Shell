import { useAuthStore } from "../../../modules/auth/stores/authStore";
import { AppButton } from "../../ui/AppButton/AppButton";
import { AppInput } from "../../ui/AppInput/AppInput";
import { Divider } from "../../ui/Divider/Divider";
import { useNavigate } from "react-router";
import { authService } from "../../../modules/auth/api/authService";

import React, { useState } from "react";
import styles from "./styles.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setSession } = useAuthStore();
  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await authService.login(email, password);
    const result = response.data;

    if (!result.isSuccess) {
      return;
    }

    setSession(result.value.accessToken, {
      email: result.value.email,
      uid: result.value.uid,
      role: result.value.role,
      username: result.value.username,
    });

    sessionStorage.setItem("accessToken", result.value.accessToken);

    navigator("/");
  };

  return (
    <section className={styles.loginRoot}>
      <header className={styles.loginHeader}>
        <h1>Войти в MedTools Web</h1>
      </header>

      <form onSubmit={handleLogin} className={styles.loginForm}>
        <header className={styles.loginFormHeader}>
          <h2>Войдите в свой аккаунт</h2>

          <p className={styles.primaryText}>
            Воспользуйтесь данными, полученными от информационно-аналитического
            отдела
          </p>
        </header>

        <section className={styles.inputs}>
          <AppInput
            label="Почта"
            variant="md"
            placeholder="nikitkadev@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <AppInput
            label="Пароль"
            variant="md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </section>

        <Divider />

        <section className={styles.actions}>
          <AppButton size="md" variant="primary" type="submit">
            Войти
          </AppButton>
        </section>
      </form>
    </section>
  );
};
