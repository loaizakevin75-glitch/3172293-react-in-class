//src/users/schemas/userSchemas.js
//Correcion: agregar campos booleanos

import {z} from "zod";
import { fileSchema } from "@/shared";

export const userSchema = z.object({
    userName: z
    .string()
    .min(3, "El nombre debe tener minimo 3 caracteres")
    .max(60, " El nombre es demasiado largo"),

    userEmail: z
    .email()
    .regex(/[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ingresar un email válido"),

    userPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 digitos"),

    userDocumentTypes: z.string().min(1, "Debe seleccionar un tipo de documento"),

    userDocumentNumber: z
    .string()
    .min(5, "Número de documento inválido")
    .max(20, "Número de documento demasiado largo"),

    userPassword: z
    .string()
    .min(8, "Contraseña debe tener minimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

    // userImage: fileSchema.pick({ files: true }).shape.files.optional(),
    
    // La imagen es opcional: se acepta lista vacía y se normaliza a undefined.
  // Sin este preprocess, [] entra al array interno y falla el .min(1) del fileSchema.
  userImage: z.preprocess(
    (value) => (Array.isArray(value) && value.length === 0 ? undefined : value),
    fileSchema.shape.files.optional(),
  ),

    userAvatarUrl: z
        .string()
        .url("La URL del avatar no es válida")
        .nullable()
        .optional(),

    isStaff: z.boolean(),
    isActive: z.boolean(),
    isSuperUser: z.boolean(),

});