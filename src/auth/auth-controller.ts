import { Request, Response } from "express";
import { AuthService } from "./auth-service";
import { AuthValidation } from "./auth-validation";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const userCreds = AuthValidation.loginReq(req.body);
      const accessToken = await AuthService.login(
        userCreds.email,
        userCreds.password
      );
      res.status(200).json({ accessToken });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Somthing went wrong" });
      }
    }
  }
}
