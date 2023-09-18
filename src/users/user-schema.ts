import { z } from "zod";
import { REGEX } from "configs/constants";

export const CreateUserReqSchema = z.object({
  firstName: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be string",
    })
    .trim()
    .regex(REGEX.name, "Firstname is not valid"),
  lastName: z
    .string({
      invalid_type_error: "Lastname must be string",
    })
    .trim()
    .regex(REGEX.name, "Lastname is not valid")
    .optional()
    .nullable(),
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
export type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;
