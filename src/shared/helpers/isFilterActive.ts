import dayjs from "dayjs";

export const countActiveFilters = (value: unknown): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0 ? 1 : 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? 1 : 0;
  }

  if (dayjs.isDayjs(value)) {
    return 1;
  }

  if (typeof value === "object") {
    return Object.values(value).reduce(
      (count, nestedValue) => count + countActiveFilters(nestedValue),
      0,
    );
  }

  return 0;
};
