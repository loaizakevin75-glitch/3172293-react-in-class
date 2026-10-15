//Importamos el repositorio de usuarios
//El servicio depende del repository para acceder a la persistencia,
//Pero el repository NO debe conocer el service
import { userRepository } from "./user.repository.js";
import bcrypt from "bcrypt";

//Exportamos el servicio de usuarios
//El service representa la capa logica de negocio a la aplicacion 
export const userService = {

    //Metodo encargado de crear un usuario
    //Recibe datos  proveniente del controller
    //idealmente ya validados a nivel estructural (DTO / schema )
    async createUser(data) {

        
 
            const hashedPassword = await bcrypt.hash(data.userPassword, 10);

            const userData = {
                ...data,
                password: hashedPassword,
            };

            console.log("PASSWORD ORIGINAL:", data.userPassword);
            console.log("PASSWORD HASHEADA:", hashedPassword);
            console.log("USER DATA:", userData);
        

        //En este punto, en una arquitectura real deberian ocurrir:
        // validaciones de reglas de negocio 
        //Transformaciones (Ej: hash de contraseña)
        //Verificaciones de unidad (email, documento, etc)
        //Decisiones de negocio (roles, flags, estaods iniciales)

        //Actualmente, el metodo solo delega directamente al repository
        //Sin agregar ninguna logica adicional
        return await userRepository.create(userData);
    },
};