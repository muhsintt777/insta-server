import { ERROR_TYPE } from "configs/constants";

// type ErrorType = typeof ERROR_TYPE;
type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export class ApiError {
  statusCode: number;
  errorMessage: string;
  errorType: ErrorType;

  constructor(statusCode: number, errorMessage: string, errorType: ErrorType) {
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.errorType = errorType;
  }
}
