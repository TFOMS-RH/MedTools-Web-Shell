// ==========================================
// modules/healthTrack/hooks/useRegisterDnQueries.ts
// ==========================================
import { useQuery } from "@tanstack/react-query";

import { htRegisterDnService } from "../api/htRegisterDnService";

import type {
  HTRegisterDnPagedResult,
  HTRegisterDnQueryParams,
  HTRegisterDnDetails,
} from "../types/htRegisterDn";

// ==========================================
// Ключи кэша.
// ==========================================
export const HT_REGISTER_DN_QUERY_KEYS = {
  all: ["ht", "register-dn"] as const,

  list: (params: HTRegisterDnQueryParams) =>
    ["ht", "register-dn", "list", params] as const,

  details: (enp: string) =>
    ["ht", "register-dn", "details", enp] as const,
};

// ==========================================
// QUERY: список пациентов.
// ==========================================
export const useRegisterDnQuery = (params: HTRegisterDnQueryParams) => {
  return useQuery<HTRegisterDnPagedResult, Error>({
    queryKey: HT_REGISTER_DN_QUERY_KEYS.list(params),
    queryFn: () => htRegisterDnService.getRegisterDn(params),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  });
};

// ==========================================
// QUERY: детали пациента.
// ==========================================
export const useRegisterDnDetailsQuery = (enp: string | null) => {
  return useQuery<HTRegisterDnDetails, Error>({
    queryKey: HT_REGISTER_DN_QUERY_KEYS.details(enp ?? ""),
    queryFn: () => htRegisterDnService.getRegisterDnDetails(enp!),
    enabled: enp !== null && enp !== "",
    staleTime: 60_000,
  });
};