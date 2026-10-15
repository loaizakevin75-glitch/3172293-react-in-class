//fuente de datos de usuarios (mock o fuente centralizada)
import {users} from "../../data/users";

// Utilidad para trnasformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";

//servicios de exportacion
import { generatedExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

//caso de uso: orquestador de generacion de reportes de usuarios
//Patron: Application service (coordina utilidades y servicios)
export function generateUserReport ({
    format,         //"Excel" | "pdf"
    selectedFields, //Campos seleccionados por el usuario
    scope,          //Alcance del reporte 
    documentNumber  //Filtro opcional
}) {

    //Construccion del dataset (desacoplado de la ui)
    const { headers, rows} = buildReportDataset({
      users,
      selectedFields,
      scope,
      documentNumber  
    });

    //Validacion: evita generar archivos vacios
    if (!rows.length) {
        alert("No hay datos para generar el reporte.");
        return; //Corte de ejecucion
    }

    //Generacion de timestamp para nombres unicos de archivo (YYYY-MM-DD)
        //toISOString(): convierte una fecha a formato estándar UTC
    const timestamp = new Date().toISOString().slice(0, 10);

    //Seleccion de estrategia de exportacion segun formato
    if (format === "excel") {
        generatedExcelReport({
            headers,
            rows,
            fileName: `users-report-${timestamp}.xlsx`
        });
    }
    if (format === "pdf") {
        generatePdfReport({
            headers,
            rows,
            fileName: `users-report-${timestamp}.pdf`
        });
    }
}