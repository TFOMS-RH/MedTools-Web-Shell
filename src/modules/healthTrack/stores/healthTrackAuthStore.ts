// ==========================================
// modules/healthTrack/stores/healthTrackAuthStore.ts
// ==========================================
import { create } from "zustand";
import { htAuthService } from "../api/htAuthService";
import type { HTRole } from "../types/htAuth";

// ==========================================
// Пользователь в сторе.
// Структура совпадает с HTUserInfo (types/htAuth.ts).
// ==========================================
export interface HealthTrackUser {
  id: string;
  email: string;
  fullName: string;
  hospitalCode: string | null;
  regionCode: string | null;
  roles: string[];
}

// ==========================================
// State + Actions
// ==========================================
interface HealthTrackAuthState {
  accessToken: string | null;
  user: HealthTrackUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // true — bootstrap завершён (успех ИЛИ провал)

  // --- Действия ---
  setSession: (token: string, user: HealthTrackUser) => void;
  setAccessToken: (token: string) => void;
  clearSession: () => void;
  setInitialized: (value: boolean) => void;
  logout: () => Promise<void>;
  bootstrap: () => Promise<void>;

  // --- Селектор-хелпер ---
  hasRole: (...roles: HTRole[]) => boolean;
}

export const useHealthTrackAuthStore = create<HealthTrackAuthState>(
  (set, get) => ({
    // ==========================================
    // Начальное состояние
    // ==========================================
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    // ==========================================
    // Полная сессия — после успешного логина.
    // ==========================================
    setSession: (token, user) =>
      set({
        accessToken: token,
        user,
        isAuthenticated: true,
      }),

    // ==========================================
    // Только токен — после refresh.
    // Профиль не трогаем (он уже в сторе).
    // ==========================================
    setAccessToken: (token) =>
      set({
        accessToken: token,
        isAuthenticated: true,
      }),

    // ==========================================
    // Полный сброс — при 401 после неудачного refresh,
    // при logout, либо вручную.
    // ==========================================
    clearSession: () =>
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
      }),

    // ==========================================
    // Отметить bootstrap как завершённый.
    // ==========================================
    setInitialized: (value) => set({ isInitialized: value }),

    // ==========================================
    // Выход.
    // 1. Стучимся в /auth/logout (бэк отзовёт refresh + снесёт Cookie).
    // 2. Чистим стор — в finally, чтобы отработало даже при ошибке.
    // ==========================================
    logout: async () => {
      try {
        await htAuthService.logout();
      } catch {
        // Если бэк недоступен — всё равно разлогиниваемся локально.
      } finally {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      }
    },

    // ==========================================
    // Bootstrap: восстановление сессии при загрузке приложения.
    //
    // Сценарий: пользователь был авторизован, нажал F5.
    //  - accessToken в памяти потерян (Zustand без persist).
    //  - Но refresh_token в HttpOnly Cookie живёт.
    //  - Значит: дёргаем /auth/refresh → получаем новый accessToken
    //    → дёргаем /auth/me → восстанавливаем user.
    //
    // Если refresh упал — считаем, что пользователь не авторизован.
    // В любом случае (успех или провал) ставим isInitialized=true,
    // чтобы HTProtectedRoute перестал показывать сплэш.
    // ==========================================
    bootstrap: async () => {
      // Если уже авторизован — bootstrap не нужен.
      if (get().isAuthenticated) {
        set({ isInitialized: true });
        return;
      }

      try {
        // 1. Пробуем обновить токен по Cookie.
        const refreshed = await htAuthService.refresh();

        // 2. Токен получили — фиксируем в сторе.
        set({
          accessToken: refreshed.accessToken,
          isAuthenticated: true,
        });

        // 3. Подтягиваем профиль.
        const me = await htAuthService.getMe();

        set({
          user: {
            id: me.id,
            email: me.email,
            fullName: me.fullName,
            hospitalCode: me.hospitalCode,
            regionCode: me.regionCode,
            roles: me.roles,
          },
        });
      } catch {
        // Refresh не сработал — пользователь не авторизован.
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        });
      } finally {
        // В любом случае bootstrap завершён.
        set({ isInitialized: true });
      }
    },

    // ==========================================
    // Хелпер: есть ли хотя бы одна из переданных ролей.
    // ==========================================
    hasRole: (...roles) => {
      const userRoles = get().user?.roles ?? [];
      return roles.some((r) => userRoles.includes(r));
    },
  }),
);