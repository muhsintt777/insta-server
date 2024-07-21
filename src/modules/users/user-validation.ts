import { getZodErrMessage } from "utils/validation";
import { CreateUserReqSchema, UserIdSchema } from "./user-schema";

export class UserValidation {
  static createUserReq(reqBody: any) {
    try {
      return CreateUserReqSchema.parse(reqBody);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }

  static validateId(id: any) {
    try {
      return UserIdSchema.parse(id);
    } catch (err) {
      const errorMessage = getZodErrMessage(err);
      throw { statusCode: 422, errorMessage };
    }
  }
}
