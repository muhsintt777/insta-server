import { z } from "zod";
import { REGEX } from "configs/constants";

export const LoginReqSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .trim()
    .regex(REGEX.email, "Email is not valid"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .trim()
    .regex(REGEX.password, "Password is not valid"),
});
export type LoginReqType = z.infer<typeof LoginReqSchema>;
