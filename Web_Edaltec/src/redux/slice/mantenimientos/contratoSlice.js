import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { contratosServices } from "../../../services/mantenimiento/contratosServices";
import { listClientes } from "../procesos/registroOTSlice";
 
import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";
import { registroOTServices } from "../../../services/procesos/registroOTServices";

 
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    contratosCab : [],
    proyectos : []
 }

const contratoSlice = createSlice({ 
    name : 'mant_contrato',
    initialState,
    reducers : {
        listMantContratos(state, action){
            return {
                ...state,
                contratosCab : action.payload
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


export const getCargarCombos = ()=>{
  return  async(dispatch)=>{ 
    try { 
        Swal.fire({
          icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
        })
        Swal.showLoading();      
        Promise.all([registroOTServices().getClientes() ])
          .then(([ _clientes ])  => {
          Swal.close();    
          if (_clientes.ok) {
             dispatch( listClientes(_clientes.data))
          }else{
            alert(JSON.stringify(_clientes.data));
          } 
 
        }).catch(reason => {
          Swal.close();
          alert(JSON.stringify(reason));
        });  

    } catch (error) {
      Swal.close();
      Swal_alert('error', JSON.stringify(error));
    } 
  }
} 


export const mostrarInformacion =( Pub_Esta_Codigo )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await contratosServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
            if (res.ok) {   
              const listMant = res.data.map((row)=>{
                return { ...row, id : row.id_Contrato  }
              })
              dispatch(listMantContratos( listMant));
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
          dispatch(modalTitle('NUEVO CONTRATO'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({  id_Cliente, numero_Contrato, observaciones_Contrato, fechaInicio, fechaFinal  }, esEdicion)=>{    

    if (id_Cliente === '0' || id_Cliente === 0 ) {
      Swal_alert('error','Por seleccione el Cliente');
      return false;
    }

    if (numero_Contrato === null || numero_Contrato === '') {
        Swal_alert('error','Por favor ingrese el numero de Contrato');
        return false;
    }else{

      if ( esEdicion === false ) {
        const {data : res}  = await contratosServices().getvalidarNroContrato( id_Cliente, String(numero_Contrato).trim());
        if (res.ok) {
          if (res.data) {
            Swal_alert('error','El nro de Contrato ya se registro..');
            return false;
          }
        }
      }
    }

    if (observaciones_Contrato === null || observaciones_Contrato === '') {
      Swal_alert('error','Por favor ingrese la descripcion del Contrato');
      return false;
    }
    if (fechaInicio === '' || fechaInicio === null ) {
      Swal_alert('error','Por seleccione la fecha Inicial');
      return false;
    }
    if (fechaFinal === '' || fechaFinal === null ) {
      Swal_alert('error','Por seleccione la fecha Final');
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
          const {data : res}  = await contratosServices().save(objMantenimiento);
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
        dispatch(modalTitle('EDITAR CONTRATO'));
        dispatch(flagEdicion(true));
        dispatch(objectoEdicion({...objEdicion, fechaInicio : new Date(objEdicion.fechaInicio),  fechaFinal : new Date(objEdicion.fechaFinal)  }));  

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
          const {data : res}  = await contratosServices().update( objMantenimiento.id_Contrato, objMantenimiento);
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

 


export const { listMantContratos, listProyectos } = contratoSlice.actions;

export default contratoSlice.reducer;