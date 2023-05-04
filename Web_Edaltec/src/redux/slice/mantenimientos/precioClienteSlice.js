import Swal from "sweetalert2";
import { Swal_alert } from "../../../helper/alertas";
import { precioClienteServices } from "../../../services/mantenimiento/precioClienteServices";
import { registroOTServices } from "../../../services/procesos/registroOTServices";
import { flagEdicion } from "../flagEdicionSlice";
import { modalClose, modalOpen, modalTitle } from "../modalSlice";
import { objectoEdicion } from "../objectoEdicionSlice";
import { getTiposReparacion, listClientes } from "../procesos/registroOTSlice";
import { refrescarDatoPrincipal } from "../refrescarDataSlice";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    preciosClientes : [],
    contratosClienteFiltro : [],
    contratosCliente : []
 }

const precioClienteSlice = createSlice({ 
    name : 'mant_precioCliente',
    initialState,
    reducers : {
        listMantPreciosClienteCab(state, action){
            return {
                ...state,
                preciosClientes : action.payload
            }
        },
        listContratosClienteFiltro(state, action){
            return {
                ...state,
                contratosClienteFiltro : action.payload
            } 
        },
        listContratosCliente(state, action){
          return {
              ...state,
              contratosCliente : action.payload
          } 
        },
        refrescandoEstadoPrecioCliente(state, action){
            return {
                ...state,
                preciosClientes :  state.preciosClientes.map(precioCli =>{
                    return {...precioCli, id_Estado : (precioCli.id_ClienteTipoReparacion === action.payload )? '002': precioCli.id_Estado  }             
                })  
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
          Promise.all([registroOTServices().getClientes(), registroOTServices().getTiposReparacion()])
            .then(([ _clientes, _tipoReparaciones ])  => {
            Swal.close();    
            if (_clientes.ok) {

               let clientePrecio = [{id:0 , descripcion:'[--SELECCIONE--]' },  ..._clientes.data];      
               dispatch( listClientes(clientePrecio))
            }else{
              alert(JSON.stringify(_clientes.data));
            } 
            if (_tipoReparaciones.ok) {
              let tiposReparaciones = [{id:0 , descripcion:'[--SELECCIONE--]' },  ..._tipoReparaciones.data];     
             dispatch( getTiposReparacion(tiposReparaciones))
            }else{
              alert(JSON.stringify(_tipoReparaciones.data));
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
  export const mostrarInformacion =( cliente, contrato, tipoReparacion, nroOT , estado , estaSegundoPlano )=>{
    return  async(dispatch)=>{ 
      try {

          if(estaSegundoPlano === false){
              Swal.fire({
                icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
              })
              Swal.showLoading();
          }
          const {data : res}  = await precioClienteServices().getMostrarInformacion( cliente, contrato, tipoReparacion, nroOT , estado );
          if(estaSegundoPlano === false) Swal.close(); 

          if (res.ok) {   
            const listMant = res.data.map((row)=>{
              return { ...row, id : row.id_ClienteTipoReparacion  }
            })
            dispatch(listMantPreciosClienteCab( listMant));
            dispatch(refrescarDatoPrincipal(false));
          }else{
            alert(JSON.stringify(res.data));
          } 
      } catch (error) {
        if(estaSegundoPlano === false) Swal.close(); 
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }

  export const nuevo =()=>{
    return  async(dispatch)=>{ 
      try { 
          dispatch(modalOpen());
          dispatch(modalTitle('NUEVO PRECIO REPARACION CLIENTE'));
          dispatch(flagEdicion(false));
          dispatch(objectoEdicion(null));
          dispatch(listContratosCliente([])); 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  } 

  export const validaciones = async ({ id_Cliente, id_Contrato, id_TipoReparacion, precio_Cliente, id_Estado}, esEdicion)=>{    

    if (id_Cliente === 0 || id_Cliente === '0') {
        Swal_alert('error','Por favor seleccione el Cliente');
        return false;
    } 
    if (id_Contrato === 0 || id_Contrato === '0') {
      Swal_alert('error','Por favor seleccione el Contrato');
      return false;
    } 

    if (id_TipoReparacion === 0 || id_TipoReparacion === '0') {
      Swal_alert('error','Por favor seleccione el Tipo de Reparacion');
      return false;
    } 

    if (precio_Cliente === '' || precio_Cliente === null) {
      Swal_alert('error','Por favor ingrese un precio');
      return false;
    } 

    if ( Number(precio_Cliente) <=0  ) {
      Swal_alert('error','Por favor ingrese un precio positivo');
      return false;
    } 

    if ( esEdicion === false ) {
      const {data : res}  = await precioClienteServices().getvalidarPrecioReparacionCliente( id_Cliente ,id_Contrato, id_TipoReparacion );
      if (res.ok) {
        if (res.data) {
          Swal_alert('error','Ya se agrego el Cliente , Contrato y el tipo Reparacion');
          return false;
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
          const {data : res}  = await precioClienteServices().save(objMantenimiento);
          Swal.close();
          if (res.ok) {

            Swal_alert('success','Se registro correctamente..');
            dispatch(objectoEdicion({...objMantenimiento, id_TipoReparacion : '0' , precio_Cliente: '0' }));   
            dispatch(flagEdicion(true));
            dispatch(refrescarDatoPrincipal(true));
            dispatch(flagEdicion(false));

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
         
          dispatch(objectoEdicion(null));
          ///---combo dependientes
          dispatch(listContratosCliente([])); 
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();      
          Promise.all([precioClienteServices().getContratoPorCliente(objEdicion.id_Cliente)])
            .then(([ res ])  => {
            Swal.close();    
            if (res.ok) {    
              //---cargando Combos contrato---        
              dispatch(listContratosCliente(res.data));          
              dispatch(flagEdicion(true)); 
              dispatch(modalTitle('EDITAR PRECIO REPARACION CLIENTE'));                    
              dispatch(objectoEdicion(objEdicion)); 
              dispatch(modalOpen());
              
            }else{
              alert(JSON.stringify(res.data));
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
  
  export const update =(objMantenimiento)=>{
    return  async(dispatch)=>{ 
      try {

          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Espere por favor'
          })
          Swal.showLoading();
          const {data : res}  = await precioClienteServices().update( objMantenimiento.id_ClienteTipoReparacion, objMantenimiento);
          Swal.close();
          if (res.ok) {     

            Swal_alert('success','Se Actualizo correctamente..');
            dispatch(modalClose());           
            dispatch(refrescarDatoPrincipal(true)); 
          }else{
            Swal_alert('error', JSON.stringify(res.data));
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }

  export const anular =( id_ClienteTipoReparacion, id_usuario )=>{
    return  async(dispatch)=>{ 
      try {
          Swal.fire({
            icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Anulando, Espere por favor'
          })
          Swal.showLoading();
          const res = await precioClienteServices().anular(id_ClienteTipoReparacion, id_usuario);
          Swal.close();
          if (res.ok) { 
            setTimeout(() => {
              Swal_alert('success','Se anulo correctamente.');
              dispatch(refrescandoEstadoPrecioCliente(id_ClienteTipoReparacion));  
            }, 500); 
          }else{
            alert(JSON.stringify(res.data)); 
          } 
      } catch (error) {
        Swal.close();
        Swal_alert('error', JSON.stringify(error));
      } 
    }
  }


  export const contratoPorClienteFiltro =(idCliente)=>{
    return  async(dispatch)=>{ 
      try {

         if (String(idCliente) === '0') {
            dispatch(listContratosClienteFiltro([])); 
         }else{
            Swal.fire({
              icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Obteniendo los contratos, Espere por favor'
            })
            Swal.showLoading();
            const res = await precioClienteServices().getContratoPorCliente(idCliente);
            Swal.close();
            if (res.ok) {   
              dispatch(listContratosClienteFiltro(res.data)); 
              return true;
            }else{
              alert(JSON.stringify(res.data));
              return false;
            } 
         }
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }
  
  export const contratoPorCliente =(idCliente)=>{
    return  async(dispatch)=>{ 
      try {

         if (String(idCliente) === '0') {
            dispatch(listContratosCliente([])); 
         }else{
            Swal.fire({
              icon: 'info', allowOutsideClick: false, allowEscapeKey: false, text: 'Obteniendo los contratos, Espere por favor'
            })
            Swal.showLoading();
            const res = await precioClienteServices().getContratoPorCliente(idCliente);
            Swal.close();
            if (res.ok) {   
              dispatch(listContratosCliente(res.data)); 
              return true;
            }else{
              alert(JSON.stringify(res.data));
              return false;
            } 
         }
      } catch (error) {
        Swal.close();
        console.log(JSON.stringify(error))
        alert(JSON.stringify(error));
      } 
    }
  }




export const { listMantPreciosClienteCab, listContratosCliente, listContratosClienteFiltro, refrescandoEstadoPrecioCliente  } = precioClienteSlice.actions;

export default precioClienteSlice.reducer;