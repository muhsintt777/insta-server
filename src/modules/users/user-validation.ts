import { getZodErrMessage } from "utils/validation";
import { CreateUserReqSchema, GetUserReqSchema } from "./user-schema";

export class UserValidation {
  static createUserReq(reqBody: any) {
    try {
      return CreateUserReqSchema.parse(reqBody);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }

  static getUserReq(reqParams: any) {
    try {
      return GetUserReqSchema.parse(reqParams);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }
}
