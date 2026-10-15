// URL base del endpoint de usuarios en el backend
//En desarrollo apunta al servidor Express local
//En produccion deberia provenir  de variables de entorno
// const API_URL = "http://localhost:4000/api/users";

import { API_URL } from "@/features/config";

//API_URL es la base (.../api). El recurso se concatena aquí
const USERS_URL = `${API_URL}/users`

//funcion para crear un usuario en el backend
//Recibe un objeto con los datos del usuario
//Retorna la respuesta JSON  del servidor 
export async  function createUser(userData) {
    //Realizamos la peticion  HTTP usando fetch
    const response  = await fetch(USERS_URL, {
        //Metodo HTTP segun convencion REST
        method: "POST",

        //cabeceras de la peticion
        //Indicamos que enviamos JSON
        headers: {
            "Content-Type": "application/json",
        },

        //Convertimos el objeto userData a JSON
        body: JSON.stringify(userData),

    });

    //Verificamos  si la respuesta NO fue existosa (status !=2xx)
    if (!response.ok) {
        //Leemos el cuerpo de la respuesta de error
        const error = await response.json();

        //Esto permite que el componente que llama maneje el error con try/catch
        throw new Error(error.error || "Error al crear usuario");
    }
    
    //Si la peticion fue exitos, retornamos la respuesta parseada como JSON
    return response.json();
}