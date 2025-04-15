export class ApiResponse<T> {
  isSuccess: boolean;
  data?: T;
  error?: {
    statusCode?: number;
    message?: string;
    errors?: any[];
  };
  constructor(isSucceess: boolean, data?: T, error?: ApiResponse<T>["error"]) {
    this.isSuccess = isSucceess;
    this.data = data;
    this.error = error;
  }
  static CreateSuccess<T>(data: T): ApiResponse<T> {
    const res = new ApiResponse<T>(true, data);
    return res;
  }
  static CreateError<T>(
    status: number,
    message: string,
    errors?: any[]
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, undefined, {
      errors: errors,
      message: message,
      statusCode: status,
    });
  }
}
