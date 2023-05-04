import Swal from "sweetalert2";
import { Swal_alert, Swal_Success } from "../../../helper/alertas";
import { clienteServices } from "../../../services/mantenimiento/clienteServices";
import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";
 
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    clientes : []
 }

const clientesSlice = createSlice({ 
    name : 'mant_cliente',
    initialState,
    reducers : {
        listMantClientes(state, action){
            return {
                ...state,
                clientes : action.payload
            }
        }
    }
})

  export const mostrarInformacionClientes =( Pub_Esta_Codigo )=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await clienteServices().getMostrarInformacion( Pub_Esta_Codigo );
          Swal.close();
          if (res.ok) {   
            const clientes = res.data.map((cliente)=>{
              return { ...cliente, id : cliente.id_Cliente  }
            })
            dispatch( listMantClientes( clientes));
            dispatch( refrescarDatoPrincipal(false));
          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const nuevoCliente =()=>{
    return  async(dispatch)=>{ 
      try { 
             dispatch(modalOpen());
             dispatch(modalTitle('NUEVO CLIENTE'));
             dispatch(flagEdicion(false));
             dispatch(objectoEdicion(null));
      } catch (error) {
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validacionesCliente = async({ nombre_Cliente, ruc_cliente, direccion_cliente }, esNuevo)=>{    
    if (ruc_cliente === null || ruc_cliente === '') {
        Swal_alert('error','Por favor ingrese el ruc del cliente');
        return false;
    }
    if (nombre_Cliente === null || nombre_Cliente === '') {
      Swal_alert('error','Por favor ingrese la descripcion del cliente');
      return false;
    }

    if ( esNuevo === true ) {
      const {data : res}  = await clienteServices().validarCliente(  nombre_Cliente, String(ruc_cliente).trim(), );
      if (res.ok) {
        if (res.data) {
          Swal_alert('error','El nombre del cliente y el Ruc ya esta registrado, verifique..');
          return false;
        }
      }
    }


    if (direccion_cliente === null || direccion_cliente === '') {
      Swal_alert('error','Por favor ingrese la direccion del cliente');
      return false;
    }
    return true;
  }

  export const saveCliente =(objMantenimiento, files)=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await clienteServices().saveCliente(objMantenimiento);
          Swal.close();
          if (res.ok) {
            Swal_Success('Se registró correctamente..');
            setTimeout(()=>{ //  
              dispatch( refrescarDatoPrincipal(true));
              if(files.length > 0){
                console.log('entro para almacenar la imagen')
                dispatch(subirImagenCliente(files, res.data , objMantenimiento.usuario_creacion ));
              }
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

  export const editarCliente =(objEdicion)=>{
    return  async(dispatch)=>{ 
      try { 

        dispatch(modalOpen());
        dispatch(modalTitle('EDITAR CLIENTE'));
        dispatch(flagEdicion(true));
        dispatch(objectoEdicion(objEdicion));  

      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 
  
  export const updateCliente =(objMantenimiento, files)=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await clienteServices().updateCliente( objMantenimiento.id_Cliente, objMantenimiento);
          Swal.close();
          if (res.ok) {
 
            Swal_Success('Se actualizó correctamente..');

            setTimeout(()=>{ //  
              dispatch(refrescarDatoPrincipal(true));
              if(files.length > 0){
                dispatch(subirImagenCliente(files,objMantenimiento.id_Cliente, objMantenimiento.usuario_creacion ));
              }
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

   const subirImagenCliente =( files, idCliente, idUsuario )=>{
    return  async(dispatch)=>{ 
  
      const cantFiles = files.length;
  
      // dispatch(spinnerOpen());
      const ejecutarEnvioArchivoServidor= async(index)=>{  
        if(index === cantFiles ){
          // dispatch(spinnerClose());   
          return true ;
        }
        try {
             const res = await clienteServices().upload_imagenCliente( files[index].file,  idCliente, idUsuario);
             if (res.ok) { 
              ejecutarEnvioArchivoServidor((index+1)); 
             }else{
               alert('Error en la carga de la imagen ' + files[index].name + ' '  + JSON.stringify(res.data)); 
               ejecutarEnvioArchivoServidor((index+1)); 
             } 
       } catch (error) {
          alert('Error en la carga de la imagen ' + files[index].name + ' '  + JSON.stringify(error)); 
          ejecutarEnvioArchivoServidor((index+1)); 
       } 
  
      }
      ejecutarEnvioArchivoServidor(0);
    }
  }
  





export const { listMantClientes } = clientesSlice.actions;

export default clientesSlice.reducer;