// ==========================================
// modules/healthTrack/hooks/useHasRole.ts
// ==========================================
import { useHealthTrackAuthStore } from "../stores/healthTrackAuthStore";
import type { HTRole } from "../types/htAuth";

/**
 * Хук: есть ли у текущего пользователя хотя бы одна из переданных ролей.
 *
 * Возвращает true, если user.roles пересекается с аргументами.
 * Если пользователь не залогинен (roles пустой массив) — всегда false.
 *
 * Примеры:
 *   useHasRole("Admin")                          // только админ
 *   useHasRole("Admin", "TFOMS")                 // админ ИЛИ ТФОМС
 *   useHasRole("Admin", "MO", "SMO")             // кто угодно с правом импорта
 *
 * Реактивен: подписан на user.roles через Zustand-селектор.
 */
export const useHasRole = (...roles: HTRole[]): boolean => {
  // Подписываемся ТОЛЬКО на user.roles — если user целиком изменится,
  // хук перерендерится лишний раз. Селектор возвращает стабильный массив.
  const userRoles = useHealthTrackAuthStore((s) => s.user?.roles ?? []);

  // Ролей не передали — считаем false (защита от misuse).
  if (roles.length === 0) return false;

  // Есть ли пересечение массивов ролей.
  return roles.some((r) => userRoles.includes(r));
};