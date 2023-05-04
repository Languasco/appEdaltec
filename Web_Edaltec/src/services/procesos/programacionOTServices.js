

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const programacionOTServices = ()=>{

    const getMostrarInformacion =async ( cliente,fechaInicial, fechaFinal,TipoProceso )=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : cliente + '|' +  fechaInicial + '|' + fechaFinal + '|' +  TipoProceso   
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    }  

    const anular = async(id_Vehiculo, id_usuario)=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : id_Vehiculo + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    }


    const validarVehiculo = async(nroPlaca_Vehiculo)=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : nroPlaca_Vehiculo
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    }  
    const validarProgramacionOT = async(id_Cliente, fechaProgramacion, ges_Empl_DNI_JefeCuadrilla)=>{   
        const parametros = {
            'opcion' : 4, 'filtro' :  id_Cliente + '|' +  fechaProgramacion   + '|' +  ges_Empl_DNI_JefeCuadrilla   
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    } 
    
 
    const save_new = async (objMantenimiento, idProgramacionMasivo )=>{

         const parametros = {
            'opcion' : 6, 'filtro' : objMantenimiento.id_Cliente + '|' + objMantenimiento.fechaProgramacion + '|' +  objMantenimiento.ges_Empl_DNI_JefeCuadrilla   + '|' +  objMantenimiento.id_Vehiculo + '|' +  idProgramacionMasivo  + '|' + objMantenimiento.usuario_creacion
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
        
    }
    const programacionTrabajoEdicion =async ( id_OrdenTrabajo )=>{   
        const parametros = {
            'opcion' : 7 , 'filtro' : id_OrdenTrabajo
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    } 

    return {
        getMostrarInformacion,
        anular,
        validarVehiculo,
        validarProgramacionOT, 
        save_new,
        programacionTrabajoEdicion
    }

}