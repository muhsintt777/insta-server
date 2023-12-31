import { GetUserReqSchema, LoginReqSchema } from "./auth-schema";
import { getZodErrMessage } from "utils/validation";

export class AuthValidation {
  static loginReq(reqBody: any) {
    try {
      return LoginReqSchema.parse(reqBody);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }

  static getUserReq(reqBody: any) {
    try {
      return GetUserReqSchema.parse(reqBody);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }
}
