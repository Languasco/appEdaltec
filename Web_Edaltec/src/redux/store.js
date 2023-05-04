import {configureStore} from "@reduxjs/toolkit";
import executeActionSlice from "./slice/executeActionSlice";
import flagEdicionSlice from "./slice/flagEdicionSlice";
import clientesSlice from "./slice/mantenimientos/clientesSlice";
import contratoSlice from "./slice/mantenimientos/contratoSlice";
import marcaSlice from "./slice/mantenimientos/marcaSlice";
import precioClienteSlice from "./slice/mantenimientos/precioClienteSlice";
import serviciosSlice from "./slice/mantenimientos/serviciosSlice";
import tipoObraSlice from "./slice/mantenimientos/tipoObraSlice";
import tipoReparacionSlice from "./slice/mantenimientos/tipoReparacionSlice";
import vehiculoSlice from "./slice/mantenimientos/vehiculoSlice";
import modalSlice from "./slice/modalSlice";
import objectoEdicionSlice from "./slice/objectoEdicionSlice"; 
import programacionOTSlice from "./slice/procesos/programacionOTSlice";
import registroOTSlice from "./slice/procesos/registroOTSlice";
import refrescarDataSlice from "./slice/refrescarDataSlice";
import asistenciaSlice from "./slice/reportes/asistenciaSlice";
import loginSlice from "./slice/seguridad/loginSlice";
import spinnerSlice from "./slice/spinnerSlice";
 
const store  = configureStore({
    reducer : {
        mant_cliente : clientesSlice,
        modal : modalSlice,
        flagEdicion : flagEdicionSlice,
        objetoEdicion : objectoEdicionSlice,
        refrescarDatos : refrescarDataSlice,
        spinner : spinnerSlice,
        login : loginSlice,
        mant_tipoObra : tipoObraSlice ,
        mant_servicio : serviciosSlice ,
        mant_tipoReparacion : tipoReparacionSlice,
        mant_precioCliente: precioClienteSlice,

        proceso_registroOT : registroOTSlice,
        mant_vehiculo :  vehiculoSlice,
        proceso_programacionOT : programacionOTSlice,
        ejecutarAcciones : executeActionSlice,
        mant_contrato : contratoSlice ,
        mant_marcaVehiculo : marcaSlice,
        reporte_asistencia : asistenciaSlice

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store


 