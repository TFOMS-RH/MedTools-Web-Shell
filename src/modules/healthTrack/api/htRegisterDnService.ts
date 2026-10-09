import apiClient from "../../../shared/api/client/apiClient";

import type {
  HTRegisterDnPagedResult,
  HTRegisterDnQueryParams,
  HTRegisterDnDetails,
} from "../types/htRegisterDn";

export const htRegisterDnService = {
  getRegisterDn: async (
    params: HTRegisterDnQueryParams = {},
  ): Promise<HTRegisterDnPagedResult> => {
    const response = await apiClient.get<HTRegisterDnPagedResult>(
      "health-track/register-dn",
      { params },
    );
    return response.data;
  },

  getRegisterDnDetails: async (enp: string): Promise<HTRegisterDnDetails> => {
    const response = await apiClient.get<HTRegisterDnDetails>(
      `health-track/register-dn/${enp}`,
    );
    return response.data;
  },
};
