import { Request, Response } from "express";
import { COOKIE_EXPIRY_IN_MS, HTTP_STATUS_CODES } from "configs/constants";
import { ApiResponse } from "utils/api-response";
import { ApiError } from "utils/api-error";
import { LoginReqSchema } from "./auth-schema";
import { AuthService } from "./auth-service";

export class AuthController {
  static async login(req: Request, res: Response) {
    const loginDetails = LoginReqSchema.parse(req.body);

    let tokens: {
      accessToken: string;
      refreshToken: string;
    } | null = null;

    if (loginDetails.email) {
      tokens = await AuthService.login({
        type: "EMAIL",
        email: loginDetails.email,
        password: loginDetails.password,
      });
    } else if (loginDetails.username) {
      tokens = await AuthService.login({
        type: "USERNAME",
        username: loginDetails.username,
        password: loginDetails.password,
      });
    } else {
      throw new ApiError(
        HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
        "Email or Username is required",
        "VALIDATION_REQUIRED_FIELD_MISSING"
      );
    }

    console.log("hitt");

    res
      .status(HTTP_STATUS_CODES.OK)
      .cookie("refreshToken", tokens.refreshToken, {
        secure: true,
        maxAge: COOKIE_EXPIRY_IN_MS,
      })
      .cookie("accessToken", tokens.accessToken, {
        secure: true,
        maxAge: COOKIE_EXPIRY_IN_MS,
      })
      .json(new ApiResponse(tokens, HTTP_STATUS_CODES.OK, "Login success"));
    return;
  }
}
