import { Request, Response } from "express";
import { TOKEN_COOKIE_AGE } from "configs/constants";
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

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: TOKEN_COOKIE_AGE,
      });
      res.status(200).json({ message: "Login successfull" });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { token } = AuthValidation.getUserReq(req.body);

      const user = await AuthService.getUser(token.id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
}
