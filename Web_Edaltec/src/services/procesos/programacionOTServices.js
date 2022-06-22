

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const programacionOTServices = ()=>{

    const getMostrarInformacion =async ( cliente,fechaInicial, fechaFinal,estado )=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : cliente + '|' +  fechaInicial + '|' + fechaFinal + '|' +  estado   
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    } 
    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_OrdenTrabajo_Programacion/PostProgramacionOT' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_OrdenTrabajo_Programacion/PutProgramacionOT?id=' + id ,  objMantenimiento );   
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
    
    const listadoProgramacionOT_Cliente =async ( id_Cliente )=>{   
        const parametros = {
            'opcion' : 5, 'filtro' : id_Cliente
        }
        const { data } = await axios.get(URL + 'tbl_w_OrdenTrabajo_Programacion', {params: parametros});
        return data
    } 

 

    return {
        getMostrarInformacion,
        save,
        update,  
        anular,
        validarVehiculo,
        validarProgramacionOT,
        listadoProgramacionOT_Cliente
    }

}