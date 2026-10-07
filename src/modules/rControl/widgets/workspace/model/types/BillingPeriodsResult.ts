export interface GetBillingPeriodsResult {
  billingPeriods: BillingPeriodDto[];
}

export interface BillingPeriodDto {
  billingYear: number;
  billingMonths: number[];
}
