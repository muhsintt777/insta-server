import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const accessTokenKey = process.env.ACCESS_TOKEN_KEY as string;

export class AuthMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        throw { statusCode: 401, errorMessage: "Auth token required" };
      }

      const decoded = jwt.verify(token, accessTokenKey);
      req.body.token = decoded;

      next();
    } catch (err) {
      if (err.statusCode && err.errorMessage) {
        res.status(err.statusCode).json({ message: err.errorMessage });
      } else if (err.message) {
        res.status(401).json({ message: err.message });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
  }
}
