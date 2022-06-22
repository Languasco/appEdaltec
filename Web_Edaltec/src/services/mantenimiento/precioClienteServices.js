

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const precioClienteServices = ()=>{

    const getMostrarInformacion = (cliente, contrato, tipoReparacion, nroOT , estado)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : cliente + '|'+ contrato + '|'+  tipoReparacion + '|'+  nroOT + '|'+  estado  
        }
        return axios.get(URL + 'tbl_w_Cliente_TipoReparacion', {params: parametros});
    } 
    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_Cliente_TipoReparacion/PostPrecioCliente' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_Cliente_TipoReparacion/PutPrecioCliente?id=' + id ,  objMantenimiento );   
    }

    const anular = async(id_ClienteTipoReparacion, id_usuario)=>{   
        const parametros = {
            'opcion' : 4, 'filtro' : id_ClienteTipoReparacion + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'tbl_w_Cliente_TipoReparacion', {params: parametros});
        return data
    }


    const getvalidarPrecioReparacionCliente = (id_Cliente ,id_Contrato, id_TipoReparacion)=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : id_Cliente + '|'+ id_Contrato + '|'+  id_TipoReparacion  
        }
        return axios.get(URL + 'tbl_w_Cliente_TipoReparacion', {params: parametros});
    }

    const getContratoPorCliente =async(idCliente)=>{   
       
        const parametros = {
            'opcion' : 2, 'filtro' : idCliente 
        }
        const { data } = await axios.get(URL + 'tbl_w_Cliente_TipoReparacion', {params: parametros});
        return data;
    }    

    return {
        getMostrarInformacion,
        save,
        update, 
        getvalidarPrecioReparacionCliente,
        getContratoPorCliente,
        anular
    }

}