// ==========================================
// modules/healthTrack/api/htRegisterDnService.ts
// ==========================================
import apiHealthTrackClient from "../../../app/providers/apiHealthTrackClient";

import type {
  HTRegisterDnPagedResult,
  HTRegisterDnQueryParams,
  HTRegisterDnDetails,
} from "../types/htRegisterDn";

/**
 * API-сервис раздела «Регистр ДН».
 */
export const htRegisterDnService = {
  /**
   * GET /api/register-dn
   * Постраничный список пациентов с фильтрами.
   */
  getRegisterDn: async (
    params: HTRegisterDnQueryParams = {},
  ): Promise<HTRegisterDnPagedResult> => {
    const response = await apiHealthTrackClient.get<HTRegisterDnPagedResult>(
      "/register-dn",
      { params },
    );
    return response.data;
  },

  /**
   * GET /api/register-dn/{enp}
   * Детальная карточка пациента.
   */
  getRegisterDnDetails: async (
    enp: string,
  ): Promise<HTRegisterDnDetails> => {
    const response = await apiHealthTrackClient.get<HTRegisterDnDetails>(
      `/register-dn/${enp}`,
    );
    return response.data;
  },
};