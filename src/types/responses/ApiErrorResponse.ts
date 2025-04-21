export type ApiErrorResponse = {
  type?: string;
  title?: string;
  status: number;
  detail?: string;
  traceId: string;
  errors?: object[];
};
