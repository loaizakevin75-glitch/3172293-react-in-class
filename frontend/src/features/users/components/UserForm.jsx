import { useNavigate } from  "react-router-dom"

const navigate = useNavigate();

import { createUser } from "../services/userService";

const [isSubmitting, setIsSubmitting] = useState(false);

//==================HANDLE SUBMIT======================
const handleSubmit = async (e) => {
    //Evita que el formulario recargue la pagina
    e.preventDefault();

    //Validamos los datos del formulario contra el esquema zod
    //safeParse NO lanza excepcion, retorna un obbjeto controlado
    const result = userSchema.safeParse(FormData);

    //Verificar en consola si el esquema esta funcionando correctamente 
    console.log(result);

    //Si la validacion falla 
    if (!result.success) {
        //Objeto donde almacenaremos los errores por campo
        const fieldErrors = {};

        //Recorremos cada error generado por zod
        result.error,issues.forEach((issue) => {
            //issue.path[0] corresponde al nombre del campo
            //issue.message contiene el mensaje de error definido en el schema 
            fieldErrors[issue.path[0]] = issue.message;
        });

        //Actualizamos el estado de errores para mostrarlo en la UI
        setErrors(fieldErrors);

        //Contamos la ejecucion: NO se envia nada al backend

        return;
    }

    //Si ña validacion pasa, limpiamos errores previos
    setErrors({});

    //Activamos estado de envio (util para deshabilitar el boton)
    setIsSubmitting(true);

    try {
        //Llamamos al servicio frontend que consume la API
        //result.data contiene los datos ya validados por zod 
        const response = await createUser(result.data);

        //Log informativo para desarrollo
        console.log("usuario creado:", response);

        //feedback basico al usuario
        alert("Usuario creado correctamente");

        //Navegamos a la vista anterior
        //Navigate(-1) Equivale a volver atras
        navigate(-1);
    }catch (error) {
        //Capturamos errores de red o errores lanzados por el service
        console.error("Error:", error.message);

        //Mostramos el mensaje de error al usuario
        alert(error.message);
    } finally {
        //Pase lo que pase, desactivamos el estado de envio
        setIsSubmitting(false);
    }
};

