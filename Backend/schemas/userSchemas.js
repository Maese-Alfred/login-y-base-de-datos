import {z} from "zod";

export const userSchema = z.object({
  uid_firebase: z.string().min(1,"UID is required"),
  usuario: z.string().min(3,"Username must be at least 3 characters long"),
  rol: z.enum(["admin", "user"]),
});