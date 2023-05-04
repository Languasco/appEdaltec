

import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const asistenciaServices = ()=>{

    const getMostrarReporteCab = (fechaInicial, fechaFinal, tipoReporte)=>{   
        const parametros = {
            'opcion' : 1, 'filtro' : fechaInicial + '|' + fechaFinal  + '|' + tipoReporte  
        }
        return axios.get(URL + 'ReporteAsistencia', {params: parametros});
    }  
 
    const get_descargarReporteAsistenciaExcel = async(fechaInicial, fechaFinal, tipoReporte)=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : fechaInicial + '|' + fechaFinal  + '|' + tipoReporte  
        }
        const { data } = await axios.get(URL + 'ReporteAsistencia', {params: parametros});
        return data
    } 
    return {
        getMostrarReporteCab,
        get_descargarReporteAsistenciaExcel
    }

}