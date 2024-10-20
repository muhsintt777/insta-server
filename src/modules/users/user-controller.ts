import { Request, Response } from "express";
import { UserService } from "./user-service";
import { HTTP_STATUS_CODES } from "configs/constants";
import { ApiResponse } from "utils/api-response";
import { CreateUserReqSchema, UserIdSchema } from "./user-schema";

export class UserController {
  static async getUser(req: Request, res: Response) {
    const userID = UserIdSchema.parse(req.params.id);
    const result = await UserService.getUser(userID);

    res
      .status(HTTP_STATUS_CODES.OK)
      .json(new ApiResponse(result, HTTP_STATUS_CODES.OK));
  }

  static async createUser(req: Request, res: Response) {
    const { email, username, password, fullName } = CreateUserReqSchema.parse(
      req.body
    );
    const userID = await UserService.createUser(
      email,
      username,
      password,
      fullName,
      null
    );

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json(
        new ApiResponse(
          { id: userID },
          HTTP_STATUS_CODES.CREATED,
          "User created"
        )
      );
  }

  static async deleteUser(req: Request, res: Response) {
    const id = UserIdSchema.parse(req.params.id);
    const userID = await UserService.deleteUser(id);

    res
      .status(HTTP_STATUS_CODES.OK)
      .json(
        new ApiResponse({ id: userID }, HTTP_STATUS_CODES.OK, "User deleted")
      );
  }
}
