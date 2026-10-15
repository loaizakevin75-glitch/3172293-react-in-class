// Importamos Express, el framework base para construir el servidor HTTP
import express from "express";

//Importamos el middleware CORS
//Permite controlar que origenes pueden comunicarse con el backend 
import cors from "cors";

//importamos las rutas del feature users
//cada feature expone su propio router independiente 
import userRoutes from "./features/users/user.routes.js";
import authRoutes from "./features/auth/auth.routes.js";

//Creamos la instancia principal de la aplicacion Express
const app = express();

//middleware de CORS
//permite solicitudes unicamente desde el frontend en localhost:5173
//(Tipico proyecto vite en desarrollo)
app.use(cors({ origin: "http://localhost:5173"}));

//middleware para parsear cuerpos de peticion en formato JSON
//sin este  middleware, req.body seria undefined
app.use(express.json());

//Registro del router de usuarios
//todas las rutas del feature users quedaran bajo el prefijo /api/users
// Ejemplo final: POST http://localhost:4000/api/users
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//Exportamos la aplicacion configurada
//El arranque del servidor se hace en server.js
export default app;
