import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { Input, Button, DeleteCounter2 } from "@/shared";

export default function AuthLayout() {
  return (
    <>
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <main className="mx-auto">
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
          <Input 
            label="Borrar Tipo de documento"
            type="text"
            placeholder="Escribe tu nombre" 
            htmlFor="name"             
          />      
          <Input 
            label="Documento"
            type="text"
            placeholder="Escribe tu número de documento" 
            htmlFor="user-document-number"             
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

          {/*Implementación del estado useState */}
          <div className="mt-10">
            <h1>ejemplo sin useState</h1>
            <DeleteCounter2 />
          </div>

          {/* <h1>Hola que tal</h1> */}
        <Outlet />
      </main>
      </div>
    </>
    
  );
}
