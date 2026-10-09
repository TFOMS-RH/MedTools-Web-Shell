export type HTRole = "Admin" | "MO" | "TFOMS" | "SMO";

export const HT_ROLE_LABELS: Record<HTRole, string> = {
  Admin: "Администратор",
  MO: "Медицинская организация",
  TFOMS: "ТФОМС",
  SMO: "Страховая медицинская организация",
};

export interface HTUserInfo {
  id: string;
  email: string;
  fullName: string;
  hospitalCode: string | null;
  regionCode: string | null;
  roles: string[];
}

export interface HTProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  errors?: string[];
  traceId?: string;
}

export const isHTProblemDetails = (
  value: unknown,
): value is HTProblemDetails => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("title" in value || "errors" in value)
  );
};
