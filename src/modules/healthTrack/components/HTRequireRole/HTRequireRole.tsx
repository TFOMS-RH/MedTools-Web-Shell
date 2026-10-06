// ==========================================
// modules/healthTrack/components/HTRequireRole/HTRequireRole.tsx
// ==========================================
import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useHasRole } from "../../hooks/useHasRole";
import type { HTRole } from "../../types/htAuth";

interface HTRequireRoleProps {
  /**
   * Роли, хотя бы одна из которых должна быть у пользователя.
   * Пример: roles={["Admin", "TFOMS"]}
   */
  roles: HTRole[];

  /** Что рендерить, если роль есть. */
  children: ReactNode;

  /**
   * Куда редиректить, если роли нет.
   * По умолчанию — /health-track/403.
   */
  fallback?: string;
}

/**
 * Обёртка для проверки ролей внутри HealthTrack.
 *
 * Пример использования:
 *   <HTRequireRole roles={["Admin"]}>
 *     <HTUsersAdminPage />
 *   </HTRequireRole>
 *
 *   <HTRequireRole roles={["Admin", "TFOMS"]} fallback="/health-track">
 *     <HTStatisticsPage />
 *   </HTRequireRole>
 *
 * Компонент НЕ подходит для целых роутов — там используйте
 * HTProtectedRoute (авторизация) + логику в HTMain (какие табы видны).
 * А этот — для точечной защиты отдельных блоков/страниц.
 */
export const HTRequireRole = ({
  roles,
  children,
  fallback = "/health-track/403",
}: HTRequireRoleProps) => {
  const hasRole = useHasRole(...roles);

  if (!hasRole) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};