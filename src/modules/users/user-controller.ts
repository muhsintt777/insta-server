import { Request, Response } from "express";
import { UserService } from "./user-service";
import { UserValidation } from "./user-validation";

export class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const id = UserValidation.validateId(req.params.id);
      const result = await UserService.getUser(id);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email, username, password, fullName } =
        UserValidation.createUserReq(req.body);

      const userID = await UserService.createUser(
        email,
        username,
        password,
        fullName,
        null
      );
      res.status(201).json({ id: userID });
    } catch (err) {
      console.log(err);
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = UserValidation.validateId(req.params.id);
      const userID = await UserService.deleteUser(id);
      res.status(200).json({ id: userID });
    } catch (error) {
      console.log(error);
      if (error.statusCode && error.errorMessage) {
        res.status(error.statusCode).json({ message: error.errorMessage });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    }
  }
}
