
import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { marcaServices } from "../../../services/mantenimiento/marcaServices";


import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    marcasVehiculosCab : [],
 }

const marcaSlice = createSlice({ 
    name : 'mant_marcaVehiculo',
    initialState,
    reducers : {
      listMantMarcaVehiculosCab(state, action){
            return {
                ...state,
                marcasVehiculosCab : action.payload
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
          const {data : res}  = await marcaServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
            if (res.ok) {   
              const listMant = res.data.map((row)=>{
                return { ...row, id : row.id_Marca  }
              })
              dispatch(listMantMarcaVehiculosCab( listMant));
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

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVA MARCA '));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ nombre_Marca }, esEdicion)=>{   
    if (nombre_Marca === null || nombre_Marca === '') {
        Swal_alert('error','Por favor ingrese la descripcion de la marca');
        return false;
    }else{
      if ( esEdicion === false ) {
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Validando, Espere por favor'
        })
        Swal.showLoading();
        const {data : res}  = await marcaServices().getvalidarMarca(String(nombre_Marca).trim());
        Swal.close();
        if (res.ok) {
          if (res.data) {
            Swal_alert('error','La marca del vehiculo ya se registro..');
            return false;
          }
        }
      }
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
          const {data : res}  = await marcaServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_alert('success','Se registro correctamente..');
            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },500); 

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
        dispatch(modalTitle('EDITAR MARCA '));
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
          const {data : res}  = await marcaServices().update( objMantenimiento.id_Marca, objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_alert('success','Se Actualizo correctamente..');

            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              dispatch(modalClose());
           },500); 

          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }



export const { listMantMarcaVehiculosCab } = marcaSlice.actions;

export default marcaSlice.reducer;