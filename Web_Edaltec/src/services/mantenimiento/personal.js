
import axios from 'axios';
export const personalServices = ()=>{
    const getEmpresa= ()=>{   
        const parametros = {
            'opcion' : 2, 'filtro' : ''
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal', {params: parametros} );
    }

    const getTiposDocumentos = ()=>{   
        const parametros = {
            'opcion' : 6, 'filtro' : '1'
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal', {params: parametros} );
    }

    const getDistritos = ()=>{   
        const parametros = {
            'opcion' : 9, 'filtro' : ''
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal', {params: parametros} );
    }

    const getCargos = ()=>{   
        const parametros = {
            'opcion' : 7, 'filtro' : ''
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal', {params: parametros} );
    }


    const getMostrarInformacion = (empresa, estado)=>{  
        const parametros = {
            'opcion' : 3, 'filtro' : empresa + '|'+ estado
        }
        return axios.get('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal', {params: parametros} );
    }

    const savePersonales = (objMantenimiento)=>{
        return axios.post('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal' , objMantenimiento );        
    }

    const updatePersonales = (id, objMantenimiento)=>{
        return axios.put('http://www.jualgaseguriti.com/WebApi_dsigeResguardo/api/tblPersonal/' + id , objMantenimiento );     
    }

    return {
        getEmpresa,
        getTiposDocumentos,
        getDistritos,
        getCargos,
        getMostrarInformacion,
        savePersonales,
        updatePersonales
    }

}