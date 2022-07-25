

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const contratosServices = ()=>{

    const getMostrarInformacion = (Pub_Esta_Codigo)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : Pub_Esta_Codigo  
        }
        return axios.get(URL + 'tbl_w_Contrato', {params: parametros});
    } 

    const save = (objMantenimiento)=>{
        return axios.post(URL + 'tbl_w_Contrato/PostContratos' , objMantenimiento );         
    }

    const update = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tbl_w_Contrato/PutContratos?id=' + id ,  objMantenimiento );   
    }

    const getvalidarNroContrato= (idCliente, numeroContrato)=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : idCliente  + '|' + numeroContrato 
        }
        return axios.get(URL + 'tbl_w_Contrato', {params: parametros});
    }

    return {
        getMostrarInformacion,
        save,
        update, 
        getvalidarNroContrato
    }

}