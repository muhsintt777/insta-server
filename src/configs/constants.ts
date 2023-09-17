export const TABLES = {
  POSTS: "posts",
  USERS: "users",
};

export const REGEX = {
  email: /^[\w\.-]+[\+\w\.-]*@[\w\.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
};

export const TOKEN_COOKIE_AGE = 2 * 60 * 1000;
