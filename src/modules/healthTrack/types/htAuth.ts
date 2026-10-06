// ==========================================
// modules/healthTrack/types/htAuth.ts
// ==========================================

// ==========================================
// Роли в системе HealthTrack.
// Значения совпадают с ролями Identity на бэке
// (Program.cs → AddAuthorization policies + SenderType).
// ==========================================
export type HTRole = "Admin" | "MO" | "TFOMS" | "SMO";

// ==========================================
// Человекочитаемые названия ролей для UI.
// Record<HTRole, string> гарантирует, что для каждой роли
// обязательно будет подпись — TypeScript не даст забыть.
// ==========================================
export const HT_ROLE_LABELS: Record<HTRole, string> = {
  Admin: "Администратор",
  MO: "Медицинская организация",
  TFOMS: "ТФОМС",
  SMO: "Страховая медицинская организация",
};

// ==========================================
// Информация о пользователе.
// Совпадает с UserInfoDto из бэка
// (HealthTrack.Application.Features.Auth.Dtos.UserInfoDto).
// ==========================================
export interface HTUserInfo {
  id: string;
  email: string;
  fullName: string;
  hospitalCode: string | null;
  regionCode: string | null;
  roles: string[];
}

// ==========================================
// Ответ на POST /api/auth/login.
// Бэк возвращает плоский объект (не Result<T>),
// сам refresh-токен кладётся в HttpOnly Cookie.
// ==========================================
export interface HTLoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string; // ISO 8601
  user: HTUserInfo;
}

// ==========================================
// Ответ на POST /api/auth/refresh.
// Бэк возвращает ТОЛЬКО accessToken.
// Профиль пользователя после refresh подтягиваем отдельно (GET /auth/me).
// ==========================================
export interface HTRefreshResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
}

// ==========================================
// Запрос на POST /api/auth/login.
// rememberMe влияет на срок жизни refresh-токена на бэке:
//   true  → 30 дней
//   false → 7 дней
// ==========================================
export interface HTLoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// ==========================================
// ProblemDetails — формат ошибок от GlobalExceptionMiddleware.
// Пример:
//   {
//     "type": "https://httpstatuses.io/400",
//     "title": "Ошибка валидации",
//     "status": 400,
//     "errors": ["Пароль обязателен"],
//     "traceId": "..."
//   }
// ==========================================
export interface HTProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  errors?: string[];
  traceId?: string;
}

// ==========================================
// Type-guard: безопасно проверить, что ответ от бэка — ProblemDetails.
// Используется в catch-блоках, когда error имеет тип unknown.
// ==========================================
export const isHTProblemDetails = (
  value: unknown,
): value is HTProblemDetails => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("title" in value || "errors" in value)
  );
};