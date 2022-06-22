import axios from 'axios';
export const solicitudResguardoServices = ()=>{

    const getServicios= (id_usuario)=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : id_usuario
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblSolicitud_Cab', {params: parametros} );
    }

    const getSolicitante= ()=>{   
        const parametros = {
            'opcion' : 3, 'filtro' : ''
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblSolicitud_Cab', {params: parametros} );
    }

    const getEstados= ()=>{   
        const parametros = {
            'opcion' : 4, 'filtro' : ''
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblSolicitud_Cab', {params: parametros} );
    }
 
    return {
        getServicios,
        getSolicitante,
        getEstados
    }

}