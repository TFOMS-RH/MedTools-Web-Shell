// ==========================================
// modules/healthTrack/HealthTrackApp.tsx
// ==========================================
import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { useHealthTrackAuthStore } from "./stores/healthTrackAuthStore";

import { HTProtectedRoute } from "./components/HTProtectedRoute/HTProtectedRoute";
import { HTNotistackProvider } from "./ui/HTNotistackProvider/HTNotistackProvider";

import { AppLayout } from "../../components/layouts/AppLayout/AppLayout";

import { HTLogin } from "./pages/HTLogin/HTLogin";
import { HTMain } from "./pages/HTMain/HTMain";
import { HTForbidden } from "./pages/HTForbidden/HTForbidden";
import { HTNotFound } from "./pages/HTNotFound/HTNotFound";

/**
 * Корневой компонент модуля HealthTrack.
 * Монтируется в main.tsx на маршрут /health-track/*.
 *
 * Отвечает за:
 *  1. Bootstrap сессии (восстановление после F5 через refresh-токен в Cookie).
 *  2. Уведомления через Notistack (обёртка HTNotistackProvider).
 *  3. Внутренние роуты модуля.
 *
 * Использует общий AppLayout Никитки (AppHeader + AppFooter) для защищённых страниц,
 * и рендерит HTLogin без него (без шапки, как /login у Никитки).
 */
export const HealthTrackApp = () => {
  const bootstrap = useHealthTrackAuthStore((s) => s.bootstrap);

  // Один раз при первом mount модуля — пробуем восстановить сессию.
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <HTNotistackProvider>
      <Routes>
        {/* ============================== */}
        {/* Публичные роуты (без AppLayout) */}
        {/* ============================== */}
        <Route path="login" element={<HTLogin />} />

        {/* ============================== */}
        {/* Защищённые роуты (внутри AppLayout Никитки) */}
        {/* ============================== */}
        <Route element={<HTProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="403" element={<HTForbidden />} />

            {/* Главная модуля — с табами-карточками разделов. */}
            <Route index element={<HTMain />} />

            {/* Всё, что не совпало с известными роутами внутри /health-track/* — 404. */}
            <Route path="*" element={<HTNotFound />} />
          </Route>
        </Route>
      </Routes>
    </HTNotistackProvider>
  );
};