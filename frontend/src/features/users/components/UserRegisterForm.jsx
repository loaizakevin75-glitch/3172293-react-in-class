//UserRegisterForm componente para registrar un usuario

import {useState, useEffect} from "react"
import {
    Input, 
    Select, 
    Checkbox, 
    Button, 
    IconButton, 
    // Dropdown,
    // DropdownTrigger,
    // DropdownItem,
    // DropdownContent,
    FileInput
    } from "@/shared";
import { getDocumentTypes} from "@/services/selectService";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../schemas/userSchemas";
import { User } from "lucide-react";
import { showSuccessAlert } from "../../../shared/services/alertService";
import { createUser } from "../services/userServices";

export default function UserRegisterForm (){

    //Estado
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Navegación
    const Navigate = useNavigate();

    //Estado del error
    const [errors, setErrors] = useState({})

        //Estado del formulario
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentTypes: "",
        userDocumentNumber: "",
        userPassword: "",
        userImage: [],

        //flags booleans
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });



    //===========================================
    //        Handle Genérico
    //===========================================
    /*
    Función que se ejecuta cada vez que cambia el valor de un input del formulario
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
 
      // ==========Handle Submit====================

      const handleSubmit = async (e) => {
        //Evita que el formulario recargue la página
        e.preventDefault();

        //Validación que los datos se alamcenan correctamente en formData
    //     console.log("FORM DATA:", formData);
    //     console.log("BOOLEANS:", {
    //     isStaff: formData.isStaff,
    //     isActive: formData.isActive,
    //     isSuperUser: formData.isSuperUser,
    // });

        // Validamos los dato del formulario contra el esquema zod
        //safeParse No lanza excepcion, retorna un objeto controlado
        const result = userSchema.safeParse(formData);

        //Verificar en consola si el esquema esta funcionando correctamente
        console.log(result);

        // Si la validacion falla
        if (!result.success) {
            // Objeto donde almacenamos los errores por campo
            const fieldErrors = {};

            //Recorremos cada error generado por zod 
            result.error.issues.forEach((issue) => {
                //issues.path[0] corresponde al nombre del campo
                //issues.message contiene el mensaje de error definido en el schema
                fieldErrors[issue.path[0]] = issue.message;

            });
            // Actualizamos el estado de errores para mostrarlos en la UI
            setErrors(fieldErrors);

            //Cortamos la ejecucion: No se envia nada al backend
            
            return;
            
        }
        //Si la validacion pasa, limpiamos errores previos
        setErrors({});

        //Activamos estado de envio (util para deshabilitar el boton )
        setIsSubmitting(true);

        try{
            //LLamamos al servicio frontend que consume la API
            //result.data contiene los datos ya validados por zod
            const response = await createUser(result.data);

            // Log informativo para desarrollo
            console.log("Usuario creado:", response);

            //Feddback básico  al usuario
            await showSuccessAlert({
                title: "Usuario creado",
                text: "El usuario fue creado correctamente",
                timer: 3000,
            });

            //Navegamos a la vista anterior
            //navigate(-1) equivale a "volver atras"
            Navigate(-1);
        } catch (error) {
            //Capturamos errores de red oerrores lanzados por el servicio
            console.error("error:", error.message);

            //Mostramos el mensaje de error al usuario
            alert(error.message);
        } finally {
            // Pase lo que pase, desactivamos el estado de envio
            // setIsSubmitting(false);
        }  
    };

    //===========================================
    //        Handle namechange
    //===========================================

    //   const handleNameChange = (e) => {
    //     const value = e.target.value.trim();

    //     if (value === "") {
    //         console.log("El nombre no puede estar vacio")
    //     }
    //   };

      

      //Estado para los tipos de documentos
      const [documentTypes, setDocumentTypes] = useState([])
    
      //Uso del estado useEffect
      useEffect(() => {
        getDocumentTypes().then(setDocumentTypes);
      },[])

   
    return (
        <div className="grid items-center justify-center">
            <h1 className="mx-auto my-12 text-title font-bold">registro de usuarios</h1>
            {/* // formulario */}
            <form 
                action=""
                onSubmit={handleSubmit}
            >
                <Input 
                    label="Nombre"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    placeholder="Escribe tu nombre" 
                    htmlFor="user-name" 
                    onChange={handleChange} 
                    error={errors.userName}  
                />      
                <Input 
                    label="Correo"
                    name="userEmail"
                    type="email"
                    value={formData.userEmail}
                    placeholder="Escribe tu correo" 
                    htmlFor="user-email" 
                    onChange={handleChange}
                    error={errors.userEmail}           
                />      
                <Input 
                    label="Teléfono"
                    name="userPhone"
                    type="tel"
                    value={formData.userPhone}
                    placeholder="Escribe tu número de teléfono" 
                    htmlFor="user-phone"  
                    onChange={handleChange}
                    error={errors.userPhone}           
                />  
                <Select 
                    label="Tipos de documento"
                    name="userDocumentTypes"
                    value={formData.userDocumentTypes}
                    htmlFor="userDocumentTypes"
                    options={documentTypes}
                    onChange={handleChange}
                    error={errors.userDocumentTypes}
                />    
                <Input 
                    label="Documento"
                    name="userDocumentNumber"
                    type="text"
                    value={formData.userDocumentNumber}
                    placeholder="Escribe tu número de documento" 
                    htmlFor="user-document-number" 
                    onChange={handleChange}
                    error={errors.userDocumentNumber}            
                />
                <Input 
                    label="Contraseña"
                    name="userPassword"
                    type="password"
                    value={formData.userPassword}
                    placeholder="Escribe tu contraseña" 
                    htmlFor="user-password" 
                    onChange={handleChange}
                    error={errors.userPassword}            
                />

                <div className="grid gap-4 my-8 ">
                    {/*Checkbox */}
                    <Checkbox
                        id="isSuperUser"
                        name="isSuperUser"
                        label="Es super usuario"
                        checked={formData.isSuperUser}
                        onChange={handleChange}
                    />
                    <Checkbox
                        id="isStaff"
                        name="isStaff"
                        label="Es staff"
                        checked={formData.isStaff}
                        onChange={handleChange}
                    />
                    <Checkbox
                        id="isActive"
                        name="isActive"
                        label="Está activo"
                        checked={formData.isActive}
                        onChange={handleChange}
                    />
                </div>

    <FileInput
        value={formData.userImage}
        onChange={(files) =>
            setFormData((prev) => ({...prev, userImage: files}))
        }
        multiple={true}
    />
    {errors.userImage && (
        <span className="text-red-500 text-sm"> {errors.userImage}</span>
    )}

                

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
                        {/* <Button
                            variant="primary"
                            size="md"
                            type="submit"  
                            onClick={() => console.log("Se oprimió el submit")}          
                        >
                        Guardar
                    </Button>  */}
                        <Button
                            variant="primary"
                            size="md"
                            type="submit"
                            disabled={isSubmitting}          
                        >
                        {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button> 

                </div> {/*Actions */}

                {/* Icons */}
                    <IconButton
                        variant="primary"
                        onClick={() => Navigate(-1)}
                    >

                        <User/>
                    </IconButton>

            </form>
        
        </div>
    )
}

