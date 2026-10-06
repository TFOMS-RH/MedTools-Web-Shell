import { MedToolsButton } from "../../../shared/ui/medTools/buttons/MedToolsButton";
import { MedToolsInput } from "../../../shared/ui/medTools/inputs/MedToolsInput";
import { useAuthStore } from "../../../modules/auth/stores/authStore";
import { authService } from "../../../modules/auth/api/authService";
import { Divider } from "../../ui/Divider/Divider";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import styles from "./styles.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setSession } = useAuthStore();
  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

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

      setIsLoading(false);
      navigator("/");
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.loginRoot}>
      <header className={styles.loginHeader}>
        <h1>Вход в MedTools Web</h1>
      </header>

      <form onSubmit={handleLogin} className={styles.loginForm}>
        <header className={styles.loginFormHeader}>
          <h2>Войдите в свой аккаунт</h2>

          <p className={styles.primaryText}>
            Получите данные у отдела информационно-аналитического обеспечения или введите их ниже
          </p>
        </header>

        <section className={styles.inputs}>
          <MedToolsInput
            label="Почта"
            placeholder="nikitkadev@gmail.com"
            value={email}
            handleInputChange={setEmail}
            fullWidth
            size="small"
          />

          <MedToolsInput
            label="Пароль"
            placeholder=""
            value={password}
            handleInputChange={setPassword}
            fullWidth
            size="small"
            isPassword
          />
        </section>

        <Divider />

        <section className={styles.actions}>
          <MedToolsButton
            text="Войти"
            variant="outlined"
            fullWidth
            isLoading={isLoading}
            isSubmitButton
          />
        </section>
      </form>
    </section>
  );
};
