export interface ApiSuccessResponse<T = any> {
  process_time: string;
  data: T;
}

export interface ApiErrorResponse {
  code: number;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

// ---- Classes below to differentiate errors if thrown by HTTP request functions

export class ErrorApiResponse {
  code: number;
  message: string;
  details: ApiErrorDetail[]|undefined;

  constructor({ code, message, details }: ApiErrorResponse) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export class ErrorUnauthorized {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}