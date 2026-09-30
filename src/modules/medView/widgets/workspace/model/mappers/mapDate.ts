import type { Dayjs } from "dayjs";

export const mapDate = (date: Dayjs | null): string | null =>
  date?.format("YYYY-MM-DD") ?? null;
