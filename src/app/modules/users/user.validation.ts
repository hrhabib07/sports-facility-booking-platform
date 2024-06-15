// import { z } from "zod";

// const createUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(1, { message: "Password is required" }),
//     phone: z.string().min(1, { message: "Phone number is required" }),
//     role: z.enum(["admin", "user"], {
//       message: "Role must be 'admin' or 'user'",
//     }),
//     address: z.string().min(1, { message: "Address is required" }),
//   }),
// });

// const updateUserValidation = z.object({
//   body: z.object({
//     name: z.string().min(1, { message: "Name is required" }).optional(),
//     email: z.string().email({ message: "Invalid email address" }).optional(),
//     password: z.string().min(1, { message: "Password is required" }).optional(),
//     phone: z
//       .string()
//       .min(1, { message: "Phone number is required" })
//       .optional(),
//     role: z
//       .enum(["admin", "user"], { message: "Role must be 'admin' or 'user'" })
//       .optional(),
//     address: z.string().min(1, { message: "Address is required" }).optional(),
//   }),
// });

// export const UserValidation = {
//   createUserValidationSchema,
//   updateUserValidation,
// };
