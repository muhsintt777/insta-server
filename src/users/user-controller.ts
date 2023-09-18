import { Request, Response } from "express";
import { UserService } from "./user-service";
import { UserValidation } from "./user-validation";

export class UserController {
  static async getUser(req: Request, res: Response) {
    console.log(req, res);
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } =
        UserValidation.createUserReq(req.body);

      const user = await UserService.createUser(
        firstName,
        lastName,
        email,
        password
      );
      res.status(201).json(user);
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
