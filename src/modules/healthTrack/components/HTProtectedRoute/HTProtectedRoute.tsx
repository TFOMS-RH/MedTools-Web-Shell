// ==========================================
// modules/healthTrack/components/HTProtectedRoute/HTProtectedRoute.tsx
// ==========================================
import { Navigate, Outlet } from "react-router";
import { useHealthTrackAuthStore } from "../../stores/healthTrackAuthStore";
import { HTFullPageLoader } from "../../ui/HTFullPageLoader/HTFullPageLoader";


/**
 * Guard-компонент для защищённых страниц HealthTrack.
 *
 * Логика в 3 состояниях:
 *  1. Bootstrap не завершён → показываем сплэш (не редиректим!).
 *     Это важно: если пользователь нажал F5, у него в памяти нет accessToken,
 *     но в Cookie лежит refresh_token. Пока идёт восстановление сессии,
 *     нельзя кидать на /login — иначе будет мигание.
 *  2. Bootstrap завершён, но не авторизован → редирект на /health-track/login.
 *  3. Bootstrap завершён и авторизован → рендерим дочерние роуты.
 */
export const HTProtectedRoute = () => {
  const isAuthenticated = useHealthTrackAuthStore((s) => s.isAuthenticated);
  const isInitialized = useHealthTrackAuthStore((s) => s.isInitialized);

  // --- Состояние 1: bootstrap ещё не завершён ---
  if (!isInitialized) {
    return <HTFullPageLoader />;
  }

  // --- Состояние 2: bootstrap завершён, но пользователь не авторизован ---
  if (!isAuthenticated) {
    return <Navigate to="/health-track/login" replace />;
  }

  // --- Состояние 3: всё ок, пропускаем дальше ---
  return <Outlet />;
};