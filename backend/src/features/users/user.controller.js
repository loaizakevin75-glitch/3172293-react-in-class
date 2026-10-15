// Importamos el servivio de usuarios.
// Él controller NO implementa lógica de negocio,
// solo delega la operacion al service correspondiente.

import { userService } from "./user.service.js";

// Exportamosa un pobejto controlador.
// Agrupar handlers en un objeto permite escalabiliodad
// (create, update, delete, getById, etc)
export const userController = { 
    // Método encatgado de manejar la creacion de un usuariio
    // Se asume que este método será usado como handler de una ruta Exprees
    async create(req,res){

        // Log del cuerpo de la petición
        // Útil para el desarrollo para validar frontend envia correctamente los datos
        // En producción suele remplazarse por logging estructurado o eliminarse
        console.log("BODY RECIBIDO", req.body); 

        try {
            // Llamamos al servicio de susuario, pasando los datos recibidos
            // Aqui ocurre la logica real de negocio (validaciones, persistencia, etc.)

            const user = await userService.createUser(req.body);
            
            // Respuesta HTTP en caso de éxito
            // 201: recurso creado correctamente según el estándar REST
            res.status(201).json({
                // Mensaje informativo para el cliente
                message: "Usuario creado correctamente",

                // Retornamos únicamente el id del usario creado
                // Evita exporner informacion sensible e innecesaria
                userId: user.id,
            });
        } catch (err) {
            // Capturamos cualquier error lanzado por el service o capas inferirores
            // Se registra el error completo para depuracion de backend

            console.error("ERROR BACKEND", err)

            // Respuesta HTTP de error Genérico
            // 500: error interno del servidor

            res.status(500).json({
                // Se envia el mensaje del error para diagnóstico
                // En producción suele mapearse a mensajes controlados
                error: err.message,
            });
        }
    }
}