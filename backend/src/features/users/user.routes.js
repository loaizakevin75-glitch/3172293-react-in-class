// Iportamos Router desde Express.
//Router permite modularizar las rutas por feature
// y mantener el archivo principal de la app limpio.
import { Router } from "express"

//importamos el controlador de usuarios 
// el router nunca implementa logica
//solo delega la ejecucion al controller
import { userController } from "./user.controller.js";

//Creamos una instancia del router de Express
const router = Router();

//Definimos la ruta para crear un usuario
//POST /users
// Cuando se recibe  una peticion POST en la raiz del recurso 
//Express ejecuta el método create del controller
router.post("/", userController.create);

//Exportamos el router para ser registrado en la aplicación principal 
// (Ej: app.use("/users", router))
export default router;