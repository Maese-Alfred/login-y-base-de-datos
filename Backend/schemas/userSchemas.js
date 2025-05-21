import {z} from "zod";

export const userSchema = z.object({
  uid_firebase: z.string().min(1, "UID is required"),
  nombre: z.string().min(3, "Username must be at least 3 characters long"),
  correo: z.string().email("Correo no válido"),
  rol: z.enum(["admin", "user", "guest"]).optional(),
  tipoUsuarioID: z.number().optional(),
});