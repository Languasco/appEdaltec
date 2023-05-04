

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const vehiculoServices = ()=>{

    const getMostrarInformacion =async (estado)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : estado  
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    } 
    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_Vehiculo/PostVehiculo' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_Vehiculo/PutVehiculo?id=' + id ,  objMantenimiento );   
    }

    const anular = async(id_Vehiculo, id_usuario)=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : id_Vehiculo + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }


    const tipoVehiculo = async()=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }
    const marcaVehiculo = async()=>{   
        const parametros = {
            'opcion' : 4, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }
    const categoriaVehiculo = async(id_TipoVehiculo)=>{   
        const parametros = {
            'opcion' : 5, 'filtro' : id_TipoVehiculo  
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }
    const carroceriaVehiculo = async(id_Categoria)=>{   
        const parametros = {
            'opcion' : 6, 'filtro' : id_Categoria  
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }

    const validarVehiculo = (nroPlaca_Vehiculo)=>{   
        const parametros = {
            'opcion' : 7, 'filtro' : nroPlaca_Vehiculo
        }
        return axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
    } 
    const dniConductores = async()=>{   
        const parametros = {
            'opcion' : 8, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'tbl_w_Vehiculo', {params: parametros});
        return data
    }

    return {
        getMostrarInformacion,
        save,
        update,  
        anular,
        tipoVehiculo,
        marcaVehiculo,
        categoriaVehiculo,
        carroceriaVehiculo,
        validarVehiculo,
        dniConductores

    }

}