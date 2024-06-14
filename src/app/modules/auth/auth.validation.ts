import { z } from "zod";
import { User_Role } from "../users/userConstant";

// Zod schema for TUserSignIn
const userSignInSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        role: z.nativeEnum(User_Role),
        address: z.string(),
        passwordChangedAd: z.date().optional(),
    })
});

// Zod schema for TUserLogin
const userLoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    })
});

export const AuthValidation = {
    userSignInSchema,
    userLoginSchema
} 