import type { HTRole } from "../types/htAuth";
import { create } from "zustand";

export interface HealthTrackUser {
  id: string;
  email: string;
  fullName: string;
  hospitalCode: string | null;
  regionCode: string | null;
  roles: string[];
}

interface HealthTrackAuthState {
  user: HealthTrackUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  hasRole: (...roles: HTRole[]) => boolean;
}

export const useHealthTrackAuthStore = create<HealthTrackAuthState>(
  (_set, get) => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    hasRole: (...roles) => {
      const userRoles = get().user?.roles ?? [];
      return roles.some((r) => userRoles.includes(r));
    },
  }),
);
