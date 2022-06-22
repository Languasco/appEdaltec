

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const tipoObraServices = ()=>{

    const getMostrarInformacion = (Pub_Esta_Codigo)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : Pub_Esta_Codigo  
        }
        return axios.get(URL + 'tbl_w_TiposObras', {params: parametros});
    } 

    const getProyectos = ()=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : ''  
        }
        return axios.get(URL + 'tbl_w_TiposObras', {params: parametros});
    }

    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_TiposObras/PostTiposObras' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_TiposObras/PutTipoObra?id=' + id ,  objMantenimiento );   
    }

    const getvalidarTipoTrabajo = (descripcion_TipoTrabajo)=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : descripcion_TipoTrabajo 
        }
        return axios.get(URL + 'tbl_w_TiposObras', {params: parametros});
    }

    return {
        getMostrarInformacion,
        save,
        update, 
        getProyectos,
        getvalidarTipoTrabajo
    }

}