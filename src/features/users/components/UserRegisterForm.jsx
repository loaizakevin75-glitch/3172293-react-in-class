//UserRegisterForm componente para registrar un usuario

import {useState, useEffect} from "react"
import {Input, Select, Checkbox, Button} from "@/shared";
import { getDocumentTypes} from "@/services/selectService";

export default function UserRegisterForm (){
        //Estado del formulario
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",

        //flags booleans
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });

    //===========================================
    //        Handle Generico
    //===========================================
    /*
    Funcion que se ejecuta cada vez que cambia el valor de un input del formulario
     */
    const handleChange = (e) => {
        // Se obtiene el nombre del campo y su valor
        const { name, value, type, checked} = e.target;

        setFormData((prev) => ({
            //Se copian todos los valores anteriores del estado
            ...prev,

            //Se utiliza unicamente lo que cambió
            [name]: type === "checkbox" ? checked : value,
        }));
    };

      //Estado para los tipos de documentos
      const [documentTypes, setDocumentTypes] = useState([])
    
      //Uso del estado useEffect
      useEffect(() => {
        getDocumentTypes.apply().then(setDocumentTypes);
      },[])

      // ==========Handle Submit====================
      const handleSubmit = async (e) => {
        //Evita que el formulario recargue la página
        e.preventDefault();

        // Validamos los dato del formulario contra el esquema zod
        //safeParse No lanza excepcion, retorna un objeto controlado
        const result = userSchema.safeParse(formData);

        //Verificar en consola si el esquema esta funcionando correctamente
        // console.log(result);

        // Si la validacion falla
        if (!result.succes) {
            // Objeto donde almacenamos los errores por campo
            const fieldErrors = {};

            //Recorremos cada error generado por zod 
            result.error.issues.forEach((issues) => {
                //issues.path[0] corresponde al nombre del campo
                //issues.message contiene el mensaje de error definido en el schema
                fieldErrors[issues.path[0]] = issues.message;

            });
            // Actualizamos el estado de errores para mostrarlos en la UI
            setErrors(fieldErrors);

            //Cortamos la ejecucion: No se envia nada al backend
            
            return;

            //Si la validacion pasa, limpiamos errores previos
            setErrors({});
        }
      }

    return (
        <div>
            <Input 
                label="Nombre"
                type="text"
                placeholder="Escribe tu nombre" 
                htmlFor="user-name"     
                variant="primary"        
                size="sm"        
            />      
            <Input 
                label="Correo"
                type="email"
                placeholder="Escribe tu correo" 
                htmlFor="user-email"             
            />      
            <Input 
                label="Teléfono"
                type="tel"
                placeholder="Escribe tu número de teléfono" 
                htmlFor="user-phone"             
            />  
            <Select 
                label="Tipos de documento"
                name="userDocumentTypes"
                htmlFor="userDocumentTypes"
                options={documentTypes}
            />    
             <Input 
                label="Documento"
                type="text"
                placeholder="Escribe tu número de documento" 
                htmlFor="user-document-number"             
            />
             <Input 
                label="Contraseña"
                type="ássword"
                placeholder="Escribe tu contraseña" 
                htmlFor="user-password"             
            />

            {/*Checkbox */}
            <Checkbox
                id="isSuperUser"
                name="isSuperUser"
                label="Es super usuario"
                Checked={FormData.isSuperUser}
                onChange={handleChange}
            />
            <Checkbox
                id="isStaff"
                name="isStaff"
                label="Es staff"
                Checked={FormData.isStaff}
                onChange={handleChange}
            />
            <Checkbox
                id="isActive"
                name="isActive"
                label="Está activo"
                Checked={FormData.isActive}
                onChange={handleChange}
            />

            {/* Actions */}
          <div className="flex gap-6 items-center">
            <Button
              variant="secondary"
              size="sm"
              type="button"  
              onClick={() => console.log("Se oprimió el cancelar")}          
            >
              Cancelar
            </Button> 
            <Button
              variant="primary"
              size="md"
              type="submit"  
              onClick={() => console.log("Se oprimió el submit")}          
            >
              Guardar
            </Button> 
          </div> {/*Actions */}
        </div>
    )
}