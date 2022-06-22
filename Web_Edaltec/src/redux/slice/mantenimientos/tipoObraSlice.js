
import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";

import { tipoObraServices } from "../../../services/mantenimiento/tipoObraServices"; 
import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

 
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tiposObras : [],
    proyectos : []
 }

const tipoObraSlice = createSlice({ 
    name : 'mant_tipoObra',
    initialState,
    reducers : {
        listMantTiposObras(state, action){
            return {
                ...state,
                tiposObras : action.payload
            } 
        },
        listProyectos(state, action){
            return {
                ...state,
                proyectos : action.payload
            }   
        },
    }
})


export const mostrarInformacion =( Pub_Esta_Codigo )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await tipoObraServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
            if (res.ok) {   
              const listMant = res.data.map((row)=>{
                return { ...row, id : row.id_TipoTrabajo  }
              })
              dispatch(listMantTiposObras( listMant));
              dispatch(refrescarDatoPrincipal(false));
            }else{
              alert(JSON.stringify(res.data));
            } 
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }

  export const proyectos =()=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await tipoObraServices().getProyectos();
          Swal.close();
            if (res.ok) {   
              dispatch(listProyectos(res.data)); 
            }else{
              alert(JSON.stringify(res.data));
            } 
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVO TIPO DE OBRA'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ descripcion_TipoTrabajo, abreviatura_TipoTrabajo }, esEdicion)=>{    

    if (descripcion_TipoTrabajo === null || descripcion_TipoTrabajo === '') {
        Swal_alert('error','Por favor ingrese la descripcion');
        return false;
    }else{

      if ( esEdicion === false ) {
        const {data : res}  = await tipoObraServices().getvalidarTipoTrabajo(String(descripcion_TipoTrabajo).trim());
        if (res.ok) {
          if (res.data) {
            Swal_alert('error','el tipo de trabajo ya se registro..');
            return false;
          }
        }
      }

    }

    if (abreviatura_TipoTrabajo === null || abreviatura_TipoTrabajo === '') {
      Swal_alert('error','Por favor ingrese la abreviatura');
      return false;
    }



    return true;
  }

  export const save =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await tipoObraServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se registro correctamente..');
            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },200); 

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const editar =(objEdicion)=>{
    return  async(dispatch)=>{ 
      try { 

        dispatch(modalOpen());
        dispatch(modalTitle('EDITAR TIPO DE OBRA'));
        dispatch(flagEdicion(true));
        dispatch(objectoEdicion(objEdicion));  

      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
  
  export const update =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await tipoObraServices().update( objMantenimiento.id_TipoTrabajo, objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se Actualizo correctamente..');

            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },200); 

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

 


export const { listMantTiposObras, listProyectos } = tipoObraSlice.actions;

export default tipoObraSlice.reducer;