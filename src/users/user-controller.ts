import { Request, Response } from "express";
import { UserService } from "./user-service";

export class UserController {
  static async getUser(req: Request, res: Response) {
    console.log(req, res);
  }

  static async createUser(req: Request, res: Response) {
    try {
      const firstName: string = req.body.firstName;
      const lastName: string | null = req.body.lastName || null;
      const email: string = req.body.email;
      const password: string = req.body.password;

      if (!firstName || !email || !password) {
        throw {
          statusCode: 400,
          errorMesage: "firstName, lastName and password are required",
        };
      }

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
