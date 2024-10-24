export const REGEX = {
  email: /^[\w\.-]+[\+\w\.-]*@[\w\.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
  fullName: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
  username: /^(?=.{3,20}$)[a-zA-Z0-9_]+$/,
} as const;

export const COOKIE_EXPIRY_IN_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const ACCESS_TOKEN_EXPIRY_IN_MINUTES = 30;
export const REFRESH_TOKEN_EXPIRY_IN_MINUTES = 60 * 24 * 1; // 1 day

export const FILE_TYPE = {
  imagePNG: "image/png",
  imageJPEG: "image/jpeg",
  imageJPG: "image/jpg",
} as const;

export const ERROR_TYPE = {
  AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS",
  AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED",
  AUTH_TOKEN_MISSING: "AUTH_TOKEN_MISSING",
  AUTH_UNAUTHORIZED: "AUTH_UNAUTHORIZED",

  VALIDATION_FAILED: "VALIDATION_FAILED",
  VALIDATION_REQUIRED_FIELD_MISSING: "VALIDATION_REQUIRED_FIELD_MISSING",

  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",

  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  UNSUPPORTED_FILE_TYPE: "UNSUPPORTED_FILE_TYPE",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
  NODE_ERROR: "NODE_ERROR",
  DB_ERROR: "DB_ERROR",
} as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
