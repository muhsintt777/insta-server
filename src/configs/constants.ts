export const TABLES = {
  POSTS: "posts",
  USERS: "users",
};

export const REGEX = {
  email: /^[\w\.-]+[\+\w\.-]*@[\w\.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
  fullName: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
  username: /^(?=.{3,20}$)[a-zA-Z0-9_]+$/,
};

export const TOKEN_COOKIE_AGE = 24 * 60 * 60 * 1000;

export const FILE_TYPE = {
  imagePNG: "image/png",
  imageJPEG: "image/jpeg",
  imageJPG: "image/jpg",
};
