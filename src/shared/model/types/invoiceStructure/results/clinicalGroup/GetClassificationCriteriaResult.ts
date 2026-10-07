export interface GetClassificationCriteriaResult {
  classificationCriteria: ClassificationCriterionDto[];
}

export interface ClassificationCriterionDto {
  classificationCriterionUid: number;
  classificationCriterion: string;
}
