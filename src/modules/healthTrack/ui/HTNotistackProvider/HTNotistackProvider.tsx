// ==========================================
// modules/healthTrack/ui/HTNotistackProvider/HTNotistackProvider.tsx
// ==========================================
import { forwardRef, type ReactNode } from "react";
import { SnackbarProvider, type SnackbarProviderProps } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface HTNotistackProviderProps {
  children: ReactNode;
}

/**
 * Провайдер снекбаров для модуля HealthTrack.
 *
 * Настраивает:
 *  - позицию: нижний правый угол (не перекрывает шапку и хедер раздела).
 *  - автоскрытие: 4 секунды.
 *  - цветовую схему: в стиле дизайн-системы (белая плашка, тёмный текст).
 *  - иконки для каждого типа (success, error, info, warning).
 *  - кнопку "Закрыть" на каждом снекбаре.
 *
 * Использование — через хук useHTNotify или напрямую useSnackbar.
 */
export const HTNotistackProvider = ({
  children,
}: HTNotistackProviderProps) => {
  // Дефолтные опции — можно переопределить в каждом вызове enqueueSnackbar.
  const providerProps: Partial<SnackbarProviderProps> = {
    maxSnack: 3,
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    // Стилизация контейнера снекбаров.
    Components: {
      // Дефолтный компонент — Material-стиль.
      default: SnackbarContent,
    },
    // Иконки для каждого варианта.
    iconVariant: {
      success: <CheckCircleIcon sx={{ fontSize: 20 }} />,
      error: <ErrorIcon sx={{ fontSize: 20 }} />,
      warning: <WarningIcon sx={{ fontSize: 20 }} />,
      info: <InfoIcon sx={{ fontSize: 20 }} />,
    },
    // Тексты кнопки "закрыть".
    // hideIconVariant: false (по умолчанию показываем).
  };

  return (
    <SnackbarProvider {...providerProps}>{children}</SnackbarProvider>
  );
};

// ==========================================
// Кастомный компонент снекбара.
// Используем forwardRef, потому что notistack прокидывает ref
// в компонент снекбара для анимаций.
// ==========================================
const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ message, variant, onClose }, ref) => {
    // Цвета по варианту.
    const variantStyles = getVariantStyles(variant);

    return (
      <div
        ref={ref}
        className="ht-snackbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          padding: "var(--space-5) var(--space-7)",
          minWidth: "18rem",
          maxWidth: "28rem",

          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-l)",
          background: "var(--card-background)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",

          fontFamily: "var(--inter)",
          fontSize: "var(--fs-body2)",
          color: "var(--text-default)",
        }}
      >
        {/* Иконка с цветом по варианту */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: variantStyles.color,
            flexShrink: 0,
          }}
        >
          {variantStyles.icon}
        </div>

        {/* Текст */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {message}
        </div>

        {/* Кнопка закрытия */}
        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "var(--text-secondary)",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </div>
    );
  },
);

SnackbarContent.displayName = "SnackbarContent";

// ==========================================
// Вспомогательные типы и хелперы.
// ==========================================

interface SnackbarContentProps {
  id: string | number;
  message: ReactNode;
  variant: "default" | "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

const getVariantStyles = (
  variant: SnackbarContentProps["variant"],
): { color: string; icon: ReactNode } => {
  switch (variant) {
    case "success":
      return {
        color: "#1a7f37",
        icon: <CheckCircleIcon sx={{ fontSize: 22 }} />,
      };
    case "error":
      return {
        color: "#b91c1c",
        icon: <ErrorIcon sx={{ fontSize: 22 }} />,
      };
    case "warning":
      return {
        color: "#996600",
        icon: <WarningIcon sx={{ fontSize: 22 }} />,
      };
    case "info":
      return {
        color: "#1a4fbf",
        icon: <InfoIcon sx={{ fontSize: 22 }} />,
      };
    default:
      return {
        color: "var(--text-default)",
        icon: <InfoIcon sx={{ fontSize: 22 }} />,
      };
  }
};