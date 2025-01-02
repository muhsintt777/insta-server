export const REGEX = {
  email: /^[\w\.-]+[\+\w\.-]*@[\w\.-]+\.\w+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
  fullName: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
  username: /^(?=.{3,20}$)[a-zA-Z0-9_]+$/,
} as const;

export const FILE_TYPE = {
  imagePNG: 'image/png',
  imageJPEG: 'image/jpeg',
  imageJPG: 'image/jpg',
} as const;
