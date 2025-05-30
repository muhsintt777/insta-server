export const ERROR_TYPE = {
  BAD_REQUEST: 'BAD_REQUEST',

  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  FILE_SIZE_EXCEEDED: 'FILE_SIZE_EXCEEDED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

const ERROR_STATUS_CODE: Record<
  (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE],
  number
> = {
  BAD_REQUEST: 400,

  AUTH_TOKEN_EXPIRED: 401,
  AUTH_UNAUTHORIZED: 401,
  FORBIDDEN: 403,

  RESOURCE_NOT_FOUND: 404,
  RESOURCE_CONFLICT: 409,
  FILE_SIZE_EXCEEDED: 413,
  VALIDATION_ERROR: 422,
  UNSUPPORTED_MEDIA_TYPE: 415,
  INTERNAL_SERVER_ERROR: 500,
} as const;

type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export class CustomError extends Error {
  statusCode: number;
  errorType: string;

  constructor(errorType: ErrorType, message: string) {
    super(message);
    this.statusCode = ERROR_STATUS_CODE[errorType];
    this.errorType = errorType;
    this.name = 'CUSTOM_ERROR';

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
