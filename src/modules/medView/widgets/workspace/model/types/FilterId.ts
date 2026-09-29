const filterGroupIds = [
  "none",
  "persons",
  "case-details",
  "oncology",
  "prescriptions",
  "clinical-groups",
  "provided-services",
  "sanctions",
  "internal-service",
  "ICD",
] as const;

export type FilterGroupId = (typeof filterGroupIds)[number];
