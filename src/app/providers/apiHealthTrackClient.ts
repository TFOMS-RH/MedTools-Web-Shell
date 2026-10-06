// ==========================================
// app/providers/apiHealthTrackClient.ts
// ==========================================
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { useHealthTrackAuthStore } from "../../modules/healthTrack/stores/healthTrackAuthStore";
import type { HTRefreshResponse } from "../../modules/healthTrack/types/htAuth";

// ==========================================
// Расширение конфига axios — флаг "запрос уже повторялся".
// Нужен, чтобы не зациклиться при бесконечных 401.
// ==========================================
interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ==========================================
// Базовый клиент
// ==========================================
const apiHealthTrackClient = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "/api",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ← обязательно для HttpOnly Cookie с refresh_token
});

// ==========================================
// REQUEST INTERCEPTOR
// Кладём Bearer из Zustand-стора в каждый запрос (если есть токен).
// ==========================================
apiHealthTrackClient.interceptors.request.use((config) => {
  const token = useHealthTrackAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// RESPONSE INTERCEPTOR — автопродление токена
// ==========================================

// Флаг "сейчас идёт refresh". Защищает от параллельных refresh'ей.
let isRefreshing = false;

// Очередь коллбеков, ожидающих новый токен.
// Когда refresh завершится — пробежимся по очереди и "разбудим" запросы.
let pendingQueue: Array<(newToken: string) => void> = [];

// Эти эндпоинты НЕ должны вызывать refresh — иначе бесконечный цикл.
const AUTH_EXCLUDED = ["/auth/login", "/auth/refresh", "/auth/logout"];

const isAuthEndpoint = (url?: string): boolean =>
  !!url && AUTH_EXCLUDED.some((path) => url.includes(path));

apiHealthTrackClient.interceptors.response.use(
  // Успешный ответ — пропускаем как есть.
  (response) => response,

  // Ошибка — разбираемся.
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;

    // Не 401 или нет конфига — дальше по стеку.
    if (error.response?.status !== 401 || !original) {
      return Promise.reject(error);
    }

    // Защита от рекурсии:
    //  - не трогаем сами auth-эндпоинты
    //  - не повторяем уже повторённые запросы
    if (isAuthEndpoint(original.url) || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    // ==========================================
    // Если refresh УЖЕ идёт — ставим запрос в очередь.
    // Разбудим его, когда refresh завершится.
    // ==========================================
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((newToken) => {
          try {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiHealthTrackClient(original));
          } catch (err) {
            reject(err);
          }
        });
      });
    }

    // ==========================================
    // Refresh ещё не идёт — запускаем его.
    // ==========================================
    isRefreshing = true;

    try {
      // Дёргаем /auth/refresh НАПРЯМУЮ через axios,
      // чтобы не попасть в собственный interceptor (рекурсия).
      const baseURL = apiHealthTrackClient.defaults.baseURL ?? "";
      const { data } = await axios.post<HTRefreshResponse>(
        `${baseURL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      const newToken = data.accessToken;

      // Обновляем токен в сторе (юзер уже там — не трогаем).
      useHealthTrackAuthStore.getState().setAccessToken(newToken);

      // Разбудим всех, кто ждал в очереди.
      pendingQueue.forEach((cb) => cb(newToken));
      pendingQueue = [];

      // Повторяем исходный запрос с новым токеном.
      original.headers.Authorization = `Bearer ${newToken}`;
      return apiHealthTrackClient(original);
    } catch (refreshError) {
      // Refresh не удался — сессия мертва.
      // Чистим стор и отправляем на страницу логина.
      pendingQueue = [];
      useHealthTrackAuthStore.getState().clearSession();
      window.location.href = "/health-track/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiHealthTrackClient;