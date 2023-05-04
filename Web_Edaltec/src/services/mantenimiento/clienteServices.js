

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const clienteServices = ()=>{

    const getMostrarInformacion = (Pub_Esta_Codigo)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : Pub_Esta_Codigo  
        }
        return axios.get(URL + 'tblw_Cliente', {params: parametros});
    }

    const saveCliente = (objMantenimiento)=>{
        return axios.post(URL + 'tblw_Cliente/PostCliente' , objMantenimiento );         
    }

    const updateCliente = (id, objMantenimiento)=>{  
        return axios.put(URL + 'tblw_Cliente/PutCliente?id=' + id ,  objMantenimiento );   
    }

    const upload_imagenCliente = async(file, idCliente, idUsuario)=>{        
        var bodyFormData = new FormData();
            bodyFormData.append('file', file);
        const filtro = String(idCliente) + '|' +  idUsuario;

        const { data } = await axios.post(URL + 'Uploads/post_imagenCliente?filtros=' + filtro, bodyFormData)       
        return data;
   }

    const validarCliente= (cliente, nroRuc )=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : String(cliente) + '|' +  nroRuc
        }
        return axios.get(URL + 'tblw_Cliente', {params: parametros});
    }
 
    return {
        getMostrarInformacion,
        saveCliente,
        updateCliente,
        upload_imagenCliente,
        validarCliente
    }

}