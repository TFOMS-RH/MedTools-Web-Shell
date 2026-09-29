const sex = ["male", "female"] as const;

export type Sex = (typeof sex)[number];
