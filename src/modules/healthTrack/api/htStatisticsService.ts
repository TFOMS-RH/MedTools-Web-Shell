// ==========================================
// modules/healthTrack/api/htStatisticsService.ts
// ==========================================
import apiHealthTrackClient from "../../../app/providers/apiHealthTrackClient";

import type {
  HTStatisticsOverview,
  HTStatisticsQueryParams,
} from "../types/htStatistics";

/**
 * API-сервис раздела «Статистика».
 */
export const htStatisticsService = {
  /**
   * GET /api/statistics/overview
   * Все данные дашборда статистики.
   *
   * Параметры periodFrom / periodTo — опциональные.
   * Если не переданы, бэк вернёт данные за всё время.
   */
  getOverview: async (
    params: HTStatisticsQueryParams = {},
  ): Promise<HTStatisticsOverview> => {
    const response = await apiHealthTrackClient.get<HTStatisticsOverview>(
      "/statistics/overview",
      { params },
    );
    return response.data;
  },
};