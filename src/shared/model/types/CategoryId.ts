const rControlCategoryIds = [
  "default",
  "patient",
  "case-details",
  "oncology",
  "prescriptions",
  "clinical-groups",
  "provided-services",
  "defects",
] as const;

const medViewCategoryId = [
  "default",
  "patient",
  "case-details",
  "oncology",
  "prescriptions",
  "clinical-groups",
  "provided-services",
  "defects",
  "export",
] as const;

export type RControlCategoryId = (typeof rControlCategoryIds)[number];
export type MedViewCategoryId = (typeof medViewCategoryId)[number];
