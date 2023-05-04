import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const registroOTServices = ()=>{

    const getClientes = async()=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const getTiposTrabajo = async()=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros}); 
        return data
    }

    const getInspeccionados = async()=>{   
        const parametros = {
            'opcion' : 4, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const getMostrarInformacion = async(idCliente, nroOT, tipoTrabajo, inspeccionado, fechaelectrica, fechaEjecucion)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : idCliente + '|' + nroOT + '|' + tipoTrabajo + '|' + inspeccionado + '|' + fechaelectrica + '|' + fechaEjecucion
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const getAreas = async()=>{   
        const parametros = {
            'opcion' : 5, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }
    const getDistrito = async()=>{   
        const parametros = {
            'opcion' : 6, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }
    const getSupervisores = async()=>{   
        const parametros = {
            'opcion' : 7, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const getTiposReparacion = async()=>{   
        const parametros = {
            'opcion' : 8, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }
    
    const getEstados = async()=>{   
        const parametros = {
            'opcion' : 9, 'filtro' : ''
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_editCargaInicial = async(idOT)=>{   
        const parametros = {
            'opcion' : 10, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const save_cargaInicialTab_1 = (objMantenimiento)=>{
        return axios.post(URL + 'Registro_OT/tbl_w_OrdenTrabajo_CAB' , objMantenimiento );        
    }

    const update_cargaInicialTab_1 = async (id, objMantenimiento)=>{
       return axios.put(URL + 'Registro_OT/Puttbl_w_OrdenTrabajo_CAB?id=' + id ,  objMantenimiento );          
    }

    const get_mostrarOcurrencias = async(idOT)=>{   
        const parametros = {
            'opcion' : 11, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const set_guardarOcurrencia = async(idOt, idOcurrencia, ocurrencia, id_usuario)=>{   
        const parametros = {
            'opcion' : 12, 'filtro' : idOt + '|' + idOcurrencia + '|' + ocurrencia + '|' + id_usuario
        } 
        return await axios.get(URL + 'Registro_OT', {params: parametros});
    }


    const get_mostrarTiposReparacionMontos = async(idOT)=>{   
        const parametros = {
            'opcion' : 13, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }


    const get_mostrarTiposReparacionMultipleOT = async(idOT)=>{   
        const parametros = {
            'opcion' : 14, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const save_update_tiposReparacionMultiple = async(idOT, listTiposReparacionOT)=>{   
        const parametros = {
            'opcion' : 15, 'filtro' : idOT + '|' + listTiposReparacionOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_descargarOcurrencias = async(idOT)=>{   
        const parametros = {
            'opcion' : 16, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const upload_fileEvidencias = async(file, idOT, idUsuario, tipoCarga)=>{         

         var bodyFormData = new FormData();
             bodyFormData.append('file', file);
         const filtro = String(idOT) + '|' +  idUsuario + '|' +  tipoCarga ;

         console.log(filtro)

         const { data } = await axios.post(URL + 'Uploads/post_archivosEvidencias?filtros=' + filtro, bodyFormData)       
         return data;
    }

    const get_mostrarArchivosCargadosEvidencias = async(idOT)=>{   
        const parametros = {
            'opcion' : 17, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const set_anularArchivosCargadoEvidencia = async(id_OrdenTrabajo_Archivos, id_usuario)=>{   
        const parametros = {
            'opcion' : 18, 'filtro' : id_OrdenTrabajo_Archivos + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const set_guardarActualizarMetrados = async(idOt, {id_OrdenTrabajo_Metrado, idTipoReparacion, largo,  ancho, espesor } , id_usuario)=>{   
        const parametros = {
            'opcion' : 19, 'filtro' : idOt + '|' + id_OrdenTrabajo_Metrado + '|' + idTipoReparacion + '|' + largo + '|' + ancho + '|' + espesor + '|' + id_usuario
        } 
        return await axios.get(URL + 'Registro_OT', {params: parametros});
    }
    
    const get_mostrarMetrados = async(idOT)=>{   
        const parametros = {
            'opcion' : 20, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }
    const set_anularMetrados = async(id_OrdenTrabajo_Metrado, id_usuario)=>{   
        const parametros = {
            'opcion' : 21, 'filtro' : id_OrdenTrabajo_Metrado + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }
    
    const upload_fileFotosTab4 = async(file, idOT, idUsuario)=>{         

        var bodyFormData = new FormData();
            bodyFormData.append('file', file);
        const filtro = String(idOT) + '|' +  idUsuario;

        const { data } = await axios.post(URL + 'Uploads/post_FotosTab4?filtros=' + filtro, bodyFormData)       
        return data;
   }

   const get_mostrarFotosTab4 = async(idOT)=>{   
    const parametros = {
        'opcion' : 22, 'filtro' : idOT
    }
    const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
    return data
   }

   const set_anularFotoTab4 = async(id_OrdenTrabajo_Foto, id_usuario)=>{   
        const parametros = {
            'opcion' : 23, 'filtro' : id_OrdenTrabajo_Foto + '|' +  id_usuario 
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_descargarTodasFotosTab4 = async(idOT, idUsuario)=>{   
        const parametros = {
            'opcion' : 24, 'filtro' : String(idOT) + '|' +  idUsuario
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_mostrarPdf_Ot = async(idOT)=>{   
        const parametros = {
            'opcion' : 25, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_mostrarReporte_ot= async(idOT)=>{   
        const parametros = {
            'opcion' : 26, 'filtro' : idOT
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    const get_descargarRegistroOTs = async(cliente, nroOt , tipoTrabajo, inspeccionado, fechaElect, fechaEjecuc)=>{   
        const parametros = {
            'opcion' : 27, 'filtro' : cliente + '|' + nroOt  + '|' + tipoTrabajo  + '|' + inspeccionado  + '|' + fechaElect + '|' + fechaEjecuc
        }
        const { data } = await axios.get(URL + 'Registro_OT', {params: parametros});
        return data
    }

    return {
        getClientes,
        getTiposTrabajo,
        getInspeccionados,
        getMostrarInformacion,
        getAreas,
        getDistrito,
        getSupervisores,
        getTiposReparacion,
        getEstados,
        save_cargaInicialTab_1,
        get_editCargaInicial,
        update_cargaInicialTab_1,
        get_mostrarOcurrencias,
        set_guardarOcurrencia,
        get_mostrarTiposReparacionMontos,
        get_mostrarTiposReparacionMultipleOT,
        save_update_tiposReparacionMultiple,
        get_descargarOcurrencias,
        upload_fileEvidencias,
        get_mostrarArchivosCargadosEvidencias,
        set_anularArchivosCargadoEvidencia,
        set_guardarActualizarMetrados,
        get_mostrarMetrados,
        set_anularMetrados,
        upload_fileFotosTab4,
        get_mostrarFotosTab4,
        set_anularFotoTab4,
        get_descargarTodasFotosTab4,
        get_mostrarPdf_Ot,
        get_mostrarReporte_ot,
        get_descargarRegistroOTs
    }

}