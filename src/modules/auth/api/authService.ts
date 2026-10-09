import type { LoginResponse } from "../types/LoginReponse";
import apiClient from "../../../shared/api/client/apiClient";

export const authService = {
  login: (email: string, password: string) => {
    return apiClient.post<LoginResponse>("/med-tools/auth/login", {
      email,
      password,
    });
  },
};
