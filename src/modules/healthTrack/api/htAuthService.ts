// ==========================================
// modules/healthTrack/api/htAuthService.ts
// ==========================================
import type {
  HTLoginRequest,
  HTLoginResponse,
  HTRefreshResponse,
  HTUserInfo,
} from "../types/htAuth";
import apiHealthTrackClient from "../../../app/providers/apiHealthTrackClient";

/**
 * API-сервис авторизации HealthTrack.
 * Общается с эндпоинтами /api/auth/* на бэке.
 * Refresh-токен ставится бэком в HttpOnly Cookie — фронт его не трогает.
 */
export const htAuthService = {
  /**
   * POST /api/auth/login
   * Логин по email + password.
   * Бэк возвращает accessToken + user, и ставит HttpOnly Cookie с refresh_token.
   * При ошибке — ProblemDetails от GlobalExceptionMiddleware.
   */
  login: async (request: HTLoginRequest): Promise<HTLoginResponse> => {
    const response = await apiHealthTrackClient.post<HTLoginResponse>(
      "/auth/login",
      request,
    );
    return response.data;
  },

  /**
   * POST /api/auth/refresh
   * Обновление accessToken по refresh-токену из Cookie.
   * Вызывается:
   *  1. При bootstrap (когда пользователь перезагружает страницу F5)
   *  2. В response-interceptor'е при 401 (истёк accessToken)
   *
   * Возвращает только accessToken — профиль подтянем через getMe().
   */
  refresh: async (): Promise<HTRefreshResponse> => {
    const response = await apiHealthTrackClient.post<HTRefreshResponse>(
      "/auth/refresh",
    );
    return response.data;
  },

  /**
   * GET /api/auth/me
   * Текущий пользователь (из JWT-claims).
   * Используется после refresh, чтобы восстановить user в сторе.
   */
  getMe: async (): Promise<HTUserInfo> => {
    const response = await apiHealthTrackClient.get<HTUserInfo>("/auth/me");
    return response.data;
  },

  /**
   * POST /api/auth/logout
   * Отзывает refresh-токен на бэке и очищает HttpOnly Cookie.
   * Локальный стор (Zustand) чистим отдельно — в сторе.
   */
  logout: async (): Promise<void> => {
    await apiHealthTrackClient.post("/auth/logout");
  },
};