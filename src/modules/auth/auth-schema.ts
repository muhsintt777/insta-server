import { z } from "zod";
import { REGEX } from "configs/constants";

export const LoginReqSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
      })
      .trim()
      .regex(REGEX.email, "Email is not valid")
      .optional(),

    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be string",
      })
      .trim()
      .optional(),

    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .trim()
      .regex(REGEX.password, "Password is not valid"),
  })
  .refine(
    (data) => data.email || data.username, // Ensure at least one of email or username is provided
    {
      message: "Either email or username is required",
      path: ["email", "username"], // Target both fields in the error message
    }
  );
