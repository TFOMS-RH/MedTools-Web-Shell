export interface GetInjectionDatesResult {
  injectionDates: InjectionDateDto[];
}

export interface InjectionDateDto {
  injectionDateUid: number;
  administrationDate: string;
}
