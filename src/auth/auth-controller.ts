import { Request, Response } from "express";
import { AuthService } from "./auth-service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const email: string | null = req.body.email || null;
      const password: string | null = req.body.password || null;
      if (!email || !password) {
        throw {
          statusCode: 400,
          errorMessage: "email and password are required",
        };
      }

      await AuthService.login(email, password);
      res.sendStatus(203);
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
