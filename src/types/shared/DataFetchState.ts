export type DataFetchState<T = unknown> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
};
