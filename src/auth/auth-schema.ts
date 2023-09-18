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

export const GetUserReqSchema = z.object({
  token: z.object({
    id: z
      .number({
        required_error: "ID not found",
        invalid_type_error: "ID is not number",
      })
      .int(),
    email: z.string().regex(REGEX.email),
    iat: z.number().int(),
    exp: z.number().int(),
  }),
});

export type GetUserReqType = z.infer<typeof GetUserReqSchema>;
