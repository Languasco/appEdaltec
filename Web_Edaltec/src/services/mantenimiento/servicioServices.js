

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const servicioServices = ()=>{

    const getMostrarInformacion = (Pub_Esta_Codigo)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : Pub_Esta_Codigo  
        }
        return axios.get(URL + 'tbl_w_Servicio', {params: parametros});
    }  

    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_Servicio/PostServicios' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_Servicio/PutServicios?id=' + id ,  objMantenimiento );   
    }

    const getvalidarServicio= (descripcionServicio)=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : descripcionServicio 
        }
        return axios.get(URL + 'tbl_w_Servicio', {params: parametros});
    }

    return {
        getMostrarInformacion,
        save,
        update, 
        getvalidarServicio
    }

}