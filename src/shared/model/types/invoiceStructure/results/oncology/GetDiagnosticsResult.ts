export interface GetDiagnosticsResult {
  diagnostics: DiagnosticListItemDto[];
}

export interface DiagnosticListItemDto {
  diagnosticsUid: number;
  specimenCollectionDate: string | null;
  diagnosticType: number | null;
  diagnosticCode: number | null;
  diagnosticResultCode: number | null;
  isResultReceived: boolean | null;
}
