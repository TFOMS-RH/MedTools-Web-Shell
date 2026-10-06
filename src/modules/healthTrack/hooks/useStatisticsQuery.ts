// ==========================================
// modules/healthTrack/hooks/useStatisticsQuery.ts
// ==========================================
import { useQuery } from "@tanstack/react-query";

import { htStatisticsService } from "../api/htStatisticsService";

import type {
  HTStatisticsOverview,
  HTStatisticsQueryParams,
} from "../types/htStatistics";

// ==========================================
// Ключи кэша.
// ==========================================
export const HT_STATISTICS_QUERY_KEYS = {
  all: ["ht", "statistics"] as const,

  overview: (params: HTStatisticsQueryParams) =>
    ["ht", "statistics", "overview", params] as const,
};

// ==========================================
// QUERY: данные дашборда.
// ==========================================
/**
 * Получить данные статистики.
 *
 * Кэш зависит от params — при смене фильтра запрос пересчитается.
 * Держим предыдущие данные во время загрузки, чтобы графики
 * не «моргали» при смене периода.
 */
export const useStatisticsOverviewQuery = (
  params: HTStatisticsQueryParams,
) => {
  return useQuery<HTStatisticsOverview, Error>({
    queryKey: HT_STATISTICS_QUERY_KEYS.overview(params),
    queryFn: () => htStatisticsService.getOverview(params),
    placeholderData: (previousData) => previousData,
    // 60 секунд — статистика меняется редко.
    staleTime: 60_000,
  });
};