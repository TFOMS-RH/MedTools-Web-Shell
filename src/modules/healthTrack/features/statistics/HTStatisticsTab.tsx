// ==========================================
// modules/healthTrack/features/statistics/HTStatisticsTab.tsx
// ==========================================
import { useCallback, useMemo, useState } from "react";

import {
  HTDateRangeFilter,
  type HTDateRangeValue,
} from "../../ui/HTDateRangeFilter/HTDateRangeFilter";
import { HTStatisticsKpi } from "./components/HTStatisticsKpi/HTStatisticsKpi";
import { HTStatisticsTopMos } from "./components/HTStatisticsTopMos/HTStatisticsTopMos";
import { HTStatisticsTopDiagnoses } from "./components/HTStatisticsTopDiagnoses/HTStatisticsTopDiagnoses";
import { HTStatisticsByPeriod } from "./components/HTStatisticsByPeriod/HTStatisticsByPeriod";
import { HTStatisticsByAge } from "./components/HTStatisticsByAge/HTStatisticsByAge";

import { useStatisticsOverviewQuery } from "../../hooks/useStatisticsQuery";

import type { HTStatisticsQueryParams } from "../../types/htStatistics";

import styles from "./styles.module.scss";

// ==========================================
// Дефолтный фильтр.
// ==========================================
const DEFAULT_FILTER: HTDateRangeValue = {
  periodFrom: "",
  periodTo: "",
};

/**
 * Раздел «Статистика».
 *
 * Дашборд с аналитикой по региону:
 *  - KPI-плитки;
 *  - топ-10 МО;
 *  - топ-10 диагнозов;
 *  - динамика по периодам;
 *  - распределение по возрастным группам.
 *
 * Роли: Admin + TFOMS.
 */
export const HTStatisticsTab = () => {
  // ==========================================
  // Состояние фильтра.
  // ==========================================
  const [filter, setFilter] = useState<HTDateRangeValue>(DEFAULT_FILTER);
  const [appliedFilter, setAppliedFilter] =
    useState<HTDateRangeValue>(DEFAULT_FILTER);

  // ==========================================
  // Параметры запроса.
  // ==========================================
  const queryParams: HTStatisticsQueryParams = useMemo(() => {
    return {
      periodFrom: appliedFilter.periodFrom.trim() || undefined,
      periodTo: appliedFilter.periodTo.trim() || undefined,
    };
  }, [appliedFilter]);

  // ==========================================
  // Запрос.
  // ==========================================
  const { data, isLoading } = useStatisticsOverviewQuery(queryParams);

  // ==========================================
  // Обработчики.
  // ==========================================
  const handleApplyFilter = useCallback((value: HTDateRangeValue) => {
    setAppliedFilter(value);
  }, []);

  const handleResetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
    setAppliedFilter(DEFAULT_FILTER);
  }, []);

  // ==========================================
  // Рендер.
  // ==========================================
  return (
    <section className={styles.tabRoot}>
      {/* ============================== */}
      {/* Заголовок */}
      {/* ============================== */}
      <header className={styles.header}>
        <h2 className={styles.title}>Статистика</h2>
        <p className={styles.subtitle}>
          Аналитика по регистру ДН и загруженным документам
        </p>
      </header>

      {/* ============================== */}
      {/* Фильтр по периоду */}
      {/* ============================== */}
      <HTDateRangeFilter
        value={filter}
        onChange={setFilter}
        onSubmit={handleApplyFilter}
        onReset={handleResetFilter}
        disabled={isLoading}
      />

      {/* ============================== */}
      {/* Загрузка / данные */}
      {/* ============================== */}
      {isLoading && !data && (
        <div className={styles.loadingBlock}>Загрузка статистики…</div>
      )}

      {data && (
        <>
          {/* KPI */}
          <HTStatisticsKpi kpi={data.kpi} />

          {/* Ряд 1: Топ МО + Топ диагнозов */}
          <div className={styles.chartsRow}>
            <HTStatisticsTopMos data={data.topMos} isLoading={isLoading} />
            <HTStatisticsTopDiagnoses
              data={data.topDiagnoses}
              isLoading={isLoading}
            />
          </div>

          {/* Ряд 2: Динамика + По возрасту */}
          <div className={styles.chartsRow}>
            <HTStatisticsByPeriod data={data.byPeriod} isLoading={isLoading} />
            <HTStatisticsByAge
              data={data.byAgeGroup}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </section>
  );
};