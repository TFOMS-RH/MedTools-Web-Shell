import apiClient from "../../../shared/api/client/apiClient";
import type {
  HTStatisticsOverview,
  HTStatisticsQueryParams,
} from "../types/htStatistics";

export const htStatisticsService = {
  getOverview: async (
    params: HTStatisticsQueryParams = {},
  ): Promise<HTStatisticsOverview> => {
    const response = await apiClient.get<HTStatisticsOverview>(
      "health-track/statistics/overview",
      { params },
    );
    return response.data;
  },
};
