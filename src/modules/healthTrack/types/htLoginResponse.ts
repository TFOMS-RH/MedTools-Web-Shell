export interface HTUserInfo {
  id: string;
  email: string;
  fullName: string;
  hospitalCode: string | null;
  regionCode: string | null;
  roles: string[];
}

export interface HTLoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  user: HTUserInfo;
}

// ==========================================
// Request
// ==========================================
export interface HTLoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}