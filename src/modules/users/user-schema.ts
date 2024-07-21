import { z } from "zod";
import { REGEX } from "configs/constants";

export const CreateUserReqSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .trim()
    .regex(REGEX.email, "Email is not valid"),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be string",
    })
    .trim()
    .regex(REGEX.username, "Invalid username"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .trim()
    .regex(REGEX.password, "Password is not valid"),
  fullName: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be string",
    })
    .trim()
    .regex(REGEX.fullName, "Firstname is not valid"),
});
export type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;
