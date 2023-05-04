

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const marcaServices = ()=>{

    const getMostrarInformacion = (Pub_Esta_Codigo)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : Pub_Esta_Codigo  
        }
        return axios.get(URL + 'tblw_Marca_Vehiculo', {params: parametros});
    }  

    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tblw_Marca_Vehiculo/PostMarcaVehiculo' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tblw_Marca_Vehiculo/PutMarcaVehiculo?id=' + id ,  objMantenimiento );   
    }

    const getvalidarMarca = (nombreMarca)=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : nombreMarca 
        }
        return axios.get(URL + 'tblw_Marca_Vehiculo', {params: parametros});
    }

    return {
        getMostrarInformacion,
        save,
        update, 
        getvalidarMarca
    }

}